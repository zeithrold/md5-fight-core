import { Skill } from '../../index';
import battleField, { brainField } from '../../../../index';
import { DoctorHealedEvent } from './index';

export default class DoctorSkill extends Skill {
  id = 'doctor-skill';

  name = '治疗术';

  description = '攻击者在攻击阶段有40%的概率恢复自身生命值最大值的20%。';

  run() {
    if (brainField.generateRandom() < 50) {
      return;
    }
    battleField.eventRegistry.registerEvent(new DoctorHealedEvent(), this.playerId);
    const ownerPlayer = brainField.getPlayer(this.playerId);
    ownerPlayer.health.value += (ownerPlayer.health.defaultValue * 0.2);
  }
}
