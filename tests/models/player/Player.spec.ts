import battleField from '../../../src';
import { Buff } from '../../../src/models/effects';
import { PlayerStatus } from '../../../src/models/player';

describe('Player.ts test', () => {
  it('should cleanUp() work correctly', () => {
    class TestBuff extends Buff {
      id = 'test-buff';

      description = '测试Buff';

      name = '测试Buff';

      run = jest.fn();

      destroy() {
      }
    }
    const testPlayer = battleField.players.east;
    testPlayer.buffs.get(PlayerStatus.afterUnderAttack).add(new TestBuff(
      battleField,
      testPlayer.name,
    ));
    expect(testPlayer.buffs.get(PlayerStatus.afterUnderAttack).size).toBe(1);
    // console.log(testPlayer.buffs);
    testPlayer.changeStatus(PlayerStatus.afterUnderAttack);
    expect(testPlayer.buffs.get(
      PlayerStatus.afterUnderAttack,
    ).values().next().value.run).toBeCalled();
    expect(testPlayer.buffs.get(PlayerStatus.afterUnderAttack).values().next()).toBeTruthy();
    testPlayer.cleanUp();
    // console.log(testPlayer.buffs);
    expect(testPlayer.buffs.get(PlayerStatus.afterUnderAttack).size).toBe(0);
  });
});
