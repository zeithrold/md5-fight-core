import battleField from '../src';

jest.mock('../src');

describe('the main test', () => {
  it('should battleField initialize correctly', () => {
    expect(battleField.players.west.name).toBe('玩家 1');
    expect(battleField.players.east.name).toBe('玩家 2');
  });
});
