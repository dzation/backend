class CoursError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CoursError";
  }
}

export class CourseNotFoundError extends CoursError {}

export class UnableToAddCourse extends CoursError {}

export class UnableToAddChapter extends CoursError {}
