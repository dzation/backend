import ContentRepository from "../../../repositories/contentRepository";

import UseCase from "@core/interfaces/usecase";
import Content from "../../entities/content";

export default class DeleteContentCommand extends UseCase {
  private content: Content;
  private repository: ContentRepository;

  constructor(content: Content, repository: ContentRepository) {
    super();

    this.repository = repository;
    this.content = content;
  }

  async validate(): Promise<boolean> {
    return true;
  }

  async run(): Promise<void> {
    await this.repository.deleteContent(this.content);
  }
}
