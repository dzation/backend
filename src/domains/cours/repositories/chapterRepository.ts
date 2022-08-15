import Course from "../core/entities/course";

import Database from "@repositories/database";
import Chapter from "../core/entities/chapter";

export default class ChapterRepository {
  chapters: Chapter[] = [];
  constructor(private Database: Database) {
    this.chapters = [];
  }

  async addChapter(course: Course, chapter: Chapter): Promise<Chapter> {
    this.chapters.push(chapter);
    return chapter;
  }

  async getChapter(id: number): Promise<Chapter> {
    const chapter = this.chapters.find((c) => c.id === id);
    if (chapter) {
      return chapter;
    }
    throw new Error("Course not found");
  }

  async getchapters(course: Course): Promise<Chapter[]> {
    return [
      {
        id: 1,
        title: "how memory works",
      },
      {
        id: 2,
        title: "what to remember",
      },
      {
        id: 3,
        title: "imagination vs logic",
      },
    ];
  }

  async deleteChapter(chapter: Chapter) {
    // todo delete all nested contents
  }
}
