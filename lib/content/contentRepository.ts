import fs from "fs";
import path from "path";
import {
  BaseContentMetadata,
  ContentQuestion,
  ContentValidationResult,
} from "@/lib/types/content";

const CONTENT_BASE_DIR = path.join(process.cwd(), "content", "nest");

export class ContentRepository {
  private memoryCache: Map<string, any> = new Map();

  /**
   * Resolves a relative content path safely within the /content/nest root.
   * Prevents path traversal vulnerabilities (e.g. "../../.env.local").
   */
  public getSafePath(relativePath: string): string {
    const resolved = path.resolve(CONTENT_BASE_DIR, relativePath);
    if (!resolved.startsWith(CONTENT_BASE_DIR)) {
      throw new Error(`Security Violation: Path traversal blocked for path '${relativePath}'`);
    }
    return resolved;
  }

  /**
   * Clears the in-memory content cache.
   */
  public clearCache(): void {
    this.memoryCache.clear();
  }

  /**
   * Safely reads and parses a JSON content file.
   */
  public loadJsonFile<T>(relativePath: string, useCache = process.env.NODE_ENV === "production"): T | null {
    try {
      const safePath = this.getSafePath(relativePath);

      if (useCache && this.memoryCache.has(safePath)) {
        return this.memoryCache.get(safePath) as T;
      }

      if (!fs.existsSync(safePath)) {
        return null;
      }

      const fileContent = fs.readFileSync(safePath, "utf-8");
      const parsed = JSON.parse(fileContent) as T;

      if (useCache) {
        this.memoryCache.set(safePath, parsed);
      }

      return parsed;
    } catch (error) {
      console.error(`[ContentRepository] Error loading JSON file '${relativePath}':`, error);
      return null;
    }
  }

  /**
   * Scans a directory recursively for JSON files safely.
   */
  public loadAllJsonInDirectory<T>(relativeSubDir: string): T[] {
    const results: T[] = [];
    try {
      const safeDir = this.getSafePath(relativeSubDir);
      if (!fs.existsSync(safeDir)) {
        return results;
      }

      const files = fs.readdirSync(safeDir, { withFileTypes: true });

      for (const file of files) {
        const fullPath = path.join(safeDir, file.name);
        const relPath = path.relative(CONTENT_BASE_DIR, fullPath);

        if (file.isDirectory()) {
          results.push(...this.loadAllJsonInDirectory<T>(relPath));
        } else if (file.isFile() && file.name.endsWith(".json")) {
          const content = this.loadJsonFile<T | T[]>(relPath);
          if (Array.isArray(content)) {
            results.push(...content);
          } else if (content) {
            results.push(content);
          }
        }
      }
    } catch (err) {
      console.error(`[ContentRepository] Error scanning directory '${relativeSubDir}':`, err);
    }
    return results;
  }

  /**
   * Validates a ContentQuestion object against schema rules and ID uniqueness.
   */
  public validateQuestion(
    question: any,
    existingIds: Set<string> = new Set()
  ): ContentValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!question || typeof question !== "object") {
      return { isValid: false, errors: ["Question item is not a valid object."], warnings: [] };
    }

    if (!question.id || typeof question.id !== "string" || question.id.trim() === "") {
      errors.push("Question is missing a stable 'id' string.");
    } else if (existingIds.has(question.id)) {
      errors.push(`Duplicate stable ID detected: '${question.id}'. IDs must be unique across all content.`);
    }

    if (!question.subject) errors.push(`Question '${question.id || "unknown"}' is missing 'subject'.`);
    if (!question.topic) errors.push(`Question '${question.id || "unknown"}' is missing 'topic'.`);
    if (!question.questionText) errors.push(`Question '${question.id || "unknown"}' is missing 'questionText'.`);
    if (!question.questionType) errors.push(`Question '${question.id || "unknown"}' is missing 'questionType'.`);

    if (question.questionType === "MCQ" || question.questionType === "MSQ") {
      if (!Array.isArray(question.options) || question.options.length < 2) {
        errors.push(`Question '${question.id}' of type '${question.questionType}' must have at least 2 options.`);
      } else {
        const correctOptions = question.options.filter((o: any) => o.isCorrect === true);
        if (correctOptions.length === 0) {
          errors.push(`Question '${question.id}' has no correct option specified.`);
        }
      }
    } else if (question.questionType === "Numerical") {
      if (!question.numericalAnswer || typeof question.numericalAnswer.min !== "number" || typeof question.numericalAnswer.max !== "number") {
        errors.push(`Numerical Question '${question.id}' must provide 'numericalAnswer' with min and max numbers.`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }
}

export const contentRepository = new ContentRepository();
