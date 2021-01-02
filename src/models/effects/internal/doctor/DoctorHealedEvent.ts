import { Event } from '../../../../events';

export default class DoctorHealedEvent implements Event {
  id = 'doctor-healed-event';

  name = '治疗术发动事件';

  message(player: string) {
    return `${player}发动了治疗术，其生命值恢复为初始值的20%。`;
  }
}
