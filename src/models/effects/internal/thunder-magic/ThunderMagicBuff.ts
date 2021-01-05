import { Buff } from '../../index';
import { PlayerStatus } from '../../../player';
import { ThunderMagicBuffAffectedEvent } from './index';

export default class ThunderMagicBuff extends Buff {
  id = 'thunder-magic-buff';

  name = '雷电法术:雷雨';

  description = '玩家在攻击阶段有50%的几率生命值减半。'

  affectTimes = 3;

  affectTiming = PlayerStatus.beforeAttack;

  run() {
    if (this.battleField.generateRandom() > 50) {
      return;
    }
    this.battleField.eventRegistry.registerEvent(
      new ThunderMagicBuffAffectedEvent(),
      this.playerId,
    );
    const ownerPlayer = this.battleField.getPlayer(this.playerId);
    ownerPlayer.health.value = ownerPlayer.health.internalValue * 0.5;
  }

  destroy() {}
}
