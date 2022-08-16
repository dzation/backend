import ID from "@core/entities/id";
import Chapter from "./chapter";

export default interface Course {
  id: ID;
  title: string;
  image: string;
  price: number;
}

export interface CourseAgreegator<T extends Chapter> extends Course {
  chapters: T[];
}
