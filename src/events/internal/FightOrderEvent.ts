import Event from '../Event';

export default class FightOrderEvent implements Event {
  id = 'fight-order-event';

  name = '决定攻击顺序事件';

  message(player: string) {
    return `${player}的速度较快，为先攻。`;
  }
}
