import { BattleField } from '../../../../src';
import { WitchSkill } from '../../../../src/models/effects/internal/witch';
import { PlayerStatus } from '../../../../src/models/player';

describe('WitchSkill test', () => {
  const battleField = new BattleField({
    west: 'bar',
    east: 'foo',
  }, 'dev');
  const witchSkill = new WitchSkill(battleField, 'bar');
  const witchSkillSpy = jest.spyOn(witchSkill, 'run');
  battleField.registerSkill('bar', witchSkill);
  const eastPlayer = battleField.players.east;
  const { eventRegistry } = battleField;
  it('should WitchSkill run', () => {
    battleField.fight('west');
    expect(witchSkillSpy).toBeCalled();
    const witchSkillAffectedEventIndex = eventRegistry.storedEvent.findIndex(
      (eventBlock) => eventBlock.event.id === 'witch-skill-affected-event',
    );
    expect(witchSkillAffectedEventIndex).not.toBe(-1);
  });
  it('should WitchPoisonBuff run', () => {
    battleField.fight('west');
    eventRegistry.pushEvent();
    const eastPlayerDefaultHealth = eastPlayer.health.defaultValue;
    battleField.fight('east');
    const witchPoisonBuffAffectedEventIndex = eventRegistry.storedEvent.findIndex(
      (eventBlock) => eventBlock.event.id === 'witch-poison-buff-affected-event',
    );
    expect(witchPoisonBuffAffectedEventIndex).not.toBe(-1);
    const healthDecreasedEventIndex = eventRegistry.storedEvent.findIndex(
      (eventBlock) => eventBlock.event.id === 'health-decreased-event',
    );
    expect(healthDecreasedEventIndex).not.toBe(-1);
    expect(
      Math.floor(
        eventRegistry.storedEvent[healthDecreasedEventIndex].event.data.decreasedAmount * 10,
      ) / 10,
    ).toBe(eastPlayerDefaultHealth * 0.1);
  });
  it('should WitchMagicSkill refresh its affect time when duplicate registering buff', () => {
    battleField.fight('west');
    eventRegistry.pushEvent();
    battleField.fight('east');
    let hasWitchPoisonBuff = false;
    let affectTimes = 0;
    for (const buff of eastPlayer.buffs.get(PlayerStatus.beforeAttack)) {
      if (buff.id === 'witch-poison-buff') {
        hasWitchPoisonBuff = true;
        affectTimes = buff.affectTimes;
      }
    }
    expect(hasWitchPoisonBuff).toBeTruthy();
    expect(affectTimes).toBe(2);
    battleField.fight('west');
    let witchPoisonBuffAmount = 0;
    for (const buff of eastPlayer.buffs.get(PlayerStatus.beforeAttack)) {
      if (buff.id === 'witch-poison-buff') {
        witchPoisonBuffAmount += 1;
        hasWitchPoisonBuff = true;
        affectTimes = buff.affectTimes;
      }
    }
    expect(hasWitchPoisonBuff).toBeTruthy();
    expect(affectTimes).toBe(3);
    expect(witchPoisonBuffAmount).toBe(1);
  });
});
