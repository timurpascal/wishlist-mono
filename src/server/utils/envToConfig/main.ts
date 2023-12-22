export const convertEnvToCarmelCase = (envName: string) => {
  if (typeof envName !== 'string') {
    throw Error('Only string allowed');
  }
  if (envName === '_') {
    // исключение, переменная прокидывается в process.env и ломает тесты)
    return '_';
  }
  if (envName.match(/^\d.*/)) {
    throw Error('Variable cant start with number');
  }
  if (envName.match(/-|@|!/g)) {
    throw Error('Variable cant include - @ !');
  }
  const envParse = envName.split('_');
  const answer = envParse.map((i, idx) =>
    idx === 0 ? i.toLowerCase() : i.charAt(0).toUpperCase() + i.slice(1).toLowerCase(),
  );
  return answer.join('');
};
