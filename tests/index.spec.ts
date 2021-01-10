import battleField, { BattleField } from '../src';

describe('the main test', () => {
  it('should battleField initialize correctly', () => {
    expect(battleField.players.west.name).toBe('玩家 1');
    expect(battleField.players.east.name).toBe('玩家 2');
  });
  it('Play Some 1', () => {
    const bf = new BattleField({
      east: 'Zeithrold',
      west: '云故',
    });
    expect(bf.round()).toBeTruthy();
    console.log(bf.eventRegistry.storedEvent);
  });
  it('Play Some 2', () => {
    const bf = new BattleField({
      east: 'Hello',
      west: '云故',
    });
    expect(bf.round()).toBeFalsy();
    console.log(bf.eventRegistry.events);
    console.log(bf.toRender.west.health);
    console.log(bf.toRender.east.health);
    bf.round();
    console.log(bf.toRender.west.health);
    console.log(bf.toRender.east.health);
    // eslint-disable-next-line guard-for-in
    bf.toRender.messages.forEach(
      (mB) => {
        mB.forEach((message) => console.log(message.message));
      },
    );
  });
});
