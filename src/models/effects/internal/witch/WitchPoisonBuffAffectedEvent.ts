import { Event } from '../../../../events';

export default class WitchPoisonBuffAffectedEvent implements Event {
  id = 'witch-poison-buff-affected-event';

  name = '巫师:毒药术发动事件';

  message(player: string) {
    return `${player}的巫师:毒药术效果发动，玩家生命值减其初始值的10%。`;
  }
}
