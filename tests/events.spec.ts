import {
  Event, EventBlock, EventRegistry, MessageBlock,
} from '../src/events';

class TestEvent implements Event {
  id = 'test-event';

  name = '测试事件';

  message = jest.fn((playerId) => `Test Message, playerId: ${playerId}`)
}

describe('EventRegistry class test', () => {
  it('should EventRegistry class initialize correctly', () => {
    expect(() => {
      const eventRegistry = new EventRegistry();
    }).not.toThrow();
  });
  it('should EventRegistry registerEvent correctly', () => {
    const eventRegistry = new EventRegistry();
    const testEvent = new TestEvent();
    eventRegistry.registerEvent(testEvent, 'test-player');
    const expectedEventBlock = {
      event: testEvent,
      playerId: 'test-player',
    };
    expect(eventRegistry.storedEvent.values().next().value).toEqual(expectedEventBlock);
    expect(eventRegistry.storedEvent.values().next().value.event.message).toBeTruthy();
  });
  it('should EventRegistry push correctly', () => {
    const eventRegistry = new EventRegistry();
    const testEvent = new TestEvent();
    eventRegistry.registerEvent(testEvent, 'test-player');
    eventRegistry.pushEvent();
    expect(eventRegistry.storedEvent.length).toBe(0);
    expect(eventRegistry.events.size).toBe(1);
    expect(eventRegistry.events.values().next().value.length).toBe(1);
    expect(eventRegistry.events.values().next().value[0]).toEqual({ event: testEvent, playerId: 'test-player' });
  });
  it('should EventRegistry exports message correctly', () => {
    const eventRegistry = new EventRegistry();
    const testEvent = new TestEvent();
    eventRegistry.registerEvent(testEvent, 'test-player');
    eventRegistry.pushEvent();
    expect(eventRegistry.messages.size).toBe(1);
    expect(testEvent.message).toBeCalled();
    const expectedMessageBlock = [{
      message: 'Test Message, playerId: test-player',
      color: 'default',
    }];
    expect(eventRegistry.messages.values().next().value).toStrictEqual(expectedMessageBlock);
  });
});
