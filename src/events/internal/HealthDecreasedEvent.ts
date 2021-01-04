import Event from '../Event';

class HealthDecreasedEvent implements Event {
  id = 'health-decreased-event';

  name = '生命值减少事件'

  color = 'blue';

  data: {
    decreasedAmount: number;
  };

  constructor(decreasedAmount: number) {
    this.data = { decreasedAmount };
  }

  message(player: string) {
    return `${player}的生命值减少了${this.data.decreasedAmount}!`;
  }
}

export default HealthDecreasedEvent;
