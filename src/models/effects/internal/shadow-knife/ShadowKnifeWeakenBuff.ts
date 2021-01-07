import { Buff } from '../../index';
import { PlayerStatus } from '../../../player';

export default class ShadowKnifeWeakenBuff extends Buff {
  id = 'shadow-knife-weaken-buff';

  name = '快刀斩乱麻: 影刃';

  description = '玩家攻击力变为40%。'

  affectTiming = PlayerStatus.onAttack;

  affectTimes = 1;

  run() {
    const ownerPlayer = this.battleField.getPlayer(this.playerId);
    ownerPlayer.attackPower.value = ownerPlayer.attackPower.internalValue * 0.4;
  }

  destroy() {
    const ownerPlayer = this.battleField.getPlayer(this.playerId);
    ownerPlayer.attackPower.setDefault();
  }
}
