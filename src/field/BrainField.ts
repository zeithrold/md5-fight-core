import Player from '../models/player/Player';

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
      return this.players.west.name;
    } if (this.players.east.name === playerId) {
      return this.players.east.name;
    }
    throw new Error('Invalid playerId');
  }
}
