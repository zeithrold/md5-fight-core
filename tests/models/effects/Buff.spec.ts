import { Buff } from '../../../src/models/effects';
import { BattleField } from '../../../src';
import { PlayerStatus } from '../../../src/models/player';

class TestBuff extends Buff {
  id = 'test-buff';

  description = '测试效果';

  name = '测试效果';

  affectTiming = PlayerStatus.onUnderAttack;

  run = jest.fn();

  destroy = jest.fn();
}
describe('class Buff test', () => {
  it('should Buff initialize correctly', () => {
    const battleField = new BattleField({ west: 'foo', east: 'bar' });
    const eastPlayer = battleField.players.east;
    expect(() => {
      battleField.registerBuff(eastPlayer.name, new TestBuff(battleField));
    }).not.toThrow();
  });
  it('should Buff run when on the affect timing', () => {
    const battleField = new BattleField({ west: 'foo', east: 'bar' });
    const eastPlayer = battleField.players.east;
    eastPlayer.changeStatus(PlayerStatus.onUnderAttack);
    for (const buff of eastPlayer.buffs.get(PlayerStatus.onUnderAttack)) {
      if (buff.id === 'test-buff') expect(buff.run).toBeCalled();
    }
  });
  it('should Buff\'s affectTimes discount when on the affect', () => {
    const battleField = new BattleField({ west: 'foo', east: 'bar' });
    const eastPlayer = battleField.players.east;
    eastPlayer.changeStatus(PlayerStatus.onUnderAttack);
    for (const buff of eastPlayer.buffs.get(PlayerStatus.onUnderAttack)) {
      if (buff.id === 'test-buff') expect(buff.affectTimes).toBe(0);
    }
  });
  it('should Buff destroy() calls when cleaning up', () => {
    const battleField = new BattleField({ west: 'foo', east: 'bar' });
    const eastPlayer = battleField.players.east;
    eastPlayer.changeStatus(PlayerStatus.onUnderAttack);
    eastPlayer.cleanUp();
    for (const buff of eastPlayer.buffs.get(PlayerStatus.onUnderAttack)) {
      if (buff.id === 'test-buff') expect(buff.affectTimes).toBe(0);
    }
  });
});
