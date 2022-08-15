import Query from "@core/interfaces/query";
import CourseRepository from "@domains/cours/repositories/courseRepository";
import ChapterRepository from "@domains/cours/repositories/chapterRepository";
import Course, { CourseAgreegator } from "../../entities/course";
import ContentRepository from "@domains/cours/repositories/contentRepository";
import { ChapterAgreegator } from "../../entities/chapter";

export default class GetChaptersQuery extends Query {
  private chapterRepository: ChapterRepository;
  private contentRepository: ContentRepository;
  private course: Course;

  constructor(
    course: Course,
    config: {
      repositories: { chapter: ChapterRepository; content: ContentRepository };
    }
  ) {
    super();
    this.course = course;
    this.chapterRepository = config.repositories.chapter;
    this.contentRepository = config.repositories.content;
  }

  // CHECK i don't know if its better to include the rest of the data in the function params
  async fetch(): Promise<ChapterAgreegator[]> {
    const chapters = await this.chapterRepository.getchapters(this.course);

    const queries = chapters.map(async (chapter) => {
      const contents = await this.contentRepository.getcontents(chapter);
      return {
        ...chapter,
        content: contents,
      };
    });

    const agreegators = await Promise.all(queries);

    return agreegators;
  }
}
