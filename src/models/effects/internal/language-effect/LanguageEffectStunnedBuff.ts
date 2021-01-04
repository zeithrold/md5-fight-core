import { Buff } from '../../index';
import { PlayerStatus } from '../../../player';
import { LanguageEffectStunnedEvent } from './index';

export default class LanguageEffectStunnedBuff extends Buff {
  id = 'language-effect-stunned-buff';

  name = '语言感化: 禁锢';

  description = '玩家本轮无法攻击。';

  affectTimes = 1;

  affectTiming = PlayerStatus.beforeAttack;

  run() {
    this.battleField.eventRegistry.registerEvent(new LanguageEffectStunnedEvent(), this.playerId);
    const ownerPlayer = this.battleField.getPlayer(this.playerId);
    ownerPlayer.stunned.value = true;
  }

  destroy() {
    const ownerPlayer = this.battleField.getPlayer(this.playerId);
    ownerPlayer.stunned.setDefault();
  }
}
