import Course from "../core/entities/course";

import Database from "@repositories/database";
import Content from "../core/entities/content";
import Chapter from "../core/entities/chapter";

export default class ContentRepository {
  contents: Content[] = [];
  constructor(private Database: Database) {
    this.contents = [];
  }

  async addContent(chapter: Chapter, content: Content): Promise<Chapter> {
    this.contents.push(content);
    return chapter;
  }

  async getContent(id: number): Promise<Content> {
    const content = this.contents.find((c) => c.id === id);
    if (content) {
      return content;
    }
    throw new Error("Course not found");
  }

  async getcontents(chapter: Chapter): Promise<Content[]> {
    return [
      {
        freemium: true,
        id: 156,
        title: "excercices",
        type: "PDF",
        url: "https://dzation.com/156",
      },
      {
        freemium: false,
        id: 155,
        title: "correction",
        type: "PDF",
        url: "https://dzation.com/155",
      },
    ];
  }

  async deleteContent(content: Content) {}
}
