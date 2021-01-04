import { Skill } from '../../../src/models/effects';
import { BattleField } from '../../../src';
import { PlayerStatus } from '../../../src/models/player';

class TestSkill extends Skill {
  id = 'test-skill';

  description = '测试技能';

  name = '测试技能';

  run = jest.fn(() => {
    const ownerPlayer = this.battleField.getPlayer(this.playerId);
    ownerPlayer.stunned.value = true;
  });

  affectTiming = PlayerStatus.afterAttack;
}

describe('Skill class test', () => {
  it('should Skill initialize correctly', () => {
    const battleField = new BattleField({
      west: 'westPlayer',
      east: 'eastPlayer',
    });
    const westPlayer = battleField.players.west;
    battleField.registerSkill('westPlayer', new TestSkill(battleField, 'westPlayer'));
  });
  it('should Skill run when status change', () => {
    const battleField = new BattleField({
      west: 'westPlayer',
      east: 'eastPlayer',
    });
    const westPlayer = battleField.players.west;
    const testSkill = new TestSkill(battleField, 'westPlayer');
    battleField.registerSkill('westPlayer', testSkill);
    westPlayer.changeStatus(PlayerStatus.afterAttack);
    expect(testSkill.run).toBeCalled();
  });
  it('should Skill modify player\'s property correctly', () => {
    const battleField = new BattleField({
      west: 'westPlayer',
      east: 'eastPlayer',
    });
    const westPlayer = battleField.players.west;
    const testSkill = new TestSkill(battleField, 'westPlayer');
    battleField.registerSkill('westPlayer', testSkill);
    westPlayer.changeStatus(PlayerStatus.afterAttack);
    expect(westPlayer.stunned.internalValue).toBe(true);
  });
});
