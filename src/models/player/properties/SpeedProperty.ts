import PlayerProperty from '../PlayerProperty';
import { SpeedModifiedEvent } from '../../../events/internal';

export default class SpeedProperty extends PlayerProperty<number> {
  set value(value) {
    this.battleField.eventRegistry.registerEvent(new SpeedModifiedEvent(value), this.playerId);
    super.value = value;
  }
}
