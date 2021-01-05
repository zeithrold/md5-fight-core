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
  it('should BattleField order by random when two player\'s speeds are equal', () => {
    const battleField = new BattleField({
      west: 'westPLayer',
      east: 'eastPlayer',
    });
    battleField.players.east.speed.value = 10;
    battleField.players.west.speed.value = 10;
    battleField.eventRegistry.events.clear();
    battleField.orderBattle();
    battleField.eventRegistry.pushEvent();
    expect(battleField.eventRegistry.events.values().next().value.findIndex(
      (eventBlock) => eventBlock.event.id === 'random-order-event',
    )).not.toBe(-1);
  });
  it('should BattleField announce people\'s death right away when player\'s speed is set to 0', () => {
    const battleField = new BattleField({
      west: 'westPLayer',
      east: 'eastPlayer',
    });
    battleField.eventRegistry.events.clear();
    battleField.players.west.health.value = 0;
    expect(battleField.checkDeath()).toBeTruthy();
    battleField.eventRegistry.pushEvent();
    expect(battleField.eventRegistry.events.values().next().value.findIndex(
      (eventBlock) => eventBlock.event.id === 'death-event',
    )).not.toBe(-1);
  });
});
