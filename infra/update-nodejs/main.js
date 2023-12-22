/* eslint-disable @typescript-eslint/no-var-requires */
const updateNodejs = require('./updateNode').default;

if (process.argv.length < 3) {
  throw Error('Пожалуста укажите версию ноды параметром к этому скрипту');
}

updateNodejs(process.argv[2]);
