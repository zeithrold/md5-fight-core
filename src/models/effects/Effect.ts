export enum EffectType {
  skill,
  buff,
}

export default class Effect {
  readonly type: EffectType;

  id: string;

  name: string;

  description: string; // Written in markdown

  data?: any;

  constructor(data?: object) {
    if (data) this.data = data;
  }
}
