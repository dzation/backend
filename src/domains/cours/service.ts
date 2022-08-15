import Database from "@repositories/database";
import {
  CourseNotFoundError,
  UnableToAddChapter,
  UnableToAddCourse,
} from "./config/errors";
import Chapter from "./core/entities/chapter";
import AddChapterCommand from "./core/usecases/chapter/addChapter";
import CourseRepository from "./repositories/courseRepository";
import ChapterRepository from "./repositories/chapterRepository";
import Course from "./core/entities/course";
import addCourseCommand from "./core/usecases/course/addCourse";

export default class CourseService {
  private courseRepository: CourseRepository;
  private chapterRepository: ChapterRepository;

  constructor(private database: Database) {
    this.courseRepository = new CourseRepository(this.database);
    this.chapterRepository = new ChapterRepository(this.database);
  }

  async addChapter(course: Course, chapter: Chapter): Promise<Chapter> {
    const command = new AddChapterCommand(
      { course, chapter },
      this.chapterRepository
    );

    if (await command.validate()) {
      const data = await command.run();

      return data;
    } else {
      throw new UnableToAddChapter("Chapter already exists");
    }
  }

  async addCourse(course: Course): Promise<Course> {
    const command = new addCourseCommand({ course }, this.courseRepository);

    if (await command.validate()) {
      const data = await command.run();

      return data;
    } else {
      throw new UnableToAddCourse("Course already exists");
    }
  }
}
