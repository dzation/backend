import Chapter from "./chapter";

type Course = {
  id: number;
  title: string;
  image: string;
  price: number;
  chapters: Chapter[];
};

export default Course;
