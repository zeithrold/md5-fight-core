import { Buff } from '../../index';
import { PlayerStatus } from '../../../player';
import { brainField } from '../../../../index';

export default class LanguageEffectWeakenBuff extends Buff {
  id = 'language-effect-weaken-buff';

  name = '语言感化:弱化';

  description = '玩家本轮攻击力减弱50%。';

  affectTiming = PlayerStatus.beforeUnderAttack;

  run() {
    const ownerPlayer = brainField.getPlayer(this.playerId);
    ownerPlayer.attackPower.value *= 0.5;
  }

  destroy() {
    const ownerPlayer = brainField.getPlayer(this.playerId);
    ownerPlayer.attackPower.setDefault();
  }
}
