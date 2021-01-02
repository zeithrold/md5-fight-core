import Event from '../Event';

export default class DeathEvent implements Event {
  id = 'death-event';

  name = '死亡事件';

  message(player: string) {
    return `${player}已死亡!`;
  }
}
