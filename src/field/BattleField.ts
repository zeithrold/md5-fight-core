import Player, { PlayerStatus } from '../models/player/Player';
import { Buff, Skill } from '../models/effects';
import FightOrderEvent from '../events/internal/FightOrderEvent';
import RandomOrderEvent from '../events/internal/RandomOrderEvent';
import AttackEvent from '../events/internal/AttackEvent';
import { LowAttackAngryEvent } from '../events/internal';
import EventRegistry from '../events/EventRegistry';

/**
 * The API platform of the Effect.
 */
export default class BattleField {
  players: { east: Player; west: Player; };

  env: 'test' | 'production' | 'dev';

  fasterSide: 'east' | 'west';

  readonly eventRegistry: EventRegistry;

  constructor(
    players: { west: string; east: string },
    env: 'test' | 'production' | 'dev' = 'production',
  ) {
    this.env = env;
    this.eventRegistry = new EventRegistry();
    this.players = {
      west: new Player(players.west, this),
      east: new Player(players.east, this),
    };
    this.orderBattle();
    this.eventRegistry.pushEvent();
  }

  getPlayer(playerId: string) {
    if (this.players.west.name === playerId) {
      return this.players.west;
    } if (this.players.east.name === playerId) {
      return this.players.east;
    }
    throw new Error('Invalid playerId');
  }

  getOppositePlayer(playerId: string) {
    if (!(playerId in Object.keys(this.players))) { // If playerId does NOT in player.keys
      throw new Error('Invalid playerId');
    }
    // No error, means valid playerId.
    if (this.players.west.name === playerId) {
      return this.players.east;
    }
    return this.players.west;
  }

  registerSkill(playerId: string, skill: Skill) {
    const targetPlayer = this.getPlayer(playerId);
    targetPlayer.skillSlot.get(skill.affectTiming).add(skill);
  }

  registerBuff(playerId: string, buff: Buff) {
    const targetPlayer = this.getPlayer(playerId);
    targetPlayer.buffs.get(buff.affectTiming).add(buff);
  }

  generateRandom() {
    if (this.env !== 'production') {
      return 0;
    }
    return Math.floor(Math.random() * 100);
  }

  orderBattle() {
    if (this.players.east.speed > this.players.west.speed) {
      this.eventRegistry.registerEvent(new FightOrderEvent(), this.players.east.name);
      this.fasterSide = 'east';
    } if (this.players.east.speed < this.players.west.speed) {
      this.eventRegistry.registerEvent(new FightOrderEvent(), this.players.west.name);
      this.fasterSide = 'west';
    } else {
      const randomNumber = this.generateRandom();
      if (randomNumber % 2 === 0) {
        this.eventRegistry.registerEvent(new RandomOrderEvent(), this.players.east.name);
        this.fasterSide = 'east';
      } else {
        this.eventRegistry.registerEvent(new RandomOrderEvent(), this.players.west.name);
        this.fasterSide = 'west';
      }
    }
  }

  round() {
    const primaryFightHasDeath = this.fight(this.fasterSide);
    if (primaryFightHasDeath) return true;
    const oppositeSide = this.fasterSide === 'east' ? 'west' : 'east';
    return this.fight(oppositeSide);
  }

  fight(playerSide: 'east' | 'west') {
    const attackerPlayer = this.players[playerSide];
    const underAttackPlayer = this.getOppositePlayer(playerSide);
    // BEFORE (UNDER)ATTACK
    attackerPlayer.changeStatus(PlayerStatus.beforeAttack);
    if (this.checkDeath()) return true; // Death Check.
    // Check if attacker is stunned.
    if (attackerPlayer.stunned.value === true) {
      attackerPlayer.cleanUp();
      return false;
    }
    underAttackPlayer.changeStatus(PlayerStatus.beforeUnderAttack);
    if (this.checkDeath()) return true; // Death Check.
    // ON (UNDER)ATTACK
    attackerPlayer.changeStatus(PlayerStatus.onAttack);
    if (this.checkDeath()) return true; // Death Check.
    underAttackPlayer.changeStatus(PlayerStatus.onUnderAttack);
    if (this.checkDeath()) return true; // Death Check.
    // Check if under-attack player is unattackable.
    if (attackerPlayer.attackable.value === false) {
      attackerPlayer.cleanUp();
      underAttackPlayer.cleanUp();
      return false;
    }
    // Calculate attack amount.
    let attackAmount = attackerPlayer.attackPower.value
      - underAttackPlayer.defence[attackerPlayer.type].value.defence * 0.5;
    attackAmount = attackAmount < 0 ? 0 : attackAmount;
    this.eventRegistry.registerEvent(new AttackEvent(attackAmount), attackerPlayer.name);
    // Low attack amount let angry go more serious.
    if (attackAmount <= 10) {
      const increasedAngryRate = 10 - attackAmount;
      this.eventRegistry.registerEvent(
        new LowAttackAngryEvent(increasedAngryRate), attackerPlayer.name,
      );
      attackerPlayer.basicSkills.angrySkill.increaseAngryRate(increasedAngryRate);
    }
    underAttackPlayer.health.value -= attackAmount;
    if (this.checkDeath()) return true; // Death Check.
    // AFTER (UNDER)ATTACK
    attackerPlayer.changeStatus(PlayerStatus.afterAttack);
    if (this.checkDeath()) return true; // Death Check.
    underAttackPlayer.changeStatus(PlayerStatus.afterUnderAttack);
    if (this.checkDeath()) return true; // Death Check.
    // FINALLY CLEANUP
    attackerPlayer.cleanUp();
    underAttackPlayer.cleanUp();
    return false;
  }

  checkDeath() {
    return this.players.west.health.value === 0
      || this.players.east.health.value === 0;
  }
}
