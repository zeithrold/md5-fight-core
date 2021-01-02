import { Effect, EffectType } from './index';
import { PlayerStatus } from '../player';
import { brainField } from '../../index';

export default abstract class Skill extends Effect {
  // Sets the type of Effect to Skill.
  type = EffectType.skill;

  /**
   * The Skill's owner.
   */
  playerId: string;

  /**
   * The timing when skill affects, default sets to beforeAttack.
   * *Remember that skill that is set its timing to `ready` will never affect.*
   */
  affectTiming: PlayerStatus = PlayerStatus.beforeAttack;

  protected constructor(playerId: string, data?: any) {
    super(!data ? data : null);
    this.playerId = playerId;
  }

  init() {
    brainField.registerSkill(this.playerId, this.affectTiming, this);
  }

  abstract run();
}
