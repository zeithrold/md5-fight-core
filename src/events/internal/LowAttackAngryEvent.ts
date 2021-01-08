import Event from '../Event';

export default class LowAttackAngryEvent implements Event {
  id = 'low-attack-angry-event';

  name = '低输出积攒怒气事件';

  color = 'red';

  data: {
    increasedAnger: number;
  }

  constructor(increasedAnger: number) {
    this.data = { increasedAnger };
  }

  message(player: string) {
    return `${player}的输出过低，积攒${(this.data.increasedAnger).toFixed(2)}的怒气值。`;
  }
}
