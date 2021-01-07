import { Skill } from '../../index';
import { ThunderMagicBuff, ThunderMagicSkillAffectedEvent } from './index';
import { PlayerStatus } from '../../../player';

export default class ThunderMagicSkill extends Skill {
  id = 'thunder-magic-skill';

  name = '雷电法术';

  description = '被攻击者有30%的概率获得3回合的"雷电法术: 雷阵雨"效果。';

  run() {
    const oppositePlayer = this.battleField.getOppositePlayer(this.playerId);
    if (this.battleField.generateRandom() > 30) {
      return;
    }
    this.battleField.eventRegistry.registerEvent(
      new ThunderMagicSkillAffectedEvent(), this.playerId,
    );
    for (const buff of oppositePlayer.buffs.get(PlayerStatus.beforeAttack)) {
      if (buff.id === 'thunder-magic-buff') {
        buff.destroy();
        oppositePlayer.buffs.get(PlayerStatus.beforeAttack).delete(buff);
      }
    }
    this.battleField.registerBuff(
      oppositePlayer.name, new ThunderMagicBuff(this.battleField, oppositePlayer.name),
    );
  }
}
