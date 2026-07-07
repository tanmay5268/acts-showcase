"use client";
import { createContext, useContext, useRef, useState, type ReactNode } from "react";

type LoadingContextValue = {
  isLoaded: () => boolean;
  markAsLoaded: () => void;
};

const LoadingContext = createContext<LoadingContextValue | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  // Use ref to store the actual value (persists across re-renders)
  const hasLoadedRef = useRef(false);
  // Use state to trigger re-renders when needed
  const [, forceUpdate] = useState(0);

  const markAsLoaded = () => {
    hasLoadedRef.current = true;
    forceUpdate(n => n + 1); // Trigger re-render
  };

  const isLoaded = () => hasLoadedRef.current;

  return (
    <LoadingContext.Provider value={{ isLoaded, markAsLoaded }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const ctx = useContext(LoadingContext);
  if (!ctx) throw new Error("useLoading must be used within a LoadingProvider");
  return ctx;
};
