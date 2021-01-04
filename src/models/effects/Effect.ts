import { PlayerStatus } from '../player';
import { BattleField } from '../../field';

export enum EffectType {
  skill,
  buff,
}

export default abstract class Effect {
  abstract readonly type: EffectType;

  abstract id: string;

  abstract name: string;

  abstract description: string; // Written in markdown

  data?: any;

  affectTiming: PlayerStatus;

  /**
   * The Skill's owner.
   */
  playerId: string;

  readonly battleField: BattleField;

  constructor(battleField: BattleField, playerId: string, data?: object) {
    this.battleField = battleField;
    this.playerId = playerId;
    if (data) this.data = data;
  }
}
