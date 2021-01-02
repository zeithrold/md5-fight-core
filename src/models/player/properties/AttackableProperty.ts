import PlayerProperty from '../PlayerProperty';
import battleField from '../../../index';
import { AttackableModifiedEvent } from '../../../events/internal';

export default class AttackbleProperty extends PlayerProperty<boolean> {
  set value(value) {
    battleField.eventRegistry.registerEvent(new AttackableModifiedEvent(value), this.playerId);
    super.value = value;
  }
}
