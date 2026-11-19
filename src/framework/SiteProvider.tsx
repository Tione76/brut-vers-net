"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ConsentPreferences, ConsentStatus } from "@/framework/types";
import { clearLegacyConsentPreferences } from "@/framework/consent/storage";
import { initConsentModeDefault, updateConsentMode } from "@/framework/consent/consent-mode";
import {
  ensureGoogleFcNamespace,
  queueGoogleFcCallback,
  readGoogleConsentPreferences,
  showGoogleCmpRevocationMessage,
} from "@/framework/consent/google-cmp";
import { AnalyticsScripts, ClarityLoader } from "@/framework/AnalyticsScripts";
import { GoogleCmpLoader } from "@/framework/GoogleCmpLoader";
import type { config } from "@/site";

export type SiteConfig = typeof config;

/* ─── Site context ─── */

const SiteContext = createContext<SiteConfig | null>(null);

export function useSite(): SiteConfig {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used within SiteProvider");
  return ctx;
}

/* ─── Consent context ─── */

interface ConsentContextValue {
  status: ConsentStatus;
  preferences: ConsentPreferences;
  /** Rouvre le message Google (révocation / modification). */
  openPreferences: () => void;
  /** True une fois le premier signal Consent Mode Google reçu (ou hors périmètre). */
  consentReady: boolean;
}

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used within SiteProvider");
  return ctx;
}

function statusFromPreferences(prefs: ConsentPreferences): ConsentStatus {
  if (prefs.analytics && prefs.advertising) return "granted";
  if (!prefs.analytics && !prefs.advertising) return "denied";
  return "custom";
}

function deniedPreferences(): ConsentPreferences {
  return {
    necessary: true,
    analytics: false,
    advertising: false,
    timestamp: Date.now(),
  };
}

/* ─── Calculator context ─── */

interface CalculatorContextValue {
  result: ReactNode | null;
  setResult: (node: ReactNode | null) => void;
  clearResult: () => void;
}

const CalculatorContext = createContext<CalculatorContextValue | null>(null);

export function useCalculatorSlot(): CalculatorContextValue {
  const ctx = useContext(CalculatorContext);
  if (!ctx) throw new Error("useCalculatorSlot must be used within CalculatorProvider");
  return ctx;
}

/* ─── Provider ─── */

export function SiteProvider({ config, children }: { config: SiteConfig; children: ReactNode }) {
  const [preferences, setPreferences] = useState<ConsentPreferences>(deniedPreferences);
  const [status, setStatus] = useState<ConsentStatus>("pending");
  const [consentReady, setConsentReady] = useState(false);

  const applyPreferences = useCallback((prefs: ConsentPreferences, ready = true) => {
    setPreferences(prefs);
    updateConsentMode(prefs);
    setStatus(statusFromPreferences(prefs));
    if (ready) setConsentReady(true);
  }, []);

  const syncFromGoogleCmp = useCallback(() => {
    const fromGoogle = readGoogleConsentPreferences();
    if (!fromGoogle) return;
    applyPreferences(fromGoogle, true);
  }, [applyPreferences]);

  useEffect(() => {
    initConsentModeDefault();
    // Ne jamais convertir un ancien « Accepter et fermer » maison en consentement Google.
    clearLegacyConsentPreferences();
    ensureGoogleFcNamespace();

    // Signal Google : Consent Mode prêt après un choix (ou hors périmètre UE).
    queueGoogleFcCallback("CONSENT_MODE_DATA_READY", () => {
      syncFromGoogleCmp();
    });

    queueGoogleFcCallback("CONSENT_API_READY", () => {
      const tcf = window.__tcfapi;
      if (typeof tcf !== "function") return;
      tcf("addEventListener", 2, (tcData, success) => {
        if (!success || !tcData || typeof tcData !== "object") return;
        const data = tcData as { eventStatus?: string; tcString?: string };
        const eventStatus = data.eventStatus;
        // Ouverture CMP : rester en attente, ne pas débloquer les pubs.
        if (eventStatus === "cmpuishown") {
          setConsentReady(false);
          setStatus("pending");
          return;
        }
        if (eventStatus === "useractioncomplete") {
          syncFromGoogleCmp();
          return;
        }
        // Recharge avec choix déjà stocké (chaîne TC présente).
        if (eventStatus === "tcloaded" && String(data.tcString || "").length > 0) {
          syncFromGoogleCmp();
        }
      });
    });
  }, [syncFromGoogleCmp]);

  const openPreferences = useCallback(() => {
    // Retrait immédiat côté site (mesure stoppée) en attendant le nouveau choix Google.
    applyPreferences(deniedPreferences(), false);
    setConsentReady(false);
    setStatus("pending");
    showGoogleCmpRevocationMessage();
  }, [applyPreferences]);

  const consentValue = useMemo(
    () => ({
      status,
      preferences,
      openPreferences,
      consentReady,
    }),
    [status, preferences, openPreferences, consentReady],
  );

  return (
    <SiteContext.Provider value={config}>
      <ConsentContext.Provider value={consentValue}>
        {children}
        <GoogleCmpLoader />
        <AnalyticsScripts />
        <ClarityLoader />
      </ConsentContext.Provider>
    </SiteContext.Provider>
  );
}

export function CalculatorProvider({ children }: { children: ReactNode }) {
  const [result, setResultState] = useState<ReactNode | null>(null);
  const setResult = useCallback((node: ReactNode | null) => setResultState(node), []);
  const clearResult = useCallback(() => setResultState(null), []);
  const value = useMemo(() => ({ result, setResult, clearResult }), [result, setResult, clearResult]);
  return <CalculatorContext.Provider value={value}>{children}</CalculatorContext.Provider>;
}
