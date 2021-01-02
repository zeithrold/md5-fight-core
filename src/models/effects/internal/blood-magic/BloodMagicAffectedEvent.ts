import { Event } from '../../../../events';

export default class BloodMagicAffectedEvent implements Event {
  id = 'blood-magic-affected-event';

  name = '血液魔法学技能发动事件';

  message(player: string) {
    return `由于${player}的生命值低于初始值的10%，发动血液魔法学技能。`;
  }
}
