import { BattleField } from '../../../../src';
import { PlayerType } from '../../../../src/models/player/Player';

describe('angry skill test', () => {
  it('should angry skill run correctly', () => {
    const battleField = new BattleField({
      west: 'foo',
      east: 'bar',
    });
    battleField.players.west.basicSkills.angrySkill.data.angryRate = 101;
    battleField.fight('west');
    const { storedEvent } = battleField.eventRegistry;
    expect(storedEvent.findIndex(
      (value) => value.event.id === 'angry-affected-event',
    )).not.toBe(-1);
    const westPlayerAPModifiedEvent = storedEvent.find(
      (value) => value.playerId === 'foo' && value.event.id === 'attack-power-modified-event',
    );
    const westPlayer = battleField.players.west;
    expect(westPlayerAPModifiedEvent).toBeTruthy();
    expect(westPlayerAPModifiedEvent.event.data.attackPower).toBe(
      westPlayer.attackPower.defaultValue * 1.5,
    );
    const eastPlayerMDModifiedEvent = storedEvent.find(
      (value) => value.playerId === 'bar'
        && value.event.id === 'defence-modified-event'
      && value.event.data.type === PlayerType.magical,
    );
    const eastPlayerPDModifiedEvent = storedEvent.find(
      (value) => value.playerId === 'bar'
        && value.event.id === 'defence-modified-event'
        && value.event.data.type === PlayerType.physical,
    );
    const eastPlayer = battleField.players.east;
    expect(eastPlayerMDModifiedEvent).toBeTruthy();
    expect(eastPlayerPDModifiedEvent).toBeTruthy();
    expect(eastPlayerMDModifiedEvent.event.data.defence).toBe(
      eastPlayer.defence[PlayerType.magical].internalValue.defence * 0.5,
    );
    expect(eastPlayerPDModifiedEvent.event.data.defence).toBe(
      eastPlayer.defence[PlayerType.physical].internalValue.defence * 0.5,
    );
  });
});
