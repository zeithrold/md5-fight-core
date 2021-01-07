import Event from '../Event';

class HealthOverIncreasedEvent implements Event {
  id = 'health-over-increased-event';

  name = '生命值过量增加事件';

  data: {
    increasedAmount: number;
  };

  constructor(increasedAmount: number) {
    this.data = { increasedAmount };
  }

  message(player: string) {
    return `${player}的生命值增加${this.data.increasedAmount}，但由于超过默认值，因此设置为默认值。`;
  }
}

export default HealthOverIncreasedEvent;
