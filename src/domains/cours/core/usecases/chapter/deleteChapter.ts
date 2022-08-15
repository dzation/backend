import ChapterRepository from "../../../repositories/chapterRepository";

import UseCase from "@core/interfaces/usecase";
import Chapter from "../../entities/chapter";

export default class DeleteChapterCommand extends UseCase {
  private chapter: Chapter;
  private repository: ChapterRepository;

  constructor(chapter: Chapter, repository: ChapterRepository) {
    super();

    this.repository = repository;
    this.chapter = chapter;
  }

  async validate(): Promise<boolean> {
    return true;
  }

  async run(): Promise<void> {
    
    await this.repository.deleteChapter(this.chapter);
  }
}
