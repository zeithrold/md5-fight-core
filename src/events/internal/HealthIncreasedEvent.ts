import Event from '../Event';

class HealthIncreasedEvent implements Event {
  id = 'health-increased-event';

  name = '生命值增加事件';

  data: {
    increasedAmount: number;
  };

  constructor(increasedAmount: number) {
    this.data = { increasedAmount };
  }

  message(player: string) {
    return `${player}的生命值增加了${this.data.increasedAmount}!`;
  }
}

export default HealthIncreasedEvent;
