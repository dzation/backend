import UseCase from "@core/interfaces/usecase";
import CourseRepository from "@domains/cours/repositories/courseRepository";
import Chapter from "../../entities/chapter";
import Course from "../../entities/course";

export default class addCourseCommand implements UseCase {
  private course: Course;
  private repository: CourseRepository;

  constructor(data: { course: Course }, repository: CourseRepository) {
    this.course = data.course;

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
  }
}
