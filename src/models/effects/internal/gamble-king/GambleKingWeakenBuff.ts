import { Buff } from '../../index';
import { brainField } from '../../../../index';
import { PlayerStatus, PlayerType } from '../../../player/Player';

export default class GambleKingWeakenBuff extends Buff {
  id = 'gamble-king-weaken-buff';

  name = '777: 飞机攻势';

  description = '玩家的防御无效。';

  affectTiming = PlayerStatus.beforeUnderAttack;

  affectTimes = 1;

  run() {
    const ownerPlayer = brainField.getPlayer(this.playerId);
    ownerPlayer.defence[PlayerType.magical].value.defence = 0;
    ownerPlayer.defence[PlayerType.physical].value.defence = 0;
  }

  destroy() {
    const ownerPlayer = brainField.getPlayer(this.playerId);
    ownerPlayer.defence[PlayerType.magical].setDefault();
    ownerPlayer.defence[PlayerType.physical].setDefault();
  }
}
