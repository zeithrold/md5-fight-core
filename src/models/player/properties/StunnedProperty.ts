import PlayerProperty from '../PlayerProperty';
import { StunnedModifiedEvent } from '../../../events/internal';

export default class StunnedProperty extends PlayerProperty<boolean> {
  set value(value) {
    this.battleField.eventRegistry.registerEvent(new StunnedModifiedEvent(value), this.playerId);
    super.value = value;
  }
}
