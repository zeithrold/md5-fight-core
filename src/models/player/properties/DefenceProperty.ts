import PlayerProperty from '../PlayerProperty';
import { DefenceModifiedEvent } from '../../../events/internal';
import { PlayerType } from '../Player';

interface Defence {
  type: PlayerType;
  defence: number;
}

export default class DefenceProperty extends PlayerProperty<Defence> {
  set value(value: Defence) {
    if (value.type !== this.value.type) {
      throw new Error('Defence \'s type cannot be change.');
    }
    this.battleField.eventRegistry.registerEvent(
      new DefenceModifiedEvent(value.type, value.defence), this.playerId,
    );
    super.value = value;
  }
}
