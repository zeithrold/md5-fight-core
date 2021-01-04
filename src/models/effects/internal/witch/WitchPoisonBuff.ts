import { Buff } from '../../index';
import { PlayerStatus } from '../../../player';
import { WitchPoisonBuffAffectedEvent } from './index';

export default class WitchPoisonBuff extends Buff {
  id = 'witch-poison-buff';

  name = '巫师:毒药术';

  description = '玩家每轮攻击开始前生命值扣除最大值的10%。'

  affectTimes = 3;

  affectTiming = PlayerStatus.beforeAttack;

  run() {
    if (this.battleField.generateRandom() > 50) {
      return;
    }
    this.battleField.eventRegistry.registerEvent(new WitchPoisonBuffAffectedEvent(), this.playerId);
    const ownerPlayer = this.battleField.getPlayer(this.playerId);
    ownerPlayer.health.value -= ownerPlayer.health.defaultValue * 0.1;
  }

  destroy() {}
}
