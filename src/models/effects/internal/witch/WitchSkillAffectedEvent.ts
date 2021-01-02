import { Event } from '../../../../events';

export default class WitchSkillAffectedEvent implements Event {
  id = 'witch-skill-affected-event';

  name = '巫师发动事件';

  message(player: string) {
    return `${player}的巫师技能发动，对方获得巫师:毒药术效果。`;
  }
}
