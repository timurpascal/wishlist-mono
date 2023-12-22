import { convertEnvToCarmelCase } from './main';

@Describe('Convert dotenv config to CarmelCase')
export class ExportCarmelCase {
  @It('Input test')
  inputTest() {
    expect(convertEnvToCarmelCase('PG_USERNAME')).toBe('pgUsername');
    expect(convertEnvToCarmelCase('PG_USER_NAME')).toBe('pgUserName');
    expect(convertEnvToCarmelCase('_')).toBe('_');
    expect(() => convertEnvToCarmelCase('1_USER')).toThrowError();
    expect(() => convertEnvToCarmelCase('2_HOME')).toThrowError();
    expect(() => convertEnvToCarmelCase('USER-NA-ME')).toThrowError();
    expect(() => convertEnvToCarmelCase('USER@NAME')).toThrowError();
    expect(() => convertEnvToCarmelCase('USE!NAME')).toThrowError();
  }
}
