import { BattleField } from '../../../../src';
import { GambleKingSkill } from '../../../../src/models/effects/internal/gamble-king';

describe('GambleKingSkill test', () => {
  const battleField = new BattleField({
    west: 'bar',
    east: 'foo',
  }, 'dev');
  const gambleKingSkill = new GambleKingSkill(battleField, 'bar');
  const gambleKingSkillSpy = jest.spyOn(gambleKingSkill, 'run');
  battleField.registerSkill('bar', gambleKingSkill);
  const { eventRegistry } = battleField;
  it('should GambleKingSkill run', () => {
    battleField.fight('west');
    expect(gambleKingSkillSpy).toBeCalled();
    const gambleKingSucceededEventIndex = eventRegistry.storedEvent.findIndex((eventBlock) => eventBlock.event.id === 'gamble-king-succeeded-event');
    expect(gambleKingSucceededEventIndex).not.toBe(-1);
  });
  it('should GambleKingWeakenBuff run', () => {
    battleField.fight('west');
    const defenceModifiedIndex = eventRegistry.storedEvent.findIndex((eventBlock) => eventBlock.event.id === 'defence-modified-event');
    expect(defenceModifiedIndex).not.toBe(-1);
    expect(eventRegistry.storedEvent[defenceModifiedIndex].event.data.defence).toBe(0);
  });
});
