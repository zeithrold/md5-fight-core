import { Event } from '../index';

export default class StunnedModifiedEvent implements Event {
  id = 'stunned-modified-event';

  name = '禁锢状态被修改事件';

  data: {
    stunned: boolean;
  };

  constructor(stunned: boolean) {
    this.data.stunned = stunned;
  }

  message(player: string) {
    return `${player}的禁锢状态被设置为${this.data.stunned ? '被禁锢' : '未被禁锢'}。`;
  }
}
