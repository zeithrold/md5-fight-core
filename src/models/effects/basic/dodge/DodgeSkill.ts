import { Skill } from '../../index';
import { PlayerStatus } from '../../../player';
import DodgeSucceededEvent from './DodgeSucceededEvent';

export default class DodgeSkill extends Skill {
  id = 'dodge-skill';

  name = '闪避';

  description = '若0~100的随机数小于等于玩家的速度的1/2，玩家闪避攻击。' // Changed in 3.0 - Harder to dodge.

  affectTiming = PlayerStatus.beforeUnderAttack;

  run() {
    const ownerPlayer = this.battleField.getPlayer(this.playerId);
    const random = this.battleField.generateRandom();
    if (random < (ownerPlayer.speed.value / 2)) {
      this.battleField.eventRegistry.registerEvent(new DodgeSucceededEvent(), this.playerId);
    }
  }
}
