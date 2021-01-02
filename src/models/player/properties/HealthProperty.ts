import PlayerProperty from '../PlayerProperty';
import battleField from '../../../index';
import { DeathEvent, HealthDecreasedEvent, HealthIncreasedEvent } from '../../../events';

export default class HealthProperty extends PlayerProperty<number> {
  set value(value: number) {
    if (value === 0) {
      battleField.eventRegistry.registerEvent(new DeathEvent(), this.playerId);
    } else if (value > this.value) {
      battleField.eventRegistry.registerEvent(
        new HealthIncreasedEvent(value - this.value), this.playerId,
      );
    } else if (value < this.value) {
      battleField.eventRegistry.registerEvent(
        new HealthDecreasedEvent(this.value - value), this.playerId,
      );
    }
    super.value = value;
  }
}
