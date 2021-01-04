import { Skill } from '../../index';
import { LanguageEffectStunnedBuff, LanguageEffectWeakenBuff } from './index';

export default class LanguageEffectSkill extends Skill {
  id = 'language-effect-skill';

  name = '语言感化';

  description = '被攻击者有20%的概率下一轮无法攻击；被攻击者有30%的概率下一轮攻击力降低50%。'

  run() {
    if (this.battleField.generateRandom() > 50) {
      return;
    }
    const random = this.battleField.generateRandom();
    const oppositePlayer = this.battleField.getOppositePlayer(this.playerId);
    if (random < 40) {
      this.battleField.registerBuff(
        oppositePlayer.name,
        new LanguageEffectStunnedBuff(this.battleField, oppositePlayer.name),
      );
    } else {
      this.battleField.registerBuff(
        oppositePlayer.name,
        new LanguageEffectWeakenBuff(this.battleField, oppositePlayer.name),
      );
    }
  }
}
