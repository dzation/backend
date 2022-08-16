import ID from "@core/entities/id";
import { generateID } from "@core/helper";
import UseCase from "@core/interfaces/usecase";
import ContentRepository from "@domains/cours/repositories/contentRepository";
import Chapter from "../../entities/chapter";
import Content from "../../entities/content";

export default class addContentCommand extends UseCase {
  private content: Content;
  private chapter: Chapter;
  private repository: ContentRepository;

  constructor(
    data: { chapter: Chapter; content: Content },
    repository: ContentRepository
  ) {
    super();

    // CHECK going to insert the generated id here, but not sure if its a good practice, because this technique is uselly generated on the client side

    this.content = {
      ...data.content,
      id: ID.generate(),
    };

    this.chapter = data.chapter;

    this.repository = repository;
  }

  async validate(): Promise<boolean> {
    try {
      await this.repository.getContent(this.content.id);
      return false;
    } catch (_) {}

    return true;
  }

  async run(): Promise<void> {
    await this.repository.addContent(this.chapter, this.content);
  }
}
