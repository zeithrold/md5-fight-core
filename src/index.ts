import { BattleField } from './field';

const battleField = new BattleField(
  '玩家 1',
  '玩家 2',
);
const { brainField } = battleField;
export default battleField;
export { brainField }; // Exposes the Effect API.
