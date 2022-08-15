import Database from "@repositories/database";
import {
  CourseNotFoundError,
  UnableToAddChapter,
  UnableToAddContent,
  UnableToAddCourse,
  UnableToDeleteChapter,
  UnableToDeleteContent,
  UnableToDeleteCourse,
} from "./config/errors";
import Chapter, { ChapterAgreegator } from "./core/entities/chapter";
import AddChapterCommand from "./core/usecases/chapter/addChapter";
import CourseRepository from "./repositories/courseRepository";
import ChapterRepository from "./repositories/chapterRepository";
import Course, { CourseAgreegator } from "./core/entities/course";
import addCourseCommand from "./core/usecases/course/addCourse";
import getCoursesQuery from "./core/usecases/course/getCourses";
import ContentRepository from "./repositories/contentRepository";
import GetChaptersQuery from "./core/usecases/chapter/getChapters";
import deleteCourseCommand from "./core/usecases/course/deleteCourse";
import Content from "./core/entities/content";
import addContentCommand from "./core/usecases/content/addContent";
import DeleteChapterCommand from "./core/usecases/chapter/deleteChapter";
import DeleteContentCommand from "./core/usecases/content/deleteContent";

export default class CourseService {
  private courseRepository: CourseRepository;
  private chapterRepository: ChapterRepository;
  private contentRepository: ContentRepository;

  constructor(private database: Database) {
    this.courseRepository = new CourseRepository(this.database);
    this.chapterRepository = new ChapterRepository(this.database);
    this.contentRepository = new ContentRepository(this.database);
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

  async addContent(content: Content, chapter: Chapter): Promise<Content> {
    const command = new addContentCommand(
      { content, chapter },
      this.contentRepository
    );

    if (await command.validate()) {
      const data = await command.run();

      return content;
    } else {
      throw new UnableToAddContent("Content already exists");
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

  async getCourses(): Promise<Course[]> {
    const query = new getCoursesQuery(this.courseRepository);
    const courses = await query.fetch();

    return courses;
  }

  async deleteCourse(course: Course): Promise<Course> {
    const command = new deleteCourseCommand({ course }, this.courseRepository);

    if (await command.validate()) {
      const data = await command.run();

      return data;
    } else {
      throw new UnableToDeleteCourse("can't delete the course");
    }
  }

  async deleteChapter(chapter: Chapter): Promise<Chapter> {
    const command = new DeleteChapterCommand(chapter, this.chapterRepository);

    if (await command.validate()) {
      const data = await command.run();

      return chapter;
    } else {
      throw new UnableToDeleteChapter("can't delete the chapter");
    }
  }

  async deleteContent(content: Content): Promise<Content> {
    const command = new DeleteContentCommand(content, this.contentRepository);

    if (await command.validate()) {
      const data = await command.run();

      return content;
    } else {
      // todo: you should throw an error inside try catch
      throw new UnableToDeleteContent("can't delete the Content");
    }
  }

  async getCourseChapters(
    course: Course
  ): Promise<CourseAgreegator<ChapterAgreegator>> {
    const query = new GetChaptersQuery(course, {
      repositories: {
        chapter: this.chapterRepository,
        content: this.contentRepository,
      },
    });

    const chapters = await query.fetch();

    return {
      ...course,
      chapters,
    };
  }
}
