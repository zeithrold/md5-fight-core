import { Event } from '../../../../events';

export default class ThunderMagicBuffAffectedEvent implements Event {
  id = 'thunder-magic-buff-affected-event';

  name = '雷电法术:雷阵雨发动事件';

  message(player: string) {
    return `${player}的雷电法术:雷阵雨效果发动，玩家的生命值减半。`;
  }
}
