import { Buff } from '../../index';
import { PlayerStatus } from '../../../player';
import { BattleField } from '../../../../field';

export default class FortunateWeakenBuff extends Buff {
  affectTimes = 1;

  affectTiming = PlayerStatus.onAttack;

  name = '幸运: 攻击力减弱'

  description = '玩家的攻击力减弱（对手玩家幸运值 / 100）%。'

  id = 'fortunate-weaken-buff';

  data: {
    fortunate: number
  }

  constructor(fortunate: number, battleField: BattleField) {
    super(battleField, { fortunate });
  }

  run() {
    const ownerPlayer = this.battleField.getPlayer(this.playerId);
    // eslint-disable-next-line operator-assignment
    ownerPlayer.attackPower.value = ownerPlayer.attackPower.value * (this.data.fortunate / 100);
  }

  destroy() {
    const ownerPlayer = this.battleField.getPlayer(this.playerId);
    ownerPlayer.attackPower.setDefault();
  }
}
