import Course from "../core/entities/course";

import Database from "../../../repositories/database";
import ID from "@core/entities/id";

export default class CourseRepository {
  courses: Course[] = [];
  constructor(private Database: Database) {
    this.courses = [];
  }

  async addCourse(course: Course): Promise<Course> {
    this.courses.push(course);
    return course;
  }

  async getCourse(id: ID): Promise<Course> {
    const course = this.courses.find((c) => c.id.equals(id));
    if (course) {
      return course;
    }
    throw new Error("Course not found");
  }

  async deleteCourse(course: Course) {}

  async getCourses(): Promise<Course[]> {
    return [
      {
        id: ID.generate(),
        image: "https://laknabil.me/nabil.png",
        price: 15,
        title: "Learning how to learn",
      },
      {
        id: ID.generate(),
        image: "https://laknabil.me/nabil.png",
        price: 30,
        title: "Optical recognition",
      },
    ];
  }
}
