import { contentRepository } from "./contentRepository";
import { SubjectType } from "@/lib/types/common";
import {
  SyllabusChapterItem,
  SyllabusUnitItem,
  SyllabusSubjectData,
  FlatSyllabusChapter,
  GroupedSyllabusUnit,
} from "@/lib/types/content";

export type {
  SyllabusChapterItem,
  SyllabusUnitItem,
  SyllabusSubjectData,
  FlatSyllabusChapter,
  GroupedSyllabusUnit,
};

export class SyllabusRepository {
  private subjects: SubjectType[] = ["Physics", "Chemistry", "Biology", "Mathematics"];

  /**
   * Reads syllabus JSON file for a given subject.
   */
  public getSyllabusBySubject(subject: SubjectType): SyllabusSubjectData | null {
    const relPath = `${subject.toLowerCase()}/topics/syllabus.json`;
    return contentRepository.loadJsonFile<SyllabusSubjectData>(relPath);
  }

  /**
   * Reads syllabus data for all 4 subjects.
   */
  public getAllSyllabusSubjects(): SyllabusSubjectData[] {
    const list: SyllabusSubjectData[] = [];
    for (const subj of this.subjects) {
      const data = this.getSyllabusBySubject(subj);
      if (data) list.push(data);
    }
    return list;
  }

  /**
   * Flattens all syllabus units and chapters into a unified list of chapters.
   */
  public getAllFlatChapters(): FlatSyllabusChapter[] {
    const flatList: FlatSyllabusChapter[] = [];

    for (const subj of this.subjects) {
      const data = this.getSyllabusBySubject(subj);
      if (!data || !data.units) continue;

      for (const unit of data.units) {
        if (!unit.chapters) continue;

        for (const ch of unit.chapters) {
          flatList.push({
            id: `${subj.toLowerCase()}-${ch.slug}`,
            subject: subj,
            classLevel: unit.classLevel || "Class XI",
            unitNumber: unit.unitNumber,
            unitTitle: unit.unitTitle,
            chapterNumber: ch.chapterNumber,
            chapterTitle: ch.chapterTitle,
            slug: ch.slug,
            topics: ch.topics || [],
          });
        }
      }
    }

    return flatList;
  }

  /**
   * Grouped units with nested chapters.
   */
  public getAllGroupedUnits(): GroupedSyllabusUnit[] {
    const unitsList: GroupedSyllabusUnit[] = [];

    for (const subj of this.subjects) {
      const data = this.getSyllabusBySubject(subj);
      if (!data || !data.units) continue;

      for (const unit of data.units) {
        const chapters: FlatSyllabusChapter[] = (unit.chapters || []).map((ch) => ({
          id: `${subj.toLowerCase()}-${ch.slug}`,
          subject: subj,
          classLevel: unit.classLevel || "Class XI",
          unitNumber: unit.unitNumber,
          unitTitle: unit.unitTitle,
          chapterNumber: ch.chapterNumber,
          chapterTitle: ch.chapterTitle,
          slug: ch.slug,
          topics: ch.topics || [],
        }));

        unitsList.push({
          id: `${subj.toLowerCase()}-unit-${unit.unitNumber}`,
          subject: subj,
          classLevel: unit.classLevel || "Class XI",
          unitNumber: unit.unitNumber,
          unitTitle: unit.unitTitle,
          chapters,
        });
      }
    }

    return unitsList;
  }

  /**
   * Retrieves flat syllabus chapters filtered by subject.
   */
  public getFlatChaptersBySubject(subject: SubjectType): FlatSyllabusChapter[] {
    const all = this.getAllFlatChapters();
    return all.filter((item) => item.subject.toLowerCase() === subject.toLowerCase());
  }
}

export const syllabusRepository = new SyllabusRepository();
