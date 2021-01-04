import { Skill } from '../../index';
import { PlayerStatus } from '../../../player';
import { AngryAffectedEvent } from './index';
import AngryEmpoweredBuff from './AngryEmpoweredBuff';
import AngryWeakenBuff from './AngryWeakenBuff';
import { BattleField } from '../../../../field';

export default class AngrySkill extends Skill {
  id = 'angry-skill';

  name = '愤怒';

  description = '若玩家的愤怒达到上限，则使自己的攻击力上升50%，对手防御力下降50%。';

  affectTiming = PlayerStatus.beforeAttack;

  data: {
    angryRate: number;
  }

  constructor(battleField: BattleField, playerId: string) {
    super(battleField, playerId, { angryRate: 0 });
  }

  increaseAngryRate(increase: number) {
    this.data.angryRate += increase;
  }

  run() {
    this.battleField.eventRegistry.registerEvent(new AngryAffectedEvent(), this.playerId);
    this.data.angryRate = 0;
    this.battleField.registerBuff(
      this.playerId, new AngryEmpoweredBuff(this.battleField, this.playerId),
    );
    this.battleField.registerBuff(
      this.battleField.getOppositePlayer(this.playerId).name,
      new AngryWeakenBuff(this.battleField, this.playerId),
    );
  }
}
