import { Buff } from '../../index';
import { PlayerStatus } from '../../../player';

export default class LanguageEffectWeakenBuff extends Buff {
  id = 'language-effect-weaken-buff';

  name = '语言感化:弱化';

  description = '玩家本轮攻击力减弱50%。';

  affectTiming = PlayerStatus.beforeUnderAttack;

  run() {
    const ownerPlayer = this.battleField.getPlayer(this.playerId);
    ownerPlayer.attackPower.value *= 0.5;
  }

  destroy() {
    const ownerPlayer = this.battleField.getPlayer(this.playerId);
    ownerPlayer.attackPower.setDefault();
  }
}
