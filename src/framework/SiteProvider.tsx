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
import {
  getDefaultPreferences,
  hasConsentChoice,
  loadConsentPreferences,
  saveConsentPreferences,
} from "@/framework/consent/storage";
import { initConsentModeDefault, updateConsentMode } from "@/framework/consent/consent-mode";
import { CookieBanner } from "@/framework/CookieBanner";
import { AnalyticsScripts, AdSenseLoader, ClarityLoader } from "@/framework/AnalyticsScripts";
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
  showBanner: boolean;
  showPreferences: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  savePreferences: (prefs: { analytics: boolean; advertising: boolean }) => void;
  openPreferences: () => void;
  closePreferences: () => void;
}

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used within SiteProvider");
  return ctx;
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
  const [preferences, setPreferences] = useState<ConsentPreferences>(getDefaultPreferences);
  const [status, setStatus] = useState<ConsentStatus>("pending");
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const applyPreferences = useCallback((prefs: ConsentPreferences) => {
    setPreferences(prefs);
    updateConsentMode(prefs);
    setStatus(
      prefs.analytics && prefs.advertising ? "granted" : !prefs.analytics && !prefs.advertising ? "denied" : "custom",
    );
    setShowBanner(false);
  }, []);

  useEffect(() => {
    initConsentModeDefault();
    const stored = loadConsentPreferences();
    if (stored) applyPreferences(stored);
    else setShowBanner(true);
    setIsReady(true);
  }, [applyPreferences]);

  const consentValue = useMemo(
    () => ({
      status,
      preferences,
      showBanner: isReady && showBanner,
      showPreferences,
      acceptAll: () => { applyPreferences(saveConsentPreferences({ analytics: true, advertising: true })); setShowPreferences(false); },
      rejectAll: () => { applyPreferences(saveConsentPreferences({ analytics: false, advertising: false })); setShowPreferences(false); },
      savePreferences: (prefs: { analytics: boolean; advertising: boolean }) => {
        applyPreferences(saveConsentPreferences(prefs));
        setShowPreferences(false);
      },
      openPreferences: () => {
        const stored = loadConsentPreferences();
        if (stored) setPreferences(stored);
        setShowPreferences(true);
        setShowBanner(false);
      },
      closePreferences: () => {
        setShowPreferences(false);
        if (!hasConsentChoice()) setShowBanner(true);
      },
    }),
    [status, preferences, isReady, showBanner, showPreferences, applyPreferences],
  );

  return (
    <SiteContext.Provider value={config}>
      <ConsentContext.Provider value={consentValue}>
        {children}
        <CookieBanner />
        <AnalyticsScripts />
        <ClarityLoader />
        <AdSenseLoader />
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
