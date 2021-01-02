import { Event } from '../../../../events';

export default class LanguageEffectAffectedEvent implements Event {
  id = 'language-effect-affected-event';

  name = '语言感化成功发动事件';

  data: {
    type: 'weaken' | 'stunned'
  }

  constructor(type: 'weaken' | 'stunned') {
    this.data.type = type;
  }

  message(player: string) {
    return `${player}成功发动语言感化技能，将对方${this.data.type === 'weaken' ? '削弱攻击力50%' : '禁止下一轮攻击'}。`;
  }
}
