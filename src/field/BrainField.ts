import Player, { PlayerStatus } from '../models/player/Player';
import { Skill } from '../models/effects';

/**
 * The API platform of the Effect.
 */
export default class BrainField {
  players: { east: Player; west: Player; };

  constructor(players: { east: Player; west: Player; }) {
    this.players = players;
  }

  getPlayer(playerId: string) {
    if (this.players.west.name === playerId) {
      return this.players.west;
    } if (this.players.east.name === playerId) {
      return this.players.east;
    }
    throw new Error('Invalid playerId');
  }

  registerSkill(playerId: string, statusTiming: PlayerStatus, skill: Skill) {
    const targetPlayer = this.getPlayer(playerId);
    targetPlayer.skillSlot[statusTiming].push(skill);
  }
}
