import { Skill } from '../../index';
import { GambleKingWeakenBuff, GambleKingSucceededEvent, GambleKingFailedEvent } from './index';

export default class GambleKingSkill extends Skill {
  id = 'gamble-king-skill';

  name = '777';

  description = '攻击者在攻击阶段有40%的概率触发。 丢一枚硬币。若结果为正面，本轮攻击被攻击者的防御无效；若结果为反面，攻击者在攻击前生命值减少最大生命值的30%';

  run() {
    if (this.battleField.generateRandom() >= 40) {
      return;
    }
    if (this.battleField.generateRandom() < 50) {
      this.battleField.eventRegistry.registerEvent(new GambleKingSucceededEvent(), this.playerId);
      const oppositePlayer = this.battleField.getOppositePlayer(this.playerId);
      this.battleField.registerBuff(
        oppositePlayer.name,
        new GambleKingWeakenBuff(this.battleField, oppositePlayer.name),
      );
    } else {
      this.battleField.eventRegistry.registerEvent(new GambleKingFailedEvent(), this.playerId);
      const ownerPlayer = this.battleField.getPlayer(this.playerId);
      ownerPlayer.health.value -= ownerPlayer.health.defaultValue * 0.3;
    }
  }
}
