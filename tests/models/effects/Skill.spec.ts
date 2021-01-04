import { Skill } from '../../../src/models/effects';

test.todo('Skill class');

class TestSkill extends Skill {
  id = 'test-skill';

  description = '测试技能';

  name = '测试技能';

  run = jest.fn();
}

describe('Skill class test', () => {

});
