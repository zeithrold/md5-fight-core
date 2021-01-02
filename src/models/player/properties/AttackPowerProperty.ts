import PlayerProperty from '../PlayerProperty';
import battleField from '../../../index';
import { AttackPowerModifiedEvent } from '../../../events';

export default class AttackPowerProperty extends PlayerProperty<number> {
  set value(value) {
    battleField.eventRegistry.registerEvent(new AttackPowerModifiedEvent(value));
    super.value = value;
  }
}
