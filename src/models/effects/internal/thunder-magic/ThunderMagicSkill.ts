import { Skill } from '../../index';
import battleField, { brainField } from '../../../../index';
import { ThunderMagicBuff, ThunderMagicSkillAffectedEvent } from './index';
import { PlayerStatus } from '../../../player';

export default class ThunderMagicSkill extends Skill {
  id = 'thunder-magic-skill';

  name = '雷电法术';

  description = '被攻击者有30%的概率获得3回合的"雷电法术: 雷阵雨"效果。';

  run() {
    if (brainField.generateRandom() > 30) {
      return;
    }
    battleField.eventRegistry.registerEvent(new ThunderMagicSkillAffectedEvent(), this.playerId);
    const oppositePlayer = brainField.getOppositePlayer(this.playerId);
    const isOppositePlayerHaveBuff = oppositePlayer.buffs[PlayerStatus.beforeAttack].findIndex(
      (value, index) => value.id === 'thunder-magic-buff',
    );
    if (isOppositePlayerHaveBuff) {
      oppositePlayer.buffs[PlayerStatus.beforeAttack][isOppositePlayerHaveBuff].destroy();
      oppositePlayer
        .buffs[PlayerStatus.beforeAttack] = oppositePlayer
          .buffs[PlayerStatus.beforeAttack].slice(0, isOppositePlayerHaveBuff)
          .concat(oppositePlayer.buffs[PlayerStatus.beforeAttack].slice(isOppositePlayerHaveBuff));
    }
    brainField.registerBuff(this.playerId, new ThunderMagicBuff());
  }
}
