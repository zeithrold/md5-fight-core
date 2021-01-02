import PlayerProperty from '../../src/models/player/PlayerProperty';

describe('PlayerProperty.ts', () => {
  // Mock the PlayerProperty.
  jest.mock('../../src/models/PlayerProperty');
  it('should generate object without exception', () => {
    // eslint-disable-next-line no-unused-vars
    expect(() => { const p = new PlayerProperty('foo', 'foo', 'woo'); }).not.toThrow();
  });
  it('should setDefault() work correctly', () => {
    const property = new PlayerProperty('foo', 'foo', 'woo');
    property.value = 'bar';
    expect(property.value).toBe('bar');
    property.setDefault();
    expect(property.value).toBe('foo');
  });
  it('should getter working', () => {
    const property = new PlayerProperty('foo', 'foo', 'woo');
    const spyGetter = jest.spyOn(property, 'value', 'get');
    // eslint-disable-next-line no-unused-vars
    const testGet = property.value;
    expect(spyGetter.mock.calls.length).toBe(1);
  });
  it('should setter working', () => {
    const property = new PlayerProperty('foo', 'foo', 'woo');
    const spySetter = jest.spyOn(property, 'value', 'set');
    property.value = 'bar';
    expect(spySetter.mock.calls.length).toBe(1);
    expect(spySetter.mock.calls[0][0]).toBe('bar');
  });
});
