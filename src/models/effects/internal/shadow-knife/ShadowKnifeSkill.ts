import { Skill } from '../../index';
import { ShadowKnifeWeakenBuff, ShadowKnifeCannotDodgeBuff, ShadowKnifeAffectedEvent } from './index';

export default class ShadowKnifeSkill extends Skill {
  id = 'shadow-knife-skill';

  name = '快刀斩乱麻';

  description = '攻击者在攻击阶段有40%的概率对被攻击者进行不可闪避的，攻击力为40%的攻击。'

  run() {
    const oppositePlayer = this.battleField.getOppositePlayer(this.playerId);
    if (this.battleField.generateRandom() > 40) {
      return;
    }
    this.battleField.eventRegistry.registerEvent(new ShadowKnifeAffectedEvent(), this.playerId);
    this.battleField.registerBuff(
      this.playerId, new ShadowKnifeWeakenBuff(this.battleField, this.playerId),
    );
    this.battleField.registerBuff(
      oppositePlayer.name, new ShadowKnifeCannotDodgeBuff(this.battleField, oppositePlayer.name),
    );
  }
}
