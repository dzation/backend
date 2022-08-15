import UseCase from "@core/interfaces/usecase";
import CourseRepository from "@domains/cours/repositories/courseRepository";
import Course from "../../entities/course";

export default class deleteCourseCommand extends UseCase {
  private course: Course;
  private repository: CourseRepository;

  constructor(data: { course: Course }, repository: CourseRepository) {
    super();
    this.course = data.course;

    this.repository = repository;
  }

  async validate(): Promise<boolean> {
    return true;
  }

  async run() {
    await this.repository.deleteCourse(this.course);

    // CHECK i don't know if returning the course is a good practice
    return this.course;
  }
}
