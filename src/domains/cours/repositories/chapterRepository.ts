import Course from "../core/entities/course";

import Database from "@repositories/database";
import Chapter from "../core/entities/chapter";
import ID from "@core/entities/id";

export default class ChapterRepository {
  chapters: Chapter[] = [];
  constructor(private Database: Database) {
    this.chapters = [];
  }

  async addChapter(course: Course, chapter: Chapter): Promise<Chapter> {
    this.chapters.push(chapter);
    return chapter;
  }

  async getChapter(id: ID): Promise<Chapter> {
    const chapter = this.chapters.find((c) => c.id === id);
    if (chapter) {
      return chapter;
    }
    throw new Error("Course not found");
  }

  async getchapters(course: Course): Promise<Chapter[]> {
    return [
      {
        id: ID.generate(),
        title: "how memory works",
      },
      {
        id: ID.generate(),
        title: "what to remember",
      },
      {
        id: ID.generate(),
        title: "imagination vs logic",
      },
    ];
  }

  async deleteChapter(chapter: Chapter) {
    // todo delete all nested contents
  }
}
