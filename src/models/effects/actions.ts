import { brainField } from '../../index';

export default interface Actions {
  (playerId?: string, ...params): void;
}

const decreaseHP: Actions = (playerId: string, amount: number) => {
  const targetPlayer = brainField.getPlayer(playerId);
  targetPlayer.health.value -= amount;
};

const increaseHP: Actions = (playerId: string, amount: number) => {
  const targetPlayer = brainField.getPlayer(playerId);
  targetPlayer.health.value -= amount;
};
