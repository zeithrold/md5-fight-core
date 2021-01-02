import { Event } from '../../../../events';

export default class LanguageEffectStunnedEvent implements Event {
  id = 'language-effect-stunned-event';

  name = '语言感化禁锢生效事件';

  message(player: string) {
    return `${player}被语言感化所禁锢，本轮无法攻击。`;
  }
}
