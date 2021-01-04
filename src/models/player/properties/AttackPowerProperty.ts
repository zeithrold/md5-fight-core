import PlayerProperty from '../PlayerProperty';
import { AttackPowerModifiedEvent } from '../../../events/internal';

export default class AttackPowerProperty extends PlayerProperty<number> {
  set value(value: number) {
    this.battleField.eventRegistry.registerEvent(
      new AttackPowerModifiedEvent(value), this.playerId,
    );
    super.value = value;
  }
}
