import Event from './Event';

export interface EventBlock {
  event: Event;
  playerId: string;
}

export interface MessageBlock {
  message: string;
  color: string;
}

export default class EventRegistry {
  readonly events: Set<EventBlock[]> = new Set<EventBlock[]>();

  storedEvent: EventBlock[] = [];

  registerEvent(event: Event, playerId: string) {
    this.storedEvent.push({
      event,
      playerId,
    });
  }

  pushEvent() {
    this.events.add(this.storedEvent);
    this.storedEvent = [];
  }

  get messages() {
    const result = new Set<MessageBlock[]>();
    for (const eventModule of this.events) {
      const messageBlocks = [];
      for (const eventBlock of eventModule) {
        const messageBlock: MessageBlock = {
          message: eventBlock.event.message(eventBlock.playerId),
          color: eventBlock.event.color ? eventBlock.event.color : 'default',
        };
        messageBlocks.push(messageBlock);
      }
      result.add(messageBlocks);
    }
    return result;
  }
}
