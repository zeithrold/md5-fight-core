import Player from '../models/player/Player';
import EventRegistry from '../events/EventRegistry';
import BrainField from './BrainField';
import { AngrySkill } from '../models/effects/basic/angry';
import { DodgeSkill } from '../models/effects/basic/dodge';

export default class BattleField {
  players: {
    east: Player;
    west: Player;
  };

  eventRegistry: EventRegistry;

  brainField: BrainField;

  constructor(eastPlayer: string, westPlayer: string) {
    this.players.east = new Player(eastPlayer);
    this.players.west = new Player(westPlayer);
    this.eventRegistry = new EventRegistry();
    this.brainField = new BrainField(this.players);

    // this.brainField.registerSkill(eastPlayer, );
  }
}
