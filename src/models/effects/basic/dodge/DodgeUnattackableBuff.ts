import { Buff } from '../../index';
import { PlayerStatus } from '../../../player';
import { brainField } from '../../../../index';

export default class DodgeUnattackableBuff extends Buff {
  affectTimes = 1;

  affectTiming = PlayerStatus.onUnderAttack;

  name = '闪避'

  description = '玩家不可被攻击。'

  id = 'dodge-unattackable-buff';

  run() {
    const ownerPlayer = brainField.getPlayer(this.playerId);
    ownerPlayer.attackable.value = false;
  }

  destroy() {
    const ownerPlayer = brainField.getPlayer(this.playerId);
    ownerPlayer.attackable.setDefault();
  }
}
