"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { ConsentPreferences, ConsentStatus } from "@/framework/types";
import { clearLegacyConsentPreferences } from "@/framework/consent/storage";
import { initConsentModeDefault } from "@/framework/consent/consent-mode";
import {
  readSirdataConsentPreferences,
  showSirdataCmpUI,
  whenTcfApiReady,
} from "@/framework/consent/sirdata-cmp";
import { AnalyticsScripts, ClarityLoader } from "@/framework/AnalyticsScripts";
import { AdSenseLoader } from "@/framework/AdSenseLoader";
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
  /** Rouvre l'UI Sirdata ABconsent. */
  openPreferences: () => void;
  /** True une fois un choix TCF / Consent Mode enregistré (ou hors périmètre). */
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
  /** True tant que la CMP est ouverte : bloque pubs / mesure. */
  const awaitingCmpChoice = useRef(false);

  const applyPreferences = useCallback((prefs: ConsentPreferences, ready = true) => {
    // Ne pas réécrire Consent Mode : Sirdata le pilote déjà.
    setPreferences(prefs);
    setStatus(statusFromPreferences(prefs));
    if (ready) setConsentReady(true);
  }, []);

  const syncFromSirdata = useCallback(() => {
    if (awaitingCmpChoice.current) return;
    const fromSirdata = readSirdataConsentPreferences();
    if (!fromSirdata) {
      // Choix TCF sans update Consent Mode encore visible : refuser mesure / pubs côté site.
      applyPreferences(deniedPreferences(), true);
      return;
    }
    applyPreferences(fromSirdata, true);
  }, [applyPreferences]);

  useEffect(() => {
    // Défaut restrictif déjà posé dans le <head> ; rappel idempotent.
    initConsentModeDefault();
    // Ne jamais convertir un ancien choix maison ou Google en consentement Sirdata.
    clearLegacyConsentPreferences();

    whenTcfApiReady(() => {
      const tcf = window.__tcfapi;
      if (typeof tcf !== "function") return;

      tcf("addEventListener", 2, (tcData, success) => {
        if (!success || !tcData || typeof tcData !== "object") return;
        const data = tcData as { eventStatus?: string; tcString?: string };
        const eventStatus = data.eventStatus;

        if (eventStatus === "cmpuishown") {
          awaitingCmpChoice.current = true;
          setConsentReady(false);
          setStatus("pending");
          return;
        }

        if (eventStatus === "useractioncomplete") {
          awaitingCmpChoice.current = false;
          // Laisser Sirdata pousser Consent Mode, puis synchroniser l'état site.
          window.setTimeout(() => syncFromSirdata(), 0);
          return;
        }

        if (
          eventStatus === "tcloaded" &&
          String(data.tcString || "").length > 0 &&
          !awaitingCmpChoice.current
        ) {
          window.setTimeout(() => syncFromSirdata(), 0);
        }
      });
    });
  }, [syncFromSirdata]);

  const openPreferences = useCallback(() => {
    awaitingCmpChoice.current = true;
    setConsentReady(false);
    setStatus("pending");
    showSirdataCmpUI();
  }, []);

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
        <AdSenseLoader />
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
