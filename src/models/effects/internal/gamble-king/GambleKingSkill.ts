import { Skill } from '../../index';
import battleField, { brainField } from '../../../../index';
import { GambleKingWeakenBuff, GambleKingSucceededEvent, GambleKingFailedEvent } from './index';

export default class GambleKingSkill extends Skill {
  id = 'gamble-king-skill';

  name = '777';

  description = '攻击者在攻击阶段有40%的概率触发。 丢一枚硬币。若结果为正面，本轮攻击被攻击者的防御无效；若结果为反面，攻击者在攻击前生命值减少最大生命值的30%';

  run() {
    if (brainField.generateRandom() >= 40) {
      return;
    }
    if (brainField.generateRandom() < 50) {
      battleField.eventRegistry.registerEvent(new GambleKingSucceededEvent(), this.playerId);
      brainField.registerBuff(
        brainField.getOppositePlayer(this.playerId).name, new GambleKingWeakenBuff(),
      );
    } else {
      battleField.eventRegistry.registerEvent(new GambleKingFailedEvent(), this.playerId);
      const ownerPlayer = brainField.getPlayer(this.playerId);
      ownerPlayer.health.value -= ownerPlayer.health.defaultValue * 0.3;
    }
  }
}
