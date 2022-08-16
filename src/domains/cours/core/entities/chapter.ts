import ID from "@core/entities/id";
import Content from "./content";

export default interface Chapter {
  id: ID;
  title: string;
}

export interface ChapterAgreegator extends Chapter {
  content: Content[];
}
