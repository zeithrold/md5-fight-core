import { Event } from '../../../../events';

export default class ShadowKnifeAffectedEvent implements Event {
  id = 'shadow-knife-affected-event';

  name = '快刀斩乱麻触发事件';

  message(player: string) {
    return `${player}的技能快刀斩乱麻发动！玩家攻击力削减为60%，但对方不可闪避。`;
  }
}
