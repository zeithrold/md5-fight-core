import { Event } from '../../../../events';

export default class AngryAffectedEvent implements Event {
  id = 'angry-affected-event';

  name = '怒气达成事件';

  message(player: string) {
    return `${player}怒气值已满，发动怒火技能，本人攻击力提升50%，对方防御力降低50%。`;
  }
}
