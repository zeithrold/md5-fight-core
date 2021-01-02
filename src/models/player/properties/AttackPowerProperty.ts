import PlayerProperty from '../PlayerProperty';
import battleField from '../../../index';
import { AttackPowerModifiedEvent } from '../../../events/internal';

export default class AttackPowerProperty extends PlayerProperty<number> {
  set value(value) {
    battleField.eventRegistry.registerEvent(new AttackPowerModifiedEvent(value), this.playerId);
    super.value = value;
  }
}
