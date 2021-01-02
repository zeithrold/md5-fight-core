import { Event } from '../../../../events';

export default class DodgeSucceededEvent implements Event {
  id = 'dodge-succeeded-event';

  name = '闪避成功事件';

  message(player: string) {
    return `${player}成功闪避。`;
  }
}
