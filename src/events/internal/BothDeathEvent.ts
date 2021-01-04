import Event from '../Event';

export default class BothDeathEvent implements Event {
  id = 'both-death-event';

  name = '双方死亡事件';

  message(player: string) {
    return '玩家都已死亡。';
  }
}
