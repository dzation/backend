import ID from "@core/entities/id";

type Content = {
  id: ID;
  title: string;
  type: "PDF" | "VIDEO" | "AUDIO" | "IMAGE" | "LINK" | "ZOOM";
  url: string;
  freemium: boolean;
};

export default Content;
