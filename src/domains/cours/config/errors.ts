class CoursError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CoursError";
  }
}

export class CourseNotFoundError extends CoursError {}
export class ChapterNotFoundError extends CoursError {}
export class ContentNotFoundError extends CoursError {}

export class UnableToAddCourse extends CoursError {}
export class UnableToAddChapter extends CoursError {}
export class UnableToAddContent extends CoursError {}

export class UnableToDeleteCourse extends CoursError {}
export class UnableToDeleteChapter extends CoursError {}
export class UnableToDeleteContent extends CoursError {}
