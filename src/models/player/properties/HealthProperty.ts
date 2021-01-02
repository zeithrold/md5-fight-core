import PlayerProperty from '../PlayerProperty';
import battleField, { brainField } from '../../../index';
import { DeathEvent, HealthDecreasedEvent, HealthIncreasedEvent } from '../../../events/internal';
import { PlayerStatus } from '../index';

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
    if (value <= 0) {
      super.value = 0;
      battleField.eventRegistry.registerEvent(new DeathEvent(), this.playerId);
      return;
    } if (value > this.value) {
      if (value > this.defaultValue) {
        this.setDefault();
        return;
      }
      battleField.eventRegistry.registerEvent(
        new HealthIncreasedEvent(value - this.value), this.playerId,
      );
    } else if (value < this.value) {
      const decreasedAmount = this.value - value;
      const increasedAngryRate = decreasedAmount * 1.5;
      const ownerPlayer = brainField.getPlayer(this.playerId);
      ownerPlayer.basicSkills.angrySkill.data.angryRate += increasedAngryRate;
      battleField.eventRegistry.registerEvent(
        new HealthDecreasedEvent(this.value - value), this.playerId,
      );
    }
    super.value = value;
  }
}
