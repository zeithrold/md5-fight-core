import { Effect, EffectType } from './index';

export default abstract class Buff extends Effect {
  type = EffectType.buff;
}
