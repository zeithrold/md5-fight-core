import { BattleField } from '../../../../src';

describe('fortunate skill test', () => {
  it('should fortunate-weaken register buff correctly', () => {
    const battleField = new BattleField({
      west: 'westPlayer',
      east: 'eastPlayer',
    });
    battleField.env = 'test';
    const mockedFortunateSkill = jest.spyOn(battleField.players.west.basicSkills.fortunateSkill, 'run');
    battleField.fight('east');
    expect(
      battleField.eventRegistry.storedEvent.findIndex(
        (eventBlock) => eventBlock.event.id === 'fortunate-activated-event',
      ),
    ).not.toBe(-1);
    expect(mockedFortunateSkill).toBeCalled();
    expect(battleField.eventRegistry.storedEvent[2].event.data)
      .toStrictEqual({
        attackPower: battleField.players.east.attackPower.defaultValue
          * (battleField.players.west.basicSkills.fortunateSkill.data.fortunate / 100),
      });
    expect(battleField.players.east.attackPower.internalValue).toBe(
      battleField.players.east.attackPower.defaultValue,
    );
  });
});
