import { Request, Response } from "express";

type Middleware = (
  req: Request,
  res: Response,
  next: Function
) => Promise<void>;

export const validateAddNewCourse: Middleware = async (req, res, next) => {
  next();
};

export const validateDeleteCourse: Middleware = async (req, res, next) => {
  next();
};
