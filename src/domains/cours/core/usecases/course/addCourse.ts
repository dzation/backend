import ID from "@core/entities/id";
import { generateID } from "@core/helper";
import UseCase from "@core/interfaces/usecase";
import CourseRepository from "@domains/cours/repositories/courseRepository";
import Chapter from "../../entities/chapter";
import Course from "../../entities/course";

export default class addCourseCommand extends UseCase {
  private course: Course;
  private repository: CourseRepository;

  constructor(data: { course: Course }, repository: CourseRepository) {
    super();

    this.course = {
      ...data.course,
      id: ID.generate(),
    };

    this.repository = repository;
  }

  async validate(): Promise<boolean> {
    try {
      await this.repository.getCourse(this.course.id);
      return false;
    } catch (_) {}

    return true;
  }

  async run(): Promise<any> {
    await this.repository.addCourse(this.course);
    return this.course;
  }
}
