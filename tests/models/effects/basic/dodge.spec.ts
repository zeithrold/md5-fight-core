import { BattleField } from '../../../../src';

describe('dodge skill test', () => {
  it('should dodge skill run correctly', () => {
    const battleField = new BattleField({
      west: 'westPlayer',
      east: 'eastPlayer',
    }, 'test');
    battleField.fight('east');
    expect(battleField.eventRegistry.storedEvent.findIndex(
      (eventBlock) => eventBlock.event.id === 'attack-event',
    )).toBe(-1);
    expect(battleField.eventRegistry.storedEvent.findIndex(
      (eventBlock) => eventBlock.event.id === 'dodge-succeeded-event',
    )).not.toBe(-1);
  });
});
