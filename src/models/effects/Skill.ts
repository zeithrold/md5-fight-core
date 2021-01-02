import { Effect, EffectType } from './index';
import { PlayerStatus } from '../player';

export default class Skill extends Effect {
  type = EffectType.skill;

  playerId: string;

  affectTiming: PlayerStatus = PlayerStatus.beforeAttack;

  constructor(playerId: string, data?: any) {
    super(!data ? data : null);
    this.playerId = playerId;
  }

  init() {

  }
}
