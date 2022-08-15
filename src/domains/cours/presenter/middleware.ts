import { Request, Response } from "express";
import Chapter from "../core/entities/chapter";
import Content from "../core/entities/content";
import Course from "../core/entities/course";

function no(res: Response, msg: string) {
  console.error(msg);
  res.sendStatus(403);
}

type Middleware = (req: Request, res: Response, next: Function) => Promise<any>;

export const validateAddNewCourse: Middleware = async (req, res, next) => {
  const data = req.body;
  console.log(data);
  if (!data?.course) {
    return no(res, "Missing course");
  }

  const course = data.course as Course;

  // todo use helper to validate course id  & image
  if (course.id) {
    return no(res, "Course id is not allowed");
  }

  if (!course.title || course.title.length < 3) {
    return no(res, "Missing course title or title is too short");
  }

  if (!course.image) {
    return no(res, "Missing course image");
  }

  if (!course.price || course.price < 0) {
    return no(res, "Missing course price");
  }

  return next();
};

export const validateValideCourse: Middleware = async (req, res, next) => {
  const data = req.body;
  console.log(data);
  if (!data?.course) {
    return no(res, "Missing course");
  }

  const course = data.course as Course;

  // todo use helper to validate course id  & image
  if (!course.id) {
    return no(res, "Missing course id");
  }

  if (!course.title || course.title.length < 3) {
    return no(res, "Missing course title or title is too short");
  }

  if (!course.image) {
    return no(res, "Missing course image");
  }

  if (!course.price || course.price < 0) {
    return no(res, "Missing course price");
  }

  return next();
};

export const validateDeleteCourse: Middleware = async (req, res, next) => {
  return validateValideCourse(req, res, next);
};

const validateChapterBody: Middleware = async (req, res, next) => {
  const data = req.body;
  console.log(data);
  if (!data?.chapter) {
    return no(res, "Missing Chapter");
  }

  const chapter = data.chapter as Chapter;

  if (!chapter.title || chapter.title.length < 10) {
    return no(res, "chapter title must be at least 10 characters");
  }

  return next();
};

export const validateValideChapter: Middleware = async (req, res, next) => {
  const data = req.body;
  console.log(data);
  if (!data?.chapter) {
    return no(res, "Missing chapter");
  }

  const chapter = data.chapter as Chapter;

  if (!chapter.id) {
    return no(res, "Missing chapter id");
  }

  return validateChapterBody(req, res, next);
};

export const validateAddChapter: Middleware = async (req, res, next) => {
  const data = req.body;
  console.log(data);
  if (!data?.course || !data?.chapter) {
    return no(res, "Missing course or chapter");
  }
  const chapter = data.chapter as Chapter;

  if (chapter.id) {
    // CHECK is it good to throw an error here or not!
    return no(res, "chapter id is not allowed");
  }

  // check if the course is valid
  return validateChapterBody(req, res, () =>
    validateValideCourse(req, res, next)
  );
};

const validateContentBody: Middleware = async (req, res, next) => {
  const data = req.body;
  console.log(data);
  if (!data?.content) {
    return no(res, "Missing Content");
  }

  const content = data.content as Content;

  if (!content.title || content.title.length < 10) {
    return no(res, "content title must be at least 10 characters");
  }

  const valideType = ["PDF", "LINK", "ZOOM", "VIDEO", "IMAGE"].includes(
    content.type
  );
  if (!valideType) {
    return no(res, "content type is not valide");
  }

  if ((content.freemium as any)! instanceof Boolean) {
    return no(res, "content freemuim must be Boolean");
  }

  if (
    !(content.url.startsWith("http://") || content.url.startsWith("https://"))
  ) {
    return no(res, "content URL is not valide");
  }

  return next();
};

export const validateValideContent: Middleware = async (req, res, next) => {
  const data = req.body;
  console.log(data);
  if (!data?.content) {
    return no(res, "Missing Content");
  }

  const content = data.content as Content;

  if (!content.id) {
    return no(res, "chapter id is missing");
  }

  return validateContentBody(req, res, next);
};

export const validateAddContent: Middleware = async (req, res, next) => {
  const data = req.body;
  console.log(data);
  if (!data?.content || !data?.chapter) {
    return no(res, "Missing Content or Chapter");
  }

  if (data.content.id) {
    // CHECK isn't the job of the client to generate the id
    return no(res, "content id is not allowed");
  }

  // check if the course is valid
  return validateContentBody(req, res, () =>
    validateValideChapter(req, res, next)
  );
};
