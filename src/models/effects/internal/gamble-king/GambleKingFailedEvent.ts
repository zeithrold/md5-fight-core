import { Event } from '../../../../events';

export default class GambleKingFailedEvent implements Event {
  id = 'gamble-king-failed-event';

  name = '777成功发动事件';

  message(player: string) {
    return `${player}所丢的硬币结果为**反面**，攻击者的生命值减少初始值的30%。`;
  }
}
