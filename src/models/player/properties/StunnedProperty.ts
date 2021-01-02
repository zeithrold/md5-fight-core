import PlayerProperty from '../PlayerProperty';
import battleField from '../../../index';
import { StunnedModifiedEvent } from '../../../events/internal';

export default class StunnedProperty extends PlayerProperty<boolean> {
  set value(value) {
    battleField.eventRegistry.registerEvent(new StunnedModifiedEvent(value), this.playerId);
    super.value = value;
  }
}
