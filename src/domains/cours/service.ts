import Database from "@repositories/database";
import { CourseNotFoundError } from "./config/errors";
import Chapter from "./core/entities/chapter";
import AddChapterCommand from "./core/usecases/chapter/addChapter";
import CourseRepository from "./repositories/courseRepository";

export default class CourseService {
  private courseRepository: CourseRepository;

  constructor(private database: Database) {
    this.courseRepository = new CourseRepository(this.database);
  }

  async addChapter(chapter: Chapter): Promise<Chapter> {
    const command = new AddChapterCommand(chapter, this.courseRepository);

    if (await command.validate()) {
      const data = await command.run();

      return data;
    } else {
      throw new CourseNotFoundError("Course not found");
    }
  }
}
