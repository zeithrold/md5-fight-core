import { BattleField } from '../../../src';
import { PlayerProperty } from '../../../src/models/player';

describe('PlayerProperty class test', () => {
  it('PlayerProperty initialize correctly', () => {
    const battleField = new BattleField({
      east: 'foo',
      west: 'bar',
    });
    const testProperty = new PlayerProperty(true, 'bar', battleField);
    expect(testProperty.value).toBe(true);
    let speed = battleField.players.east.speed.internalValue;
    expect(speed).toBeTruthy();
    battleField.players.east.speed.value = 0;
    speed = battleField.players.east.speed.internalValue;
    expect(speed).toBeFalsy();
  });
});
