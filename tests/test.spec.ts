import testString from '../src/index';

describe('Hello, Jest!', () => {
  it('should just pass', () => {
    expect(true).toBe(true);
  });
  it('should just import match', () => {
    expect(testString).toBe('nice to meet you');
  });
});
