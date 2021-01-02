import { Event } from '../../../../events';

export default class ThunderMagicSkillAffectedEvent implements Event {
  id = 'thunder-magic-skill-affected-event';

  name = '雷电法术发动事件';

  message(player: string) {
    return `${player}的雷电法术技能发动，对方获得雷电法术:雷阵雨效果。`;
  }
}
