import md5 from 'blueimp-md5';
import {
  HealthProperty,
  AttackPowerProperty,
  SpeedProperty,
  AttackbleProperty,
  DefenceProperty,
  StunnedProperty,
} from './properties';
import { Buff, Skill } from '../effects';
import { getSkill } from '../effects/internal';
import { FortunateSkill } from '../effects/basic/fortunate';
import { DodgeSkill } from '../effects/basic/dodge';
import { AngrySkill } from '../effects/basic/angry';
import { BattleField } from '../../field';

/**
 * The Player's status, it will change automatically as the BattleField runs.
 * When the Player's Status change, the Proxy will execute the handler.
 */
export const enum PlayerStatus {
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

export enum PlayerType {
  physical,
  magical
}

const PlayerStatusList: PlayerStatus[] = [
  PlayerStatus.onUnderAttack,
  PlayerStatus.afterUnderAttack,
  PlayerStatus.beforeAttack,
  PlayerStatus.afterAttack,
  PlayerStatus.beforeUnderAttack,
  PlayerStatus.ready,
  PlayerStatus.onAttack,
];

export default class Player {
  /**
   * The name of the `Player`.
   * It will be encrypted in md5, which is be used for `Player`'s properties like hp, defence, etc.
   */
  readonly name: string;

  /**
   * The md5 of the name, in hex.
   * It will be used to generate `Player`'s properties like hp, defence, etc.
   * @generatedFromMD5 This Prop is auto-generated from the md5-hex of the name.
   */
  readonly md5: string;

  /**
   * The power of attack of the player. It'll be taken mainly during the main attack.
   * @generatedFromMD5 This Prop is auto-generated from the md5-hex of the name.
   */
  readonly attackPower: AttackPowerProperty;

  /**
   * The Player's status, each change of the status make buffs registered in advance on effect.
   * @generatedFromMD5 This Prop is auto-generated from the md5-hex of the name.
   */
  status: PlayerStatus;

  /**
   * skillSlot contains a set of skills registered in advance of Player's init.
   */
  readonly skillSlot: Map<PlayerStatus, Set<Skill>>;

  /**
   * buffs contains a set of buffs,
   * each change of the status make buffs registered in advance on effect.
   */
  readonly buffs: Map<PlayerStatus, Set<Buff>>;

  /**
   * The health property. When Player's health turn to 0, the Player would die.
   * @generatedFromMD5 This Prop is auto-generated from the md5-hex of the name.
   */
  readonly health: HealthProperty;

  /**
   * The speed of the player. The chance of dodge depends on the speed.
   * @generatedFromMD5 This Prop is auto-generated from the md5-hex of the name.
   */
  readonly speed: SpeedProperty;

  /**
   * The status on whether the Player can be attacked.
   */
  readonly attackable: AttackbleProperty;

  /**
   * The ability of PLayer to execute an attack.
   */
  readonly stunned: StunnedProperty;

  /**
   * The defence of PLayer, when under attack,
   * the amount of attack discount with half of the defence.
   * @generatedFromMD5 This Prop is auto-generated from the md5-hex of the name.
   */
  readonly defence: {
    [PlayerType.physical]: DefenceProperty,
    [PlayerType.magical]: DefenceProperty,
  };

  /**
   * The type of the Player, either physical or magical.
   */
  readonly type: PlayerType;

  additionalSkill: Skill

  /**
   * The basic skills that every Player has.
   */
  basicSkills: {
    fortunateSkill: FortunateSkill;
    dodgeSkill: DodgeSkill;
    angrySkill: AngrySkill;
  };

  readonly battleField: BattleField;

  constructor(id: string, battleField: BattleField) {
    this.battleField = battleField;
    const encryptedMd5Hex = md5(id); // Generates Player's ID.
    this.name = id;
    this.md5 = encryptedMd5Hex; // Set the player's id and md5 hex.
    const propertyNumber: number[] = [];
    for (let i = 0; i < 16; i += 1) {
      const piece = encryptedMd5Hex.slice(i * 2, (i + 1) * 2);
      const convertedNumber = parseInt(piece, 16) / 2.55;
      propertyNumber.push(Math.floor(convertedNumber));
    } // Slice the md5 hex into 2-length string pieces, in 16.
    // Sets health according 1st piece of property.
    this.health = new HealthProperty(propertyNumber[0], id, this.battleField);
    // Sets attack power according 2nd piece of property.
    this.attackPower = new AttackPowerProperty(propertyNumber[1], id, this.battleField);
    // Sets speed according 3rd piece of property.
    this.speed = new SpeedProperty(propertyNumber[2], id, this.battleField);
    this.status = PlayerStatus.ready;
    // Effect's initial Setting.
    this.skillSlot = new Map<PlayerStatus, Set<Skill>>();
    this.buffs = new Map<PlayerStatus, Set<Buff>>();
    for (const status of PlayerStatusList) {
      this.skillSlot.set(status, new Set<Skill>());
      this.buffs.set(status, new Set<Buff>());
    }
    this.attackable = new AttackbleProperty(true, id, this.battleField);
    // BEGIN EFFECT REGISTER
    const fortunateSkill = new FortunateSkill(this.battleField, id, propertyNumber[3]);
    this.skillSlot
      .get(fortunateSkill.affectTiming)
      .add(fortunateSkill);
    const dodgeSkill = new DodgeSkill(this.battleField, id);
    this.skillSlot
      .get(dodgeSkill.affectTiming)
      .add(dodgeSkill);
    const angrySkill = new AngrySkill(this.battleField, id);
    this.skillSlot
      .get(angrySkill.affectTiming)
      .add(angrySkill);
    this.basicSkills = {
      fortunateSkill,
      dodgeSkill,
      angrySkill,
    };
    const additionalSkill: Skill = getSkill(
      this.battleField, propertyNumber[4], this.name,
    );
    this.additionalSkill = additionalSkill;
    this.skillSlot.get(additionalSkill.affectTiming).add(additionalSkill);
    // END EFFECT REGISTER

    this.defence = {
      [PlayerType.physical]: new DefenceProperty(
        { type: PlayerType.physical, defence: propertyNumber[4] },
        id, this.battleField,
      ),
      [PlayerType.magical]: new DefenceProperty(
        { type: PlayerType.magical, defence: propertyNumber[5] },
        id, this.battleField,
      ),
    };
    this.stunned = new StunnedProperty(false, id, this.battleField);
    this.type = propertyNumber[6] % 2 === 0 ? PlayerType.physical : PlayerType.magical;
  }

  changeStatus(status: PlayerStatus) {
    this.status = status;
    this.buffs.get(status).forEach(this.buffAffect);
    this.skillSlot.get(status).forEach(this.skillAffect);
  }

  buffAffect(buff: Buff) {
    buff.run();
    buff.discountAffectTimes();
  }

  skillAffect(skill: Skill) {
    skill.run();
  }

  cleanUp() {
    this.status = PlayerStatus.ready;
    for (const [_, value] of this.buffs) {
      for (const buff of value) {
        if (buff.affectTimes === 0) {
          buff.destroy();
          value.delete(buff);
        }
      }
    }
  }
}
