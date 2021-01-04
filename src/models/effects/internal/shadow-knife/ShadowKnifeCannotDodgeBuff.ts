import { Buff } from '../../index';
import { PlayerStatus } from '../../../player';

export default class ShadowKnifeCannotDodgeBuff extends Buff {
  id = 'shadow-knife-cannot-dodge-buff';

  name = '快刀斩乱麻:眩晕';

  description = '玩家不可闪避。'

  affectTiming = PlayerStatus.beforeUnderAttack;

  affectTimes = 1;

  run() {
    const ownerPlayer = this.battleField.getPlayer(this.playerId);
    ownerPlayer.speed.value = 0;
  }

  destroy() {
    const ownerPlayer = this.battleField.getPlayer(this.playerId);
    ownerPlayer.speed.setDefault();
  }
}
