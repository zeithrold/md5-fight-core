import { BloodMagicSkill } from '../../../../src/models/effects/internal/blood-magic';
import { BattleField } from '../../../../src';

describe('BloodMagicSkill test', () => {
  const battleField = new BattleField({
    west: 'test',
    east: 'foo',
  });
  const bloodMagicSkill = new BloodMagicSkill(battleField, 'test');
  const bloodMagicSkillSpy = jest.spyOn(bloodMagicSkill, 'run');
  battleField.registerSkill('test', bloodMagicSkill);
  const westPlayer = battleField.players.west;
  const eastPlayer = battleField.players.east;
  const { eventRegistry } = battleField;
  it('should BloodMagicSkill run when player\'s health is under 10%', () => {
    westPlayer.health.value = 0.2;
    const averageHealth = (westPlayer.health.internalValue + eastPlayer.health.internalValue) / 2;
    battleField.fight('west');
    const skillAffectEventIndex = eventRegistry.storedEvent.findIndex((eventBlock) => eventBlock.event.id === 'blood-magic-affected-event');
    expect(skillAffectEventIndex).not.toBe(-1);
    const healthIncreaseEventIndex = eventRegistry.storedEvent.findIndex((eventBlock) => eventBlock.event.id === 'health-increased-event' || eventBlock.event.id === 'health-over-increased-event');
    expect(healthIncreaseEventIndex).not.toBe(-1);
    expect(eventRegistry.storedEvent[healthIncreaseEventIndex].event.data.increasedAmount).toBe(
      averageHealth - 0.2,
    );
  });
  it('should BloodMagicSkill affect once', () => {
    westPlayer.health.value = westPlayer.health.defaultValue * 0.09;
    battleField.fight('east');
    eventRegistry.pushEvent();
    westPlayer.health.value = westPlayer.health.defaultValue * 0.09;
    battleField.fight('east');
    expect(bloodMagicSkillSpy.mock.calls.length).toBe(1);
  });
});
