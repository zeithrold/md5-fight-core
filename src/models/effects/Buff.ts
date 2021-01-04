import { Effect, EffectType } from './index';

export default abstract class Buff extends Effect {
  type = EffectType.buff;

  affectTimes: number = 1;

  playerId: string;

  abstract run();

  init() {
    this.battleField.registerBuff(
      this.playerId, this,
    );
  }

  discountAffectTimes() {
    if (this.affectTimes === -1) return;
    this.affectTimes -= 1;
  }

  abstract destroy();
}
