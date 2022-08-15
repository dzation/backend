import Chapter from "./chapter";

export default interface Course {
  id: number;
  title: string;
  image: string;
  price: number;
}

export interface CourseAgreegator extends Course {
  chapters: Chapter[];
}
