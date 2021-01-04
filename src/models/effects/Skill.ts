import { Effect, EffectType } from './index';
import { PlayerStatus } from '../player';

export default abstract class Skill extends Effect {
  // Sets the type of Effect to Skill.
  type = EffectType.skill;

  /**
   * The timing when skill affects, default sets to beforeAttack.
   * Remember that skill that is set its timing to `ready` will never affect.
   */
  affectTiming: PlayerStatus = PlayerStatus.beforeAttack;

  playerId: string;

  constructor(playerId: string, data?: any) {
    super(!data ? data : null);
    this.playerId = playerId;
  }

  abstract run();
}
