import { Request, Response } from "express";
import Chapter from "../core/entities/chapter";
import Course from "../core/entities/course";

function no(res: Response, msg: string) {
  console.error(msg);
  res.sendStatus(403);
}

type Middleware = (
  req: Request,
  res: Response,
  next: Function
) => Promise<void>;

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

export const validateAddChapter: Middleware = async (req, res, next) => {
  const data = req.body;
  console.log(data);
  if (!data?.course || !data?.chapter) {
    return no(res, "Missing course or chapter");
  }

  const chapter = data.chapter as Chapter;

  if (chapter.id) {
    // todo is it good to throw an error here or not!
    return no(res, "chapter id is not allowed");
  }

  if (!chapter.title || chapter.title.length < 10) {
    return no(res, "chapter title must be at least 10 characters");
  }

  // check if the course is valid
  return validateValideCourse(req, res, next);
};
