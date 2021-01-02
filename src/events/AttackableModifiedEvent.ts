import { Event } from './index';

export default class AttackableModifiedEvent implements Event {
  id = 'attackable-modified-event';

  name = '可攻击被修改事件';

  data: {
    attackable: boolean;
  };

  constructor(attackable: boolean) {
    this.data.attackable = attackable;
  }

  message(player: string) {
    return `${player}的攻击状态被设置为${this.data.attackable ? '可' : '不可'}攻击状态。`;
  }
}
