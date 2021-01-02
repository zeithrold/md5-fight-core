import { Event } from '../../../../events';

export default class FortunateActivatedEvent implements Event {
  id = 'fortunate-activated-event';

  name = '幸运技能发动事件';

  data: {
    fortunate: number
  }

  constructor(fortunate) {
    this.data.fortunate = fortunate;
  }

  message(player: string) {
    return `${player}的幸运技能已发动！对方玩家的攻击力将减弱至${100 - this.data.fortunate}%。`;
  }
}
