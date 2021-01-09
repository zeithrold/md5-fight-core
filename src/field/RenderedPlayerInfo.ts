import { Player } from '../models/player';

class RenderedPlayerInfo {
  readonly player: Player;

  constructor(player: Player) {
    this.player = player;
  }

  get health() {
    return this.player.health.internalValue;
  }

  get healthRate() {
    return this.player.health.internalValue === 0
      ? 0
      : this.health / this.player.health.defaultValue;
  }

  get buffs() {
    const buffMap = this.player.buffs;
    const result: {
      name: string;
      affectTimes: number;
    }[] = [];
    for (const buffSet of buffMap.values()) {
      for (const buff of buffSet) {
        result.push({
          name: buff.name,
          affectTimes: buff.affectTimes,
        });
      }
    }
    return result;
  }
}

export default RenderedPlayerInfo;
