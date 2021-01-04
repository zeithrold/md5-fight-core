import { Buff } from '../../index';
import { PlayerStatus } from '../../../player';

export default class DodgeUnattackableBuff extends Buff {
  affectTimes = 1;

  affectTiming = PlayerStatus.onUnderAttack;

  name = '闪避'

  description = '玩家不可被攻击。'

  id = 'dodge-unattackable-buff';

  run() {
    const ownerPlayer = this.battleField.getPlayer(this.playerId);
    ownerPlayer.attackable.value = false;
  }

  destroy() {
    const ownerPlayer = this.battleField.getPlayer(this.playerId);
    ownerPlayer.attackable.setDefault();
  }
}
