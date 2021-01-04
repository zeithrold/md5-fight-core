import { BattleField } from '../../field';

export default class PlayerProperty<T> {
  /**
   * The actual value of player's property.
   */
  internalValue: T;

  /**
   * The default value of player's property, mostly defined by a part of md5-hex.
   */
  readonly defaultValue: T;

  readonly playerId: string;

  readonly battleField: BattleField;

  constructor(value: T, playerId: string, battleField: BattleField, defaultValue?: T) {
    this.internalValue = value;
    if (defaultValue) this.defaultValue = defaultValue; else this.defaultValue = value;
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

  get value(): T {
    return this.internalValue;
  }
}
