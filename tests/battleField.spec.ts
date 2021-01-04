import { BattleField } from '../src';

describe('BattleField.ts test', () => {
  it('should BattleField initialize correctly', () => {
    expect(() => {
      const battleField = new BattleField({ east: 'hello', west: 'world' });
    }).not.toThrow();
  });
});
