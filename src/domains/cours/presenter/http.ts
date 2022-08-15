import HttpPresenter from "@core/interfaces/httpPresenter";
import CourseService from "../service";
import {
  validateAddChapter,
  validateAddContent,
  validateAddNewCourse,
  validateValideChapter,
  validateValideContent,
  validateValideCourse,
} from "./middleware";

import ENV from "@env";

export default class Http extends HttpPresenter {
  private serivce: CourseService;

  constructor(service: CourseService) {
    super();
    this.serivce = service;
  }

  async setupRoutes() {
    this.route.post("/addChapter", validateAddChapter, async (req, res) => {
      const chapter = await this.serivce.addChapter(
        req.body.course,
        req.body.chapter
      );

      res.json({ chapter });
    });

    this.route.post("/addCourse", validateAddNewCourse, async (req, res) => {
      const course = await this.serivce.addCourse(req.body.course);
      res.json({ course });
    });

    this.route.get("/", async (req, res) => {
      const courses = await this.serivce.getCourses();

      res.json({ courses });
    });

    this.route.post("/chapters", validateValideCourse, async (req, res) => {
      const courseAgreegated = await this.serivce.getCourseChapters(
        req.body.course
      );

      res.json({ course: courseAgreegated });
    });

    this.route.post("/delete", validateValideCourse, async (req, res) => {
      const deletedCourse = await this.serivce.deleteCourse(req.body.course);

      res.json({ deleted: { course: deletedCourse } });
    });

    this.route.post("/addContent", validateAddContent, async (req, res) => {
      const content = await this.serivce.addContent(
        req.body.content,
        req.body.chapter
      );

      res.json({ content });
    });

    this.route.post(
      "/chapter/delete",
      validateValideChapter,
      async (req, res) => {
        const deletedChapter = await this.serivce.deleteChapter(
          req.body.chapter
        );

        res.json({ deleted: { chapter: deletedChapter } });
      }
    );

    this.route.post(
      "/content/delete",
      validateValideContent,
      async (req, res) => {
        const deletedContent = await this.serivce.deleteContent(
          req.body.content
        );

        res.json({ deleted: { content: deletedContent } });
      }
    );

    return this.route;
  }
}
