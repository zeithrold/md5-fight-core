import PlayerProperty from '../PlayerProperty';
import { AttackableModifiedEvent } from '../../../events/internal';

export default class AttackbleProperty extends PlayerProperty<boolean> {
  set value(value: boolean) {
    this.battleField.eventRegistry.registerEvent(new AttackableModifiedEvent(value), this.playerId);
    super.value = value;
  }
}
