import Event from './Event';

export default class EventRegistry {
  readonly storedEvent: {
    event: Event;
    playerId: string;
  }[];

  registerEvent(event: Event, playerId: string) {
    this.storedEvent.push({
      event,
      playerId,
    });
  }
}
