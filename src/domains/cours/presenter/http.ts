import HttpPresenter from "@core/interfaces/httpPresenter";
import CourseService from "../service";

import { Request, Response } from "express";
import {
  ChapterMapper,
  ContentMapper,
  CourseMapper,
  FromChapter,
  FromContent,
  FromCourse,
} from "./mappers";
import {
  validateAddChapter,
  validateAddContent,
  validateAddNewCourse,
  validateValideChapter,
  validateValideContent,
  validateValideCourse,
} from "./middleware";

export default class Http extends HttpPresenter {
  private serivce: CourseService;

  constructor(service: CourseService) {
    super();
    this.serivce = service;
  }

  async setupRoutes() {
    this.route.post(
      "/addChapter",
      validateAddChapter,
      this.addChapter.bind(this)
    );

    this.route.post(
      "/addCourse",
      validateAddNewCourse,
      this.addCourse.bind(this)
    );

    this.route.get("/", this.getCourses.bind(this));

    this.route.post(
      "/chapters",
      validateValideCourse,
      this.getChapters.bind(this)
    );

    this.route.post(
      "/delete",
      validateValideCourse,
      this.deleteCourse.bind(this)
    );

    this.route.post(
      "/addContent",
      validateAddContent,
      this.addContent.bind(this)
    );

    this.route.post(
      "/chapter/delete",
      validateValideChapter,
      this.deleteChapter.bind(this)
    );

    this.route.post(
      "/content/delete",
      validateValideContent,
      this.deleteContent.bind(this)
    );

    return this.route;
  }

  private async getCourses(req: Request, res: Response) {
    const courses = await this.serivce.getCourses();

    res.json({ courses: courses.map(FromCourse) });
  }

  private async addCourse(req: Request, res: Response) {
    const course = await this.serivce.addCourse(CourseMapper(req.body.course));
    res.json({ course: FromCourse(course) });
  }

  private async deleteCourse(req: Request, res: Response) {
    const deletedCourse = await this.serivce.deleteCourse(
      CourseMapper(req.body.course)
    );

    res.json({ deleted: { course: FromCourse(deletedCourse) } });
  }

  private async deleteChapter(req: Request, res: Response) {
    const deletedChapter = await this.serivce.deleteChapter(
      ChapterMapper(req.body.chapter)
    );

    res.json({ deleted: { chapter: FromChapter(deletedChapter) } });
  }

  private async addChapter(req: Request, res: Response) {
    const chapter = await this.serivce.addChapter(
      CourseMapper(req.body.course),
      ChapterMapper(req.body.chapter)
    );

    res.json({ chapter: FromChapter(chapter) });
  }
  private async getChapters(req: Request, res: Response) {
    let courseAgreegated = await this.serivce.getCourseChapters(
      CourseMapper(req.body.course)
    );

    res.json({
      course: FromCourse({
        ...courseAgreegated,
        chapters: courseAgreegated.chapters.map((c) =>
          FromChapter({
            ...c,
            content: c.content.map(FromContent),
          } as any)
        ),
      } as any),
    });
  }

  private async addContent(req: Request, res: Response) {
    const content = await this.serivce.addContent(
      ContentMapper(req.body.content),
      ChapterMapper(req.body.chapter)
    );

    res.json({ content: FromContent(content) });
  }

  private async deleteContent(req: Request, res: Response) {
    const deletedContent = await this.serivce.deleteContent(
      ContentMapper(req.body.content)
    );

    res.json({ deleted: { content: FromContent(deletedContent) } });
  }
}
