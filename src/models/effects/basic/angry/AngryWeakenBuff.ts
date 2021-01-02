import { Buff } from '../../index';
import { PlayerStatus } from '../../../player';
import { brainField } from '../../../../index';

export default class AngryWeakenBuff extends Buff {
  id = 'angry-weaken-buff';

  name = '愤怒：减弱防御力';

  description = '玩家的防御力减弱50%。';

  affectTimes = 1;

  affectTiming = PlayerStatus.onUnderAttack;

  run() {
    const ownerPlayer = brainField.getPlayer(this.playerId);
    ownerPlayer.attackPower.value *= 0.5;
  }

  destroy() {
    const ownerPlayer = brainField.getPlayer(this.playerId);
    ownerPlayer.attackPower.setDefault();
  }
}
