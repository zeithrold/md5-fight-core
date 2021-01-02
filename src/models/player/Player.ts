import md5 from 'blueimp-md5';
import PlayerProperty from './PlayerProperty';
import Action from '../Action';
import HealthProperty from './properties/HealthProperty';

/**
 * The Player's status, it will change automatically as the BattleField runs.
 * When the Player's Status change, the Proxy will execute the handler.
 */
const enum PlayerStatus {
  /**
   * The `ready` status means the `Player` is doing nothing.
   */
  ready,
  /**
   * The `beforeAttack` status means the `Player` is preparing an attacking.
   */
  beforeAttack,
  /**
   * The `onAttack` status means the `Player` is attacking.
   */
  onAttack,
  /**
   * The `afterAttack` status means the `Player` has just finished an attacking.
   */
  afterAttack,
  /**
   * The `beforeUnderAttack` status means the `Player` is about to be under attack.
   */
  beforeUnderAttack,
  /**
   * The `onUnderAttack` status means the `Player` is under attack.
   */
  onUnderAttack,
  /**
   * The `afterUnderAttack` status means the `Player` has just been attacked.
   */
  afterUnderAttack,
}

export default class Player {
  /**
   * The name of the `Player`.
   * It will be encrypted in md5, which is be used for `Player`'s properties like hp, defence, etc.
   */
  readonly name: string;

  /**
   * The md5 of the name, in hex.
   * It will be used to generate `Player`'s properties like hp, defence, etc.
   */
  readonly md5: string;

  /**
   * The power of attack of the player. It'll be taken mainly during the main attack.
   * @generatedFromMD5 This Prop is auto-generated from the md5-hex of the name.
   */
  readonly attackPower: number

  /**
   * The speed of the player. The chance of dodge depends on the speed.
   * @generatedFromMD5 This Prop is auto-generated from the md5-hex of the name.
   */
  readonly speed: number;

  status: PlayerStatus;

  actions: { [key in PlayerStatus]: Action; }[] = [];

  health: HealthProperty

  speed: number

  constructor(id: string) {
    const encryptedMd5Hex = md5(id); // Generates Player's ID.
    this.name = id;
    this.md5 = encryptedMd5Hex; // Set the player's id and md5 hex.
    const propertyNumber: number[] = [];
    for (let i = 0; i < 16; i += 1) {
      const piece = encryptedMd5Hex.slice(i * 2, (i + 1) * 2);
      const convertedNumber = (parseInt(piece, 16) / 2.55);
      propertyNumber.push(convertedNumber);
    } // Slice the md5 hex into 2-length string pieces, in 16.
    this.health = new HealthProperty(propertyNumber[0], propertyNumber[0], id);
    this.attackPower;
  }
}

export function newPlayer(id: string) {
  return new Proxy(new Player(id), {});
}
