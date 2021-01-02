import Player from '../models/player/Player';
import EventRegistry from '../events/EventRegistry';

export default class BattleField {
  players: {
    east: Player;
    west: Player;
  };

  eventRegistry: EventRegistry;

  constructor(eastPlayer: string, westPlayer: string) {
    this.players.east = new Player(eastPlayer);
    this.players.west = new Player(westPlayer);
    this.eventRegistry = new EventRegistry();
  }
}
