import { Skill } from '../../index';
import { brainField } from '../../../../index';
import { LanguageEffectStunnedBuff, LanguageEffectWeakenBuff } from './index';

export default class LanguageEffectSkill extends Skill {
  id = 'language-effect-skill';

  name = '语言感化';

  description = '被攻击者有20%的概率下一轮无法攻击；被攻击者有30%的概率下一轮攻击力降低50%。'

  run() {
    if (brainField.generateRandom() > 50) {
      return;
    }
    const random = brainField.generateRandom();
    const oppositePlayer = brainField.getOppositePlayer(this.playerId);
    if (random < 40) {
      brainField.registerBuff(oppositePlayer.name, new LanguageEffectStunnedBuff());
    } else {
      brainField.registerBuff(oppositePlayer.name, new LanguageEffectWeakenBuff());
    }
  }
}
