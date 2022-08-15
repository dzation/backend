import Express from "express";
import ENV from "./env";
const app = Express();

import EventEmitter from "events";
import EventBus from "./core/eventBus";
const bus = new EventBus(new EventEmitter());

import Database from "@repositories/database";
const database = new Database("db");

import Course from "@domains/cours";

const courseService = new Course.Service(database);
const courseHttp = new Course.Http(courseService);
const courseEvents = new Course.Events(courseService);

async function bootstrap() {
  app.use("/course", await courseHttp.setupRoutes());

  courseEvents.connectToBus(bus);

  app.listen(ENV.PORT, () => {
    console.log("Server is listening on port " + ENV.PORT);
  });
}

bootstrap();
