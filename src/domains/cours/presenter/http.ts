import HttpPresenter from "@core/interfaces/httpPresenter";
import CourseService from "../service";
import {
  validateAddChapter,
  validateAddContent,
  validateAddNewCourse,
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

    return this.route;
  }
}
