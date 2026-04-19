"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from "react";

import type { SubmittedMomentCard } from "@/features/proud-moments/types/schema";

type ProudMomentsSessionContextValue = {
  presentation: SubmittedMomentCard[] | null;
  setPresentation: (cards: SubmittedMomentCard[]) => void;
  updatePresentationImageAt: (index: number, imageUrl: string | null) => void;
};

const ProudMomentsSessionContext = createContext<ProudMomentsSessionContextValue | null>(null);

export function ProudMomentsSessionProvider({ children }: { children: ReactNode }) {
  const [presentation, setPresentationState] = useState<SubmittedMomentCard[] | null>(null);
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

  const setPresentation = useCallback((cards: SubmittedMomentCard[]) => {
    const keep = new Set(cards.map((c) => c.imageUrl).filter((u): u is string => Boolean(u)));

    for (const url of Array.from(blobUrlsRef.current)) {
      if (!keep.has(url)) {
        URL.revokeObjectURL(url);
        blobUrlsRef.current.delete(url);
      }
    }

    keep.forEach((url) => {
      blobUrlsRef.current.add(url);
    });

    setPresentationState(cards);
  }, []);

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

  const value = useMemo(
    () => ({
      presentation,
      setPresentation,
      updatePresentationImageAt,
    }),
    [presentation, setPresentation, updatePresentationImageAt],
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
