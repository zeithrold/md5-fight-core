import { Skill } from '../../index';
import { PlayerStatus } from '../../../player';
import { WitchPoisonBuff, WitchSkillAffectedEvent } from './index';

export default class WitchSkill extends Skill {
  id = 'witch-skill';

  name = '巫师';

  description = '对手有30%的概率获得3回合的"毒药"效果，每回合前将对手生命值扣除其生命值最大值的10%，若对手已有同效果，则仅刷新次数，不叠加。';

  run() {
    if (this.battleField.generateRandom() > 30) {
      return;
    }
    this.battleField.eventRegistry.registerEvent(new WitchSkillAffectedEvent(), this.playerId);
    const oppositePlayer = this.battleField.getOppositePlayer(this.playerId);
    for (const buff of oppositePlayer.buffs.get(PlayerStatus.beforeAttack)) {
      if (buff.id === 'witch-poison-buff') {
        buff.destroy();
        oppositePlayer.buffs.get(PlayerStatus.beforeAttack).delete(buff);
      }
    }
    this.battleField.registerBuff(
      oppositePlayer.name, new WitchPoisonBuff(this.battleField, oppositePlayer.name),
    );
  }
}
