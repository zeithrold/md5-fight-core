import { Buff } from '../../index';
import { PlayerStatus } from '../../../player';
import { brainField } from '../../../../index';

export default class AngryEmpoweredBuff extends Buff {
  id = 'angry-empowered-buff';

  name = '愤怒：加强攻击力';

  description = '玩家的攻击力加强50%。';

  affectTimes = 1;

  affectTiming = PlayerStatus.onAttack;

  run() {
    const ownerPlayer = brainField.getPlayer(this.playerId);
    ownerPlayer.attackPower.value *= 1.5;
  }

  destroy() {
    const ownerPlayer = brainField.getPlayer(this.playerId);
    ownerPlayer.attackPower.setDefault();
  }
}
