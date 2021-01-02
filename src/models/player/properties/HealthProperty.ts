import PlayerProperty from '../PlayerProperty';
import battleField from '../../../index';
import { DeathEvent, HealthDecreasedEvent, HealthIncreasedEvent } from '../../../events';

/**
 * The Health Property of a player.
 */
export default class HealthProperty extends PlayerProperty<number> {
  /**
   * The Max health of the health property.
   */
  defaultValue: number;

  /**
   * `value`'s setter, abnormally the HP's value changes register more Events.
   * @param value
   */
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
