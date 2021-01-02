import PlayerProperty from '../PlayerProperty';
import battleField from '../../../index';
import { SpeedModifiedEvent } from '../../../events/internal';

export default class SpeedProperty extends PlayerProperty<number> {
  set value(value) {
    battleField.eventRegistry.registerEvent(new SpeedModifiedEvent(value), this.playerId);
    super.value = value;
  }
}
