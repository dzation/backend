class CoursError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CoursError";
  }
}

export class CourseNotFoundError extends CoursError {}
