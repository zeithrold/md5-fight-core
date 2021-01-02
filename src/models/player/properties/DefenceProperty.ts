import PlayerProperty from '../PlayerProperty';
import battleField from '../../../index';
import { AttackPowerModifiedEvent } from '../../../events/internal';
import { PlayerType } from '../Player';

interface Defence {
  type: PlayerType;
  defence: number;
}

export default class AttackPowerProperty extends PlayerProperty<Defence> {
  set value(value: Defence) {
    if (value.type !== this.value.type) {
      throw new Error('Defence \'s type cannot be change.');
    }
    battleField.eventRegistry.registerEvent(new AttackPowerModifiedEvent(value), this.playerId);
    super.value = value;
  }
}
