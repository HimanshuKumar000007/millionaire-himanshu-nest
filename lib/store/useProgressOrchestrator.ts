"use client";

import { useState, useEffect, useCallback } from "react";
import {
  progressOrchestratorService,
  PROGRESS_EVENT_NAME,
  broadcastProgressUpdate,
} from "@/lib/services/progressOrchestrator.service";
import { NestDashboardSummary } from "@/lib/types/dashboard";

export function useProgressOrchestrator() {
  const [data, setData] = useState<NestDashboardSummary>(() =>
    progressOrchestratorService.getLiveDashboardSummary()
  );

  const refresh = useCallback(async () => {
    progressOrchestratorService.invalidateCache();
    const email = typeof window !== "undefined" ? localStorage.getItem("nest_user_email") || "" : "";
    const userId = typeof window !== "undefined" ? localStorage.getItem("nest_user_id") || "" : "";
    
    if (email || userId) {
      const liveData = await progressOrchestratorService.fetchLiveDashboardSummary(email, userId);
      setData(liveData);
    } else {
      setData(progressOrchestratorService.getLiveDashboardSummary());
    }
  }, []);

  useEffect(() => {
    // Initial sync
    refresh();

    // Listen for custom platform event
    const handleProgressUpdate = () => {
      refresh();
    };

    // Listen for storage events across tabs or local writes
    const handleStorage = (e: StorageEvent) => {
      if (e.key && e.key.startsWith("nest_smartprep_")) {
        refresh();
      }
    };

    window.addEventListener(PROGRESS_EVENT_NAME, handleProgressUpdate);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener(PROGRESS_EVENT_NAME, handleProgressUpdate);
      window.removeEventListener("storage", handleStorage);
    };
  }, [refresh]);

  return {
    data,
    refresh,
    broadcastUpdate: broadcastProgressUpdate,
  };
}
