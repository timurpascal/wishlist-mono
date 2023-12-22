import updateNodejs from './updateNode.js';

@Describe('Update nodejs test')
export class UpdateNodejsTest {
  @It('Input regexpt test')
  regexpTest() {
    expect(() => updateNodejs('a', true)).toThrowError();
    expect(() => updateNodejs('a', true)).toThrowError();
    expect(() => updateNodejs('!', true)).toThrowError();
    expect(() => updateNodejs(null, true)).toThrowError();
    expect(() => updateNodejs(undefined, true)).toThrowError();
    expect(() => updateNodejs(NaN, true)).toThrowError();
    expect(() => updateNodejs(Infinity, true)).toThrowError();
    expect(() => updateNodejs(0, true)).toThrowError();
    expect(() => updateNodejs(10, true)).toThrowError();
    expect(() => updateNodejs(30, true)).toThrowError();
    expect(() => updateNodejs('123', true)).toThrowError();
    expect(() => updateNodejs('12.11.4.5', true)).toThrowError();
    expect(() => updateNodejs('12.here.4', true)).toThrowError();
    expect(() => updateNodejs('12.11', true)).toThrowError();
    expect(updateNodejs('16', true)).toBe(true);
    expect(updateNodejs('16.0.2', true)).toBe(true);
    expect(updateNodejs('16.5.0', true)).toBe(true);
  }
}
