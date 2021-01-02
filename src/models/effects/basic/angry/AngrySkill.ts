import { Skill } from '../../index';
import { PlayerStatus } from '../../../player';
import battleField, { brainField } from '../../../../index';
import { AngryAffectedEvent } from './index';
import AngryEmpoweredBuff from './AngryEmpoweredBuff';
import AngryWeakenBuff from './AngryWeakenBuff';

export default class AngrySkill extends Skill {
  id = 'angry-skill';

  name = '愤怒';

  description = '若玩家的愤怒达到上限，则使自己的攻击力上升50%，对手防御力下降50%。';

  affectTiming = PlayerStatus.beforeAttack;

  data: {
    angryRate: number;
  }

  run() {
    battleField.eventRegistry.registerEvent(new AngryAffectedEvent(), this.playerId);
    this.data.angryRate = 0;
    brainField.registerBuff(this.playerId, new AngryEmpoweredBuff());
    brainField.registerBuff(
      brainField.getOppositePlayer(this.playerId).name,
      new AngryWeakenBuff(),
    );
  }
}
