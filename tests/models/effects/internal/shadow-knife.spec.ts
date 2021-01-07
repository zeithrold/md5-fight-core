import { BattleField } from '../../../../src';
import { ShadowKnifeSkill } from '../../../../src/models/effects/internal/shadow-knife';

describe('ShadowKnifeSkill test', () => {
  const battleField = new BattleField({
    west: 'bar',
    east: 'foo',
  }, 'dev');
  const shadowKnifeSkill = new ShadowKnifeSkill(battleField, 'bar');
  const shadowKnifeSkillSpy = jest.spyOn(shadowKnifeSkill, 'run');
  battleField.registerSkill('bar', shadowKnifeSkill);
  const westPlayer = battleField.players.west;
  const { eventRegistry } = battleField;
  it('should ShadowKnifeSkill run', () => {
    battleField.fight('west');
    expect(shadowKnifeSkillSpy).toBeCalled();
    const shadowKnifeAffectedEventIndex = eventRegistry.storedEvent.findIndex(
      (eventBlock) => eventBlock.event.id === 'shadow-knife-affected-event',
    );
    expect(shadowKnifeAffectedEventIndex).not.toBe(-1);
  });
  it('should ShadowKnifeWeakenBuff run', () => {
    battleField.fight('west');
    const attackPowerModifiedEventIndex = eventRegistry.storedEvent.findIndex(
      (eventBlock) => eventBlock.event.id === 'attack-power-modified-event',
    );
    expect(attackPowerModifiedEventIndex).not.toBe(-1);
    expect(eventRegistry.storedEvent[attackPowerModifiedEventIndex].event.data.attackPower).toBe(
      westPlayer.attackPower.defaultValue * 0.4,
    );
  });
  it('should ShadowKnifeCannotDodgeBuff run', () => {
    battleField.fight('west');
    const speedModifiedEventIndex = eventRegistry.storedEvent.findIndex(
      (eventBlock) => eventBlock.event.id === 'speed-modified-event',
    );
    expect(speedModifiedEventIndex).not.toBe(-1);
  });
});
