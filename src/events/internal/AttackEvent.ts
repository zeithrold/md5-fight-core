import Event from '../Event';

export default class AttackEvent implements Event {
  id = 'attack-event';

  name = '发动攻击事件';

  data: {
    amount: number;
  }

  constructor(amount: number) {
    this.data = { amount };
  }

  message(player: string) {
    return `${player}发动了一个${this.data.amount.toFixed(2)}的攻击！`;
  }
}
