import Skill from '../../Skill';
import { PlayerStatus } from '../../../player';
import battleField, { brainField } from '../../../../index';
import FortunateActivatedEvent from './FortunateActivatedEvent';
import FortunateWeakenBuff from './FortunateWeakenBuff';

export default class FortunateSkill extends Skill {
  id = 'fortunate-skill';

  name = '幸运技能';

  description = '若0~100的随机数小于等于玩家的幸运值，对方的攻击力减弱（100 - 幸运值）%。';

  data: {
    fortunate: number;
  };

  affectTiming = PlayerStatus.beforeUnderAttack;

  constructor(playerId: string, fortunate: number) {
    super(playerId, { fortunate });
  }

  run() {
    const random = brainField.generateRandom();
    if (random < this.data.fortunate) {
      // Register FortunateActivatedEvent;
      battleField.eventRegistry.registerEvent(
        new FortunateActivatedEvent(this.data.fortunate), this.playerId,
      );
      // Get opposite Player.
      const oppositePlayer = brainField.getOppositePlayer(this.playerId);
      // Register a FortunateWeakenBuff on the opposite Player.
      brainField.registerBuff(
        oppositePlayer.name,
        new FortunateWeakenBuff(this.data.fortunate),
      );
    }
  }
}
