import { Skill } from '../../index';
import { PlayerStatus } from '../../../player';
import { BloodMagicAffectedEvent } from './index';

export default class BloodMagicSkill extends Skill {
  id = 'blood-magic-skill';

  name = '血液魔法学';

  description = '*一次性技能* 攻击者在攻击阶段若生命值低于最大值的10%，则将两方的生命值皆设定为此前双方生命值的平均值。'

  data = {
    affected: false,
  };

  affectTiming = PlayerStatus.beforeAttack

  run() {
    if (this.data.affected) {
      return;
    }
    const ownerPlayer = this.battleField.getPlayer(this.playerId);
    if (ownerPlayer.health.value > ownerPlayer.health.defaultValue * 0.1) {
      return;
    }
    this.battleField.eventRegistry.registerEvent(new BloodMagicAffectedEvent(), this.playerId);
    const oppositePlayer = this.battleField.getOppositePlayer(this.playerId);
    const averageHP = (
      ownerPlayer.health.value
        + oppositePlayer.health.value
    ) / 2;
    ownerPlayer.health.value = averageHP;
    oppositePlayer.health.value = averageHP;
    this.data.affected = false;
  }
}
