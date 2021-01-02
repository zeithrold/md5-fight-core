import { Buff } from '../../index';
import { PlayerStatus } from '../../../player';
import battleField, { brainField } from '../../../../index';
import { ThunderMagicBuffAffectedEvent } from './index';

export default class ThunderMagicBuff extends Buff {
  id = 'thunder-magic-buff';

  name = '雷电法术:雷雨';

  description = '玩家在攻击阶段有50%的几率生命值减半。'

  affectTimes = 3;

  affectTiming = PlayerStatus.beforeAttack;

  run() {
    if (brainField.generateRandom() > 50) {
      return;
    }
    battleField.eventRegistry.registerEvent(new ThunderMagicBuffAffectedEvent(), this.playerId);
    const ownerPlayer = brainField.getPlayer(this.playerId);
    ownerPlayer.health.value *= 0.5;
  }

  destroy() {}
}
