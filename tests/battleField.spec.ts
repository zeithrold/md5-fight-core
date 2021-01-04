import { BattleField } from '../src';

describe('BattleField.ts test', () => {
  it('should BattleField initialize correctly', () => {
    expect(() => {
      const battleField = new BattleField({ east: 'hello', west: 'world' });
    }).not.toThrow();
  });
  it('should BattleField order fight correctly', () => {
    const battleField = new BattleField({
      west: 'westPlayer',
      east: 'eastPlayer',
    });
    expect(battleField.eventRegistry.events.values().next().value[0].event.id).toBe('fight-order-event');
  });
});
