import Skill from '../../Skill';
import { PlayerStatus } from '../../../player';

export default class FortunateSkill extends Skill {
  id = 'fortunate-skill';

  name = '幸运技能';

  description = '虽然幸运不能解决一切...';

  data: {
    fortunate: number;
  };

  affectTiming = PlayerStatus.beforeUnderAttack;

  constructor(playerId: string, fortunate: number) {
    super(playerId, { fortunate });
  }

  run() {

  }
}
