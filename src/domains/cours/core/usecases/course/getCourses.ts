import Query from "@core/interfaces/query";
import CourseRepository from "@domains/cours/repositories/courseRepository";
import Course from "../../entities/course";

export default class getCoursesQuery extends Query {
  private repository: CourseRepository;

  constructor(repository: CourseRepository) {
    super();
    this.repository = repository;
  }

  async fetch(): Promise<Course[]> {
    const courses = this.repository.getCourses();
    return courses;
  }
}
