import UseCase from "../../../../../core/interfaces/usecase";
import Chapter from "../../entities/chapter";

class DeleteChapterCommand implements UseCase {
  private chapter: Chapter;
  constructor(chapter: Chapter) {
    this.chapter = chapter;
  }
  validate(): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  async run(): Promise<any> {}
}
