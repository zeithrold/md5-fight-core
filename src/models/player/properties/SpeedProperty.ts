import PlayerProperty from '../PlayerProperty';
import battleField from '../../../index';
import { SpeedModifiedEvent } from '../../../events';

export default class SpeedProperty extends PlayerProperty<number> {
  set value(value) {
    battleField.eventRegistry.registerEvent(new SpeedModifiedEvent(value));
    super.value = value;
  }
}
