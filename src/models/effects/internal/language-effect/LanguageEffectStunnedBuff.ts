import { Buff } from '../../index';
import { PlayerStatus } from '../../../player';
import battleField, { brainField } from '../../../../index';
import { LanguageEffectStunnedEvent } from './index';

export default class LanguageEffectStunnedBuff extends Buff {
  id = 'language-effect-stunned-buff';

  name = '语言感化: 禁锢';

  description = '玩家本轮无法攻击。';

  affectTimes = 1;

  affectTiming = PlayerStatus.beforeAttack;

  run() {
    battleField.eventRegistry.registerEvent(new LanguageEffectStunnedEvent(), this.playerId);
    const ownerPlayer = brainField.getPlayer(this.playerId);
    ownerPlayer.stunned.value = true;
  }

  destroy() {
    const ownerPlayer = brainField.getPlayer(this.playerId);
    ownerPlayer.stunned.setDefault();
  }
}
