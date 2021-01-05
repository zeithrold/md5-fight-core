import { Buff } from '../../index';
import { PlayerStatus } from '../../../player';
import { PlayerType } from '../../../player/Player';

export default class AngryWeakenBuff extends Buff {
  id = 'angry-weaken-buff';

  name = '愤怒：减弱防御力';

  description = '玩家的防御力减弱50%。';

  affectTimes = 1;

  affectTiming = PlayerStatus.onUnderAttack;

  run() {
    const oppositePlayer = this.battleField.getOppositePlayer(this.playerId);
    oppositePlayer.defence[PlayerType.physical].value = {
      type: PlayerType.physical,
      defence: oppositePlayer.defence[PlayerType.physical].internalValue.defence * 0.5,
    };
    oppositePlayer.defence[PlayerType.magical].value = {
      type: PlayerType.magical,
      defence: oppositePlayer.defence[PlayerType.magical].internalValue.defence * 0.5,
    };
  }

  destroy() {
    const oppositePlayer = this.battleField.getOppositePlayer(this.playerId);
    oppositePlayer.defence[PlayerType.physical].setDefault();
    oppositePlayer.defence[PlayerType.magical].setDefault();
  }
}
