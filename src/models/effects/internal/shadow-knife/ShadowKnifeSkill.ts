import { Skill } from '../../index';
import battleField, { brainField } from '../../../../index';
import { ShadowKnifeWeakenBuff, ShadowKnifeCannotDodgeBuff, ShadowKnifeAffectedEvent } from './index';

export default class ShadowKnifeSkill extends Skill {
  id = 'shadow-knife-skill';

  name = '快刀斩乱麻';

  description = '攻击者在攻击阶段有50%的概率对被攻击者进行不可闪避的，攻击力为60%的攻击。'

  run() {
    if (brainField.generateRandom() > 50) {
      return;
    }
    battleField.eventRegistry.registerEvent(new ShadowKnifeAffectedEvent(), this.playerId);
    brainField.registerBuff(this.playerId, new ShadowKnifeWeakenBuff());
    brainField.registerBuff(this.playerId, new ShadowKnifeCannotDodgeBuff());
  }
}
