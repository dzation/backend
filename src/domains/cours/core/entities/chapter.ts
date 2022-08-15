import Content from "./content";

export default interface Chapter {
  id: number;
  title: string;
}

export interface ChapterAgreegator extends Chapter {
  content: Content[];
}
