import { contentRepository } from "./contentRepository";
import { syllabusRepository } from "./syllabusRepository";
import { ContentLesson, ContentChapterLesson } from "@/lib/types/content";
import { SubjectType } from "@/lib/types/common";

export class LessonRepository {
  /**
   * Loads all file-based lessons across subjects.
   */
  public getAllLessons(onlyPublished = true): ContentLesson[] {
    const subjects: SubjectType[] = ["Physics", "Chemistry", "Biology", "Mathematics"];
    const allLessons: ContentLesson[] = [];

    for (const subject of subjects) {
      const folderPath = `${subject.toLowerCase()}/lessons`;
      const lessons = contentRepository.loadAllJsonInDirectory<ContentLesson>(folderPath);
      for (const l of lessons) {
        if (l && l.id && (!onlyPublished || !l.status || l.status === "published")) {
          allLessons.push(l);
        }
      }
    }

    return allLessons;
  }

  /**
   * Retrieves a lesson by its permanent stable ID (e.g. "bio-living-world-lesson-001").
   */
  public getLessonById(id: string): ContentLesson | null {
    const all = this.getAllLessons(false);
    return all.find((l) => l.id === id) || null;
  }

  /**
   * Retrieves a lesson by its URL slug (e.g. "the-living-world").
   */
  public getLessonBySlug(slug: string): ContentLesson | null {
    const all = this.getAllLessons(false);
    return all.find((l) => l.slug.toLowerCase() === slug.toLowerCase()) || null;
  }

  /**
   * Retrieves lessons filtered by Subject.
   */
  public getLessonsBySubject(subject: SubjectType, onlyPublished = true): ContentLesson[] {
    const folderPath = `${subject.toLowerCase()}/lessons`;
    const lessons = contentRepository.loadAllJsonInDirectory<ContentLesson>(folderPath);
    return lessons.filter((l) => l && l.id && (!onlyPublished || !l.status || l.status === "published"));
  }

  /**
   * Retrieves lessons filtered by Topic.
   */
  public getLessonsByTopic(subject: SubjectType, topic: string, onlyPublished = true): ContentLesson[] {
    const subjectLessons = this.getLessonsBySubject(subject, onlyPublished);
    return subjectLessons.filter(
      (l) => l.topic.toLowerCase().trim() === topic.toLowerCase().trim()
    );
  }

  /**
   * Assembles a unified ContentChapterLesson for a given chapter slug (e.g. "the-living-world").
   * Combines structured sub-lesson JSON files into an ordered continuous section list
   * and attaches chapter-specific test questions.
   */
  public getChapterLesson(chapterSlug: string, subject: SubjectType = "Biology"): ContentChapterLesson | null {
    const folderPath = `${subject.toLowerCase()}/lessons/${chapterSlug}`;
    const subLessons = contentRepository.loadAllJsonInDirectory<ContentLesson>(folderPath);
    
    if (!subLessons || subLessons.length === 0) {
      // Fallback: match by chapterSlug or slug across all subject lessons
      const allSubjectLessons = this.getLessonsBySubject(subject, false);
      const matches = allSubjectLessons.filter(
        (l) => (l.chapterSlug && l.chapterSlug.toLowerCase() === chapterSlug.toLowerCase()) ||
               (l.slug && l.slug.toLowerCase() === chapterSlug.toLowerCase())
      );
      if (matches.length === 0) return null;
      subLessons.push(...matches);
    }

    subLessons.sort((a, b) => {
      const orderA = a.order ?? (a as any).lessonNumber ?? 0;
      const orderB = b.order ?? (b as any).lessonNumber ?? 0;
      return orderA - orderB;
    });
    const first = subLessons[0];

    // Collect all chapter-wide common mistakes across sub-lessons
    const allCommonMistakesMap = new Map<string, string>();
    subLessons.forEach((l) => {
      if (Array.isArray(l.commonMistakes)) {
        l.commonMistakes.forEach((m) => {
          if (typeof m === "string" && m.trim()) {
            const key = m.trim().toLowerCase();
            if (!allCommonMistakesMap.has(key)) {
              allCommonMistakesMap.set(key, m);
            }
          }
        });
      }
    });
    // Try loading master chapter file for extra chapter-wide data (traps, questions)
    const masterChapCandidates = [
      `${subject.toLowerCase()}/chapters/${chapterSlug}.json`,
      `${subject.toLowerCase()}/chapters/chapter-${first.chapterNumber}-${chapterSlug}.json`,
      `${subject.toLowerCase()}/chapters/chapter-${first.chapterNumber}.json`,
    ];
    let masterChapData: any = null;
    for (const cand of masterChapCandidates) {
      masterChapData = contentRepository.loadJsonFile<any>(cand);
      if (masterChapData) break;
    }

    if (allCommonMistakesMap.size === 0 && masterChapData && Array.isArray(masterChapData.chapterCommonMistakes)) {
      masterChapData.chapterCommonMistakes.forEach((m: string) => {
        if (typeof m === "string" && m.trim()) {
          allCommonMistakesMap.set(m.trim().toLowerCase(), m);
        }
      });
    }
    const chapterCommonMistakes = Array.from(allCommonMistakesMap.values());

    // Collect all chapter-wide key terms across sub-lessons
    const allKeyTermsMap = new Map<string, { term: string; definition: string }>();
    subLessons.forEach((l) => {
      if (Array.isArray(l.keyTerms)) {
        l.keyTerms.forEach((kt) => {
          if (kt && kt.term && !allKeyTermsMap.has(kt.term.toLowerCase().trim())) {
            allKeyTermsMap.set(kt.term.toLowerCase().trim(), { term: kt.term, definition: kt.definition });
          }
        });
      }
    });
    const chapterKeyTerms = Array.from(allKeyTermsMap.values());

    // Assemble section-level items
    const sections = subLessons.map((l: any, idx) => {
      let conceptBreakdown: any[] = [];

      if (Array.isArray(l.conceptBreakdown) && l.conceptBreakdown.length > 0) {
        // Check if concept breakdown items already have content/contentMarkdown
        const hasDirectContent = l.conceptBreakdown.some((cb: any) => cb.content || cb.contentMarkdown);
        if (hasDirectContent) {
          conceptBreakdown = l.conceptBreakdown;
        } else if (l.content) {
          // If l.content exists at root, place root content in main card and extra notes as secondary cards
          conceptBreakdown = [
            {
              heading: l.title || `Concept ${idx + 1}`,
              title: l.title || `Concept ${idx + 1}`,
              type: "paragraph",
              summaryBox: l.summaryBox,
              codeSnippet: l.codeSnippet || l.asciiDiagram,
              content: l.content,
            },
            ...l.conceptBreakdown.map((cb: any, cbIdx: number) => ({
              heading: cb.heading || cb.title || `Deep Dive ${cbIdx + 1}`,
              title: cb.heading || cb.title || `Deep Dive ${cbIdx + 1}`,
              type: "paragraph",
              content: cb.content || cb.explanation || "",
            })),
          ];
        } else {
          conceptBreakdown = l.conceptBreakdown.map((cb: any, cbIdx: number) => ({
            heading: cb.heading || cb.title || `Concept ${cbIdx + 1}`,
            title: cb.heading || cb.title || `Concept ${cbIdx + 1}`,
            type: "paragraph",
            content: cb.content || cb.explanation || "",
          }));
        }
      } else if (l.content) {
        conceptBreakdown = [
          {
            heading: l.title || `Concept ${idx + 1}`,
            title: l.title || `Concept ${idx + 1}`,
            type: "paragraph",
            summaryBox: l.summaryBox,
            codeSnippet: l.codeSnippet || l.asciiDiagram,
            content: l.content,
          },
        ];
      }

      return {
        id: l.id || `sec-${idx + 1}`,
        sectionNumber: l.order || l.lessonNumber || idx + 1,
        title: l.title,
        topic: l.topic || first.topic || "Core Concept",
        slug: l.slug || `lesson-${String(idx + 1).padStart(2, "0")}`,
        readingTimeMinutes: l.readingTimeMinutes || l.estimatedTimeMinutes || 3,
        quickSummary: l.quickSummary || l.summary,
        keyConcepts: l.keyConcepts || l.coreConcepts,
        importantPoints: l.importantPoints,
        nestFocus: l.nestFocus,
        pyqFocus: l.pyqFocus,
        conceptBreakdown,
        images: l.images || [],
      };
    });

    const totalEstTime = sections.reduce((sum, s) => sum + s.readingTimeMinutes, 0);

    // Load chapter quiz questions
    const questionFile = `${subject.toLowerCase()}/questions/${chapterSlug}.json`;
    let loadedQuestions = contentRepository.loadJsonFile<any[]>(questionFile) || [];
    if (loadedQuestions.length === 0 && masterChapData && Array.isArray(masterChapData.questions)) {
      loadedQuestions = masterChapData.questions;
    }

    // Extract hero / cover image
    const heroImage = first.heroImage || first.coverImage || (first.images && first.images[0]?.src) || undefined;

    // Resolve next chapter dynamically from syllabus hierarchy
    const flatChapters = syllabusRepository.getAllFlatChapters();
    const currentIdx = flatChapters.findIndex(
      (c) => c.subject.toLowerCase() === subject.toLowerCase() && c.slug.toLowerCase() === chapterSlug.toLowerCase()
    );
    const nextChapData = currentIdx >= 0 && currentIdx < flatChapters.length - 1 ? flatChapters[currentIdx + 1] : null;
    const nextChapter = nextChapData
      ? {
          slug: nextChapData.slug,
          title: nextChapData.chapterTitle,
          chapterNumber: nextChapData.chapterNumber,
          subject: nextChapData.subject,
        }
      : null;

    const curChapData = flatChapters.find(
      (c) => c.subject.toLowerCase() === subject.toLowerCase() && c.slug.toLowerCase() === chapterSlug.toLowerCase()
    );
    const chapterTitle = curChapData?.chapterTitle || first.chapter || "Chapter Lesson";

    return {
      id: `chap-${subject.toLowerCase()}-${chapterSlug}`,
      type: "chapter-lesson",
      exam: first.exam || "NEST",
      subject: first.subject || subject,
      topic: first.topic || first.chapter || "Core Module",
      classLevel: curChapData?.classLevel || first.classLevel || "Class XII",
      unit: curChapData?.unitTitle ? `Unit ${curChapData.unitNumber} — ${curChapData.unitTitle}` : first.unit || "Unit VI — Reproduction",
      unitNumber: Number(curChapData?.unitNumber || first.unitNumber || 6),
      chapterNumber: Number(curChapData?.chapterNumber || first.chapterNumber || 1),
      chapterSlug,
      title: chapterTitle,
      description: first.quickSummary || "Core module with complete high-yield section breakdown.",
      difficulty: first.difficulty || "Core Foundation",
      status: first.status || "published",
      estimatedTotalTimeMinutes: totalEstTime || 25,
      heroImage,
      sections,
      chapterCommonMistakes,
      chapterKeyTerms,
      chapterQuizId: `quiz-${chapterSlug}`,
      questions: loadedQuestions,
      nextChapter,
    };
  }
}

export const lessonRepository = new LessonRepository();
