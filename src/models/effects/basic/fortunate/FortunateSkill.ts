import Skill from '../../Skill';
import { PlayerStatus } from '../../../player';
import FortunateActivatedEvent from './FortunateActivatedEvent';
import FortunateWeakenBuff from './FortunateWeakenBuff';
import { BattleField } from '../../../../field';

export default class FortunateSkill extends Skill {
  id = 'fortunate-skill';

  name = '幸运技能';

  description = '若0~100的随机数小于等于玩家的幸运值，对方的攻击力减弱（100 - 幸运值）%。';

  data: {
    fortunate: number;
  };

  affectTiming = PlayerStatus.beforeUnderAttack;

  constructor(battleField: BattleField, playerId: string, fortunate: number) {
    super(battleField, playerId, { fortunate });
  }

  run() {
    const random = this.battleField.generateRandom();
    if (random < this.data.fortunate) {
      // Register FortunateActivatedEvent;
      this.battleField.eventRegistry.registerEvent(
        new FortunateActivatedEvent(this.data.fortunate), this.playerId,
      );
      // Get opposite Player.
      const oppositePlayer = this.battleField.getOppositePlayer(this.playerId);
      // Register a FortunateWeakenBuff on the opposite Player.
      this.battleField.registerBuff(
        oppositePlayer.name,
        new FortunateWeakenBuff(this.battleField, oppositePlayer.name, this.data.fortunate),
      );
    }
  }
}
