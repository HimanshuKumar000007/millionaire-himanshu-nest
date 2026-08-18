import { broadcastProgressUpdate } from "./progressOrchestrator.service";
import { pushLessonProgress } from "@/lib/supabase/sync.service";

export interface StudentLessonProgress {
  lessonId: string;
  progressPercent: number;
  completed: boolean;
  updatedAt: string;
}

const STORAGE_KEY = "nest_smartprep_lesson_progress";

export class LessonProgressService {
  private getLocalStore(): Record<string, StudentLessonProgress> {
    if (typeof window === "undefined") return {};
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  private saveLocalStore(store: Record<string, StudentLessonProgress>): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
      broadcastProgressUpdate();
      pushLessonProgress().catch(() => {});
    } catch (err) {
      console.warn("[LessonProgressService] Error saving progress locally:", err);
    }
  }

  /**
   * Retrieves lesson completion progress for the current student.
   * Returns 0% / Not Started for unstarted lessons.
   */
  public getLessonProgress(lessonId: string): StudentLessonProgress {
    const store = this.getLocalStore();
    if (store[lessonId]) {
      return store[lessonId];
    }
    return {
      lessonId,
      progressPercent: 0,
      completed: false,
      updatedAt: new Date().toISOString(),
    };
  }

  /**
   * Saves or updates a student's progress for a specific lesson.
   */
  public saveLessonProgress(lessonId: string, progressPercent: number, completed = false): StudentLessonProgress {
    const store = this.getLocalStore();
    const current = store[lessonId] || { lessonId, progressPercent: 0, completed: false };

    const updatedPercent = Math.min(100, Math.max(current.progressPercent, progressPercent));
    const isCompleted = completed || updatedPercent >= 100;

    const record: StudentLessonProgress = {
      lessonId,
      progressPercent: isCompleted ? 100 : updatedPercent,
      completed: isCompleted,
      updatedAt: new Date().toISOString(),
    };

    store[lessonId] = record;
    this.saveLocalStore(store);
    return record;
  }

  /**
   * Returns a map of all lesson progress records for the active student.
   */
  public getAllLessonProgress(): Record<string, StudentLessonProgress> {
    return this.getLocalStore();
  }
}

export const lessonProgressService = new LessonProgressService();
