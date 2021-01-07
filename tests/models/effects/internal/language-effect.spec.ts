import { BattleField } from '../../../../src';
import { LanguageEffectSkill } from '../../../../src/models/effects/internal/language-effect';
import { PlayerStatus } from '../../../../src/models/player';

describe('LanguageEffectSkill test', () => {
  const battleField = new BattleField({
    west: 'bar',
    east: 'foo',
  }, 'dev');
  const languageEffectSkill = new LanguageEffectSkill(battleField, 'bar');
  const languageEffectSkillSpy = jest.spyOn(languageEffectSkill, 'run');
  battleField.registerSkill('bar', languageEffectSkill);
  const eastPlayer = battleField.players.east;
  const { eventRegistry } = battleField;
  it('should LanguageEffect run', () => {
    battleField.fight('west');
    expect(languageEffectSkillSpy).toBeCalled();
    const languageEffectSkillAffectedEventIndex = eventRegistry.storedEvent.findIndex((eventBlock) => eventBlock.event.id === 'language-effect-affected-event');
    expect(languageEffectSkillAffectedEventIndex).not.toBe(-1);
  });
  it('should LanguageEffectStunned run', () => {
    battleField.fight('west');
    eventRegistry.pushEvent();
    let hasStunnedBuff = false;
    for (const buff of eastPlayer.buffs.get(PlayerStatus.beforeAttack)) {
      if (buff.id === 'language-effect-stunned-buff') hasStunnedBuff = true;
    }
    expect(hasStunnedBuff).toBe(true);
    battleField.fight('east');
    const attackEventIndex = eventRegistry.storedEvent.findIndex((eventBlock) => eventBlock.event.id === 'attack-event');
    expect(attackEventIndex).toBe(-1);
  });
});
