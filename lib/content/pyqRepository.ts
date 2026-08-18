import { contentRepository } from "./contentRepository";
import { ContentPYQItem, ExamType } from "@/lib/types/content";
import { SubjectType } from "@/lib/types/common";

export class PYQRepository {
  /**
   * Loads all file-based PYQs across subjects.
   */
  public getAllPYQs(onlyPublished = true): ContentPYQItem[] {
    const subjects: SubjectType[] = ["Physics", "Chemistry", "Biology", "Mathematics"];
    const allPYQs: ContentPYQItem[] = [];

    for (const subject of subjects) {
      const folderPath = `${subject.toLowerCase()}/pyqs`;
      const loaded = contentRepository.loadAllJsonInDirectory<any>(folderPath);
      for (const item of loaded) {
        if (!item) continue;
        if (Array.isArray(item.questions)) {
          for (const q of item.questions) {
            if (q && q.id && (!onlyPublished || q.status === "published")) {
              allPYQs.push(q);
            }
          }
        } else if (item.id && (!onlyPublished || item.status === "published")) {
          allPYQs.push(item);
        }
      }
    }

    return allPYQs;
  }

  /**
   * Retrieves a PYQ by its permanent stable ID (e.g. "bio-2025-q01").
   */
  public getPYQById(id: string): ContentPYQItem | null {
    const all = this.getAllPYQs(false);
    return all.find((p) => p.id === id) || null;
  }

  /**
   * Retrieves PYQs filtered by Subject.
   */
  public getPYQsBySubject(subject: SubjectType, onlyPublished = true): ContentPYQItem[] {
    const all = this.getAllPYQs(onlyPublished);
    return all.filter((p) => p.subject.toLowerCase() === subject.toLowerCase());
  }

  /**
   * Retrieves PYQs filtered by Year.
   */
  public getPYQsByYear(year: number, onlyPublished = true): ContentPYQItem[] {
    const all = this.getAllPYQs(onlyPublished);
    return all.filter((p) => p.year === year);
  }

  /**
   * Retrieves PYQs filtered by Subject and Year.
   */
  public getPYQsBySubjectAndYear(subject: SubjectType, year: number, onlyPublished = true): ContentPYQItem[] {
    const subjectPYQs = this.getPYQsBySubject(subject, onlyPublished);
    return subjectPYQs.filter((p) => p.year === year);
  }

  /**
   * Retrieves PYQs filtered by Topic.
   */
  public getPYQsByTopic(subject: SubjectType, topic: string, onlyPublished = true): ContentPYQItem[] {
    const subjectPYQs = this.getPYQsBySubject(subject, onlyPublished);
    return subjectPYQs.filter(
      (p) => p.topic.toLowerCase().trim() === topic.toLowerCase().trim()
    );
  }

  /**
   * Retrieves PYQs filtered by Exam (e.g., "NEST").
   */
  public getPYQsByExam(exam: ExamType, onlyPublished = true): ContentPYQItem[] {
    const all = this.getAllPYQs(onlyPublished);
    return all.filter((p) => p.exam === exam);
  }
}

export const pyqRepository = new PYQRepository();
