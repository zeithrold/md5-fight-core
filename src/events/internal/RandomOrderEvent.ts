import { Event } from '../index';

export default class RandomOrderEvent implements Event {
  id = 'random-order-event';

  name = '随机决定攻击顺序事件';

  message(player: string) {
    return `双方速度相同，丢硬币决定${player}为先攻。`;
  }
}
