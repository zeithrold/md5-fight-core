import Event from './Event';

export default class EventRegistry {
  readonly events: {
    event: Event;
    playerId: string;
  }[][] = [];

  storedEvent: {
    event: Event;
    playerId: string;
  }[] = [];

  registerEvent(event: Event, playerId: string) {
    this.storedEvent.push({
      event,
      playerId,
    });
  }

  pushEvent() {
    this.events.push(this.storedEvent);
    this.storedEvent = [];
  }

  get messages() {
    const result: [string, string][][] = this.events.map(
      (eventBlock) => eventBlock.map(
        (eventLine) => [eventLine.event.message(eventLine.playerId), eventLine.event.color],
      ),
    );
    return result;
  }
}
