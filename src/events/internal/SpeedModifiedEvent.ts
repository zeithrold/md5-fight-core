import { Event } from '../index';

export default class SpeedModifiedEvent implements Event {
  id = 'speed-modified-event';

  name = '速度被修改事件';

  data: {
    speed: number
  }

  constructor(speed: number) {
    this.data = { speed };
  }

  message(player :string) {
    return `${player}的速度被修改为${this.data.speed === 0 ? '不可闪避' : this.data.speed}。`;
  }
}
