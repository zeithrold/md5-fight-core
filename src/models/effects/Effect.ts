import { PlayerStatus } from '../player';

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
  abstract playerId: string;

  constructor(data?: object) {
    if (data) this.data = data;
  }

  abstract init ();
}
