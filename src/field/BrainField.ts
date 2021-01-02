import Player, { PlayerStatus } from '../models/player/Player';
import { Buff, Skill } from '../models/effects';

/**
 * The API platform of the Effect.
 */
export default class BrainField {
  players: { east: Player; west: Player; };

  env: 'test' | 'production' | 'dev'

  constructor(players: { east: Player; west: Player; }, env: 'test' | 'production' | 'dev' = 'production') {
    this.players = players;
    this.env = env;
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
    targetPlayer.skillSlot[skill.affectTiming].push(skill);
  }

  registerBuff(playerId: string, buff: Buff) {
    const targetPlayer = this.getPlayer(playerId);
    targetPlayer.buffs[buff.affectTiming].push(buff);
  }

  generateRandom() {
    if (this.env !== 'production') {
      return 0;
    }
    return Math.floor(Math.random() * 100);
  }
}
