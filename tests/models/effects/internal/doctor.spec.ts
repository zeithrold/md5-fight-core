import { BattleField } from '../../../../src';
import { DoctorSkill } from '../../../../src/models/effects/internal/doctor';

describe('doctor skill test', () => {
  it('should doctor skill run correctly', () => {
    const battleField = new BattleField({
      west: 'test',
      east: 'bar',
    },
    'dev');
    battleField.registerSkill('test', new DoctorSkill(battleField, 'test'));
    battleField.fight('west');
    const skillEventIndex = battleField.eventRegistry.storedEvent.findIndex((
      eventBlock,
    ) => eventBlock.event.id === 'doctor-healed-event');
    expect(skillEventIndex).not.toBe(-1);
    const healthEventIndex = battleField.eventRegistry.storedEvent.findIndex((
      eventBlock,
    ) => eventBlock.event.id === 'health-increased-event'
      || eventBlock.event.id === 'health-over-increased-event');
    expect(healthEventIndex).not.toBe(-1);
    expect(battleField.eventRegistry.storedEvent[healthEventIndex].event.data.increasedAmount)
      .toBe(battleField.players.west.health.defaultValue * 0.2);
  });
});
