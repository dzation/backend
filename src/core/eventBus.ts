import EventEmitter from "events";

export default class EventBus {
  private bus: EventEmitter;

  constructor(bus: EventEmitter) {
    this.bus = bus;
  }

  dispatch(eventName: string, data: any) {
    const ID = Math.floor(Math.random() * 10000000);

    this.bus.emit(eventName, {
      id: ID,
      data: data,
    });
  }

  listen(eventName: string, callback: any) {
    this.bus.on(eventName, callback);
  }

  once(id: number, eventName: string, callback: any) {
    this.bus.once(eventName, (event: any) => {
      if (event.id === id) {
        callback(event.data);
      }
    });
  }
}
