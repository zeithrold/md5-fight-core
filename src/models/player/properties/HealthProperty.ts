import PlayerProperty from '../PlayerProperty';
import { DeathEvent, HealthDecreasedEvent, HealthIncreasedEvent } from '../../../events/internal';

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
      this.battleField.eventRegistry.registerEvent(new DeathEvent(), this.playerId);
      return;
    } if (value > this.internalValue) {
      if (value > this.defaultValue) {
        this.setDefault();
        return;
      }
      this.battleField.eventRegistry.registerEvent(
        new HealthIncreasedEvent(value - this.internalValue), this.playerId,
      );
    } else if (value < this.internalValue) {
      const decreasedAmount = this.internalValue - value;
      const increasedAngryRate = decreasedAmount * 1.5;
      const ownerPlayer = this.battleField.getPlayer(this.playerId);
      ownerPlayer.basicSkills.angrySkill.data.angryRate += increasedAngryRate;
      this.battleField.eventRegistry.registerEvent(
        new HealthDecreasedEvent(this.internalValue - value), this.playerId,
      );
    }
    super.value = value;
  }
}
