type Content = {
  id: number;
  title: string;
  type: "PDF" | "VIDEO" | "AUDIO" | "IMAGE" | "LINK" | "ZOOM";
  url: string;
  freemium: boolean;
};

export default Content;
