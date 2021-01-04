import { Event } from '../index';
import { PlayerType } from '../../models/player/Player';

export default class DefenceModifiedEvent implements Event {
  id = 'defence-modified-event';

  name = '防御力被修改事件';

  data: {
    type: PlayerType,
    defence: number
  }

  constructor(type: PlayerType, defence: number) {
    this.data = {
      type,
      defence,
    };
  }

  message(player: string) {
    return `${player}的${this.data.type === PlayerType.physical ? '物理' : '法术'}防御力被修改为${this.data.defence}`;
  }
}
