export default class PlayerProperty<T> {
  /**
   * The actual value of player's property.
   */
  private internalValue: T;

  /**
   * The default value of player's property, mostly defined by a part of md5-hex.
   */
  readonly defaultValue: T;

  constructor(value: T, defaultValue: T) {
    this.internalValue = value;
    this.defaultValue = defaultValue;
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
