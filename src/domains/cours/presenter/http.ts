import HttpPresenter from "@core/interfaces/httpPresenter";
import { CourseNotFoundError } from "../config/errors";
import CourseService from "../service";
import { validateAddNewCourse, validateDeleteCourse } from "./middleware";

import ENV from "@env";

export default class Http extends HttpPresenter {
  private serivce: CourseService;

  constructor(service: CourseService) {
    super();
    this.serivce = service;
  }

  async setupRoutes() {
    // link /addRoute to addChapter
    this.route.get("/addChapter", validateDeleteCourse, async (req, res) => {
      await this.serivce.addChapter(req.body);
      res.send(ENV.SITE_NAME);
      // link /deleteRoute to deleteChapter
    });

    return this.route;
  }
}
