import { BattleField } from '../../field';

export default class PlayerProperty<T> {
  /**
   * The actual value of player's property.
   */
  protected internalValue: T;

  /**
   * The default value of player's property, mostly defined by a part of md5-hex.
   */
  readonly defaultValue: T;

  readonly playerId: string;

  readonly battleField;

  constructor(value: T, playerId: string, battleField: BattleField, defaultValue?: T) {
    this.internalValue = value;
    this.defaultValue = !defaultValue ? defaultValue : value;
    this.playerId = playerId;
    this.battleField = battleField;
  }

  /**
   * Sets the value to its default.
   */
  setDefault() {
    this.value = this.defaultValue;
  }

  /**
   * Value's setter.
   * @param value
   */
  set value(value: T) {
    this.internalValue = value;
  }

  get value() {
    return this.internalValue;
  }
}
