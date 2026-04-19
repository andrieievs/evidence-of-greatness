"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from "react";

import type { SubmittedMomentCard } from "@/features/proud-moments/types/schema";

type ProudMomentsSessionContextValue = {
  presentation: SubmittedMomentCard[] | null;
  setPresentation: (cards: SubmittedMomentCard[]) => void;
  updatePresentationImageAt: (index: number, imageUrl: string | null) => void;
  pendingRestoreToForm: boolean;
  requestRestoreToForm: () => void;
  clearRestoreRequest: () => void;
};

const ProudMomentsSessionContext = createContext<ProudMomentsSessionContextValue | null>(null);

export function ProudMomentsSessionProvider({ children }: { children: ReactNode }) {
  const [presentation, setPresentationState] = useState<SubmittedMomentCard[] | null>(null);
  const [pendingRestoreToForm, setPendingRestoreToForm] = useState(false);
  const blobUrlsRef = useRef<Set<string>>(new Set());

  const trackBlob = useCallback((url: string) => {
    blobUrlsRef.current.add(url);
  }, []);

  const revokeBlob = useCallback((url: string | null) => {
    if (!url || !blobUrlsRef.current.has(url)) {
      return;
    }
    URL.revokeObjectURL(url);
    blobUrlsRef.current.delete(url);
  }, []);

  const revokeAllTracked = useCallback(() => {
    blobUrlsRef.current.forEach((u) => URL.revokeObjectURL(u));
    blobUrlsRef.current.clear();
  }, []);

  const setPresentation = useCallback(
    (cards: SubmittedMomentCard[]) => {
      revokeAllTracked();
      cards.forEach((c) => {
        if (c.imageUrl) {
          trackBlob(c.imageUrl);
        }
      });
      setPresentationState(cards);
    },
    [revokeAllTracked, trackBlob],
  );

  const updatePresentationImageAt = useCallback(
    (index: number, imageUrl: string | null) => {
      setPresentationState((prev) => {
        if (!prev?.[index]) {
          return prev;
        }
        const old = prev[index].imageUrl;
        if (old && old !== imageUrl) {
          revokeBlob(old);
        }
        if (imageUrl) {
          trackBlob(imageUrl);
        }
        const next = [...prev];
        next[index] = { ...next[index], imageUrl };
        return next;
      });
    },
    [revokeBlob, trackBlob],
  );

  const requestRestoreToForm = useCallback(() => {
    setPendingRestoreToForm(true);
  }, []);

  const clearRestoreRequest = useCallback(() => {
    setPendingRestoreToForm(false);
  }, []);

  const value = useMemo(
    () => ({
      presentation,
      setPresentation,
      updatePresentationImageAt,
      pendingRestoreToForm,
      requestRestoreToForm,
      clearRestoreRequest,
    }),
    [
      presentation,
      setPresentation,
      updatePresentationImageAt,
      pendingRestoreToForm,
      requestRestoreToForm,
      clearRestoreRequest,
    ],
  );

  return <ProudMomentsSessionContext.Provider value={value}>{children}</ProudMomentsSessionContext.Provider>;
}

export function useProudMomentsSession() {
  const ctx = useContext(ProudMomentsSessionContext);
  if (!ctx) {
    throw new Error("useProudMomentsSession must be used within ProudMomentsSessionProvider");
  }
  return ctx;
}
