import { Effect, EffectType } from './index';
import { brainField } from '../../index';

export default abstract class Buff extends Effect {
  type = EffectType.buff;

  affectTimes: number | 'infinity' = 1;

  playerId: string;

  abstract run();

  init() {
    brainField.registerBuff(
      this.playerId, this,
    );
  }

  abstract destroy();
}
