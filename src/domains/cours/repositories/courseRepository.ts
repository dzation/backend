import Course from "../core/entities/course";

import Database from "../../../repositories/database";

export default class CourseRepository {
  courses: Course[] = [];
  constructor(private Database: Database) {
    this.courses = [];
  }

  async addCourse(course: Course): Promise<Course> {
    this.courses.push(course);
    return course;
  }

  async getCourse(id: number): Promise<Course> {
    const course = this.courses.find((c) => c.id === id);
    if (course) {
      return course;
    }
    throw new Error("Course not found");
  }

  async getCourses(): Promise<Course[]> {
    return this.courses;
  }
}
