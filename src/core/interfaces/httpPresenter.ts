import Express from "express";
import { IRouter } from "express";

export default class HttpPresenter {
  protected route: IRouter;

  constructor() {
    this.route = Express.Router();
  }

  // todo : implement telimetry
}
