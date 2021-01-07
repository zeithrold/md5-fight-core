import { BattleField } from '../../../../src';
import { ThunderMagicSkill } from '../../../../src/models/effects/internal/thunder-magic';
import { PlayerStatus } from '../../../../src/models/player';

describe('ThunderMagicSkill test', () => {
  const battleField = new BattleField({
    west: 'bar',
    east: 'foo',
  }, 'dev');
  const thunderMagicSkill = new ThunderMagicSkill(battleField, 'bar');
  const thunderMagicSkillSpy = jest.spyOn(thunderMagicSkill, 'run');
  battleField.registerSkill('bar', thunderMagicSkill);
  const eastPlayer = battleField.players.east;
  const { eventRegistry } = battleField;
  it('should ThunderMagicSkill run', () => {
    battleField.fight('west');
    expect(thunderMagicSkillSpy).toBeCalled();
    const thunderMagicSkillAffectedEventIndex = eventRegistry.storedEvent.findIndex(
      (eventBlock) => eventBlock.event.id === 'thunder-magic-skill-affected-event',
    );
    expect(thunderMagicSkillAffectedEventIndex).not.toBe(-1);
  });
  it('should ThunderMagicBuff run', () => {
    battleField.fight('west');
    eventRegistry.pushEvent();
    const beforeEastHealth = eastPlayer.health.internalValue;
    battleField.fight('east');
    const thunderMagicBuffAffectedEventIndex = eventRegistry.storedEvent.findIndex(
      (eventBlock) => eventBlock.event.id === 'thunder-magic-buff-affected-event',
    );
    expect(thunderMagicBuffAffectedEventIndex).not.toBe(-1);
    const healthDecreasedEventIndex = eventRegistry.storedEvent.findIndex(
      (eventBlock) => eventBlock.event.id === 'health-decreased-event',
    );
    expect(healthDecreasedEventIndex).not.toBe(-1);
    expect(
      eventRegistry.storedEvent[healthDecreasedEventIndex].event.data.decreasedAmount,
    ).toBe(beforeEastHealth / 2);
  });
  it('should ThunderMagicBuff refresh its affect time when duplicate registering buff', () => {
    battleField.fight('west');
    eventRegistry.pushEvent();
    battleField.fight('east');
    let hasThunderMagicBuff = false;
    let affectTimes = 0;
    for (const buff of eastPlayer.buffs.get(PlayerStatus.beforeAttack)) {
      if (buff.id === 'thunder-magic-buff') {
        hasThunderMagicBuff = true;
        affectTimes = buff.affectTimes;
      }
    }
    expect(hasThunderMagicBuff).toBeTruthy();
    expect(affectTimes).toBe(2);
    battleField.fight('west');
    let thunderMagicBuffAmount = 0;
    for (const buff of eastPlayer.buffs.get(PlayerStatus.beforeAttack)) {
      if (buff.id === 'thunder-magic-buff') {
        thunderMagicBuffAmount += 1;
        hasThunderMagicBuff = true;
        affectTimes = buff.affectTimes;
      }
    }
    expect(hasThunderMagicBuff).toBeTruthy();
    expect(affectTimes).toBe(3);
    expect(thunderMagicBuffAmount).toBe(1);
  });
});
