import Content from "./content";

export default interface Chapter {
  id: number;
  title: string;
}

export interface ChaptorAgreegator extends Chapter {
  content: Content[];
}
