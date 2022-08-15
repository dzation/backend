import EventBus from "@core/eventBus";
import Chapter from "../core/entities/chapter";
import Course from "../core/entities/course";
import CourseService from "../service";

type DispatchEvent =
  | {
      type: "ADD_CHAPTER";
      payload: Chapter;
    }
  | {
      type: "ADD_COURSE";
      payload: Course;
    }
  | {
      type: "DELETE_CHAPTER";
      payload: number;
    }
  | {
      type: "DELETE_COURSE";
      payload: number;
    };

export default class Event {
  private static serivce: CourseService;
  private static bus: EventBus;
  private static sufix = "_COURSE";

  constructor(service: CourseService) {
    Event.serivce = service;
  }

  static dispatch(payload: DispatchEvent) {
    if (!Event.bus) {
      throw new Error("EventBus is not connected");
    }
    Event.bus.dispatch(payload.type + Event.sufix, payload.payload);
  }

  connectToBus(bus: EventBus) {
    Event.bus = bus;
    this.setUpEvents();
  }

  private setUpEvents() {
    Event.bus.listen("ADD_CHAPTER" + Event.sufix, (payload: Chapter) => {
      // todo validate the payload
      Event.serivce.addChapter(payload);
    });
  }
}
