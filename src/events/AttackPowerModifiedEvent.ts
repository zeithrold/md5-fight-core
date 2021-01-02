import { Event } from './index';

export default class AttackPowerModifiedEvent implements Event {
  id = 'attack-power-modified-event';

  name = '攻击力被修改事件';

  data: {
    attackPower: number
  }

  constructor(attackPower) {
    this.data.attackPower = attackPower;
  }

  message(player: string) {
    return `${player}的攻击力被修改为${this.data.attackPower}`;
  }
}
