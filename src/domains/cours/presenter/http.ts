import HttpPresenter from "@core/interfaces/httpPresenter";
import { CourseNotFoundError } from "../config/errors";
import CourseService from "../service";
import {
  validateAddChapter,
  validateAddNewCourse,
  validateDeleteCourse,
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

    return this.route;
  }
}
