import { Event } from '../../../../events';

export default class GambleKingSucceededEvent implements Event {
  id = 'gamble-king-succeeded-event';

  name = '777成功发动事件';

  message(player: string) {
    return `${player}所丢的硬币结果为**正面**，本次攻击对方的防御无效。`;
  }
}
