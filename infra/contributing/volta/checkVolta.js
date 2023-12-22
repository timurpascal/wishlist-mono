/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
const { execSync } = require('child_process');
const { colorWrite, writeEmptyString } = require('../tools/colorWrite');
const checkOs = require('../tools/os');

const checkVolta = () => {
  const os = checkOs();
  try {
    colorWrite('[ INFO ] Check volta install', 'Cyan');
    execSync('volta --version');
    colorWrite('[ INFO ] Volta install corrected', 'Cyan');
  } catch (err) {
    if (err) {
      if (os === 'windows') {
        colorWrite(' ====================== МИНУТОЧКУ ======================', 'Yellow');
        writeEmptyString();
        colorWrite('[ ERROR ] Volta не установлена в твоей системе', 'Red');
        writeEmptyString();
        colorWrite(' ================ ПОМОЩЬ ================', 'Green');
        colorWrite('Давай установим Volta вместе. У тебя Windows я помогу тебе!', 'Green');
        colorWrite('Переходи по ссылке - https://docs.volta.sh/guide/getting-started', 'Green');
        colorWrite('и скачивай инсталлятор для windows', 'Green');
        colorWrite(
          '[ ВАЖНО ] Удали установленную nodejs версию, через панель управления, иначе ничего не будет работать',
          'Yellow',
        );
        colorWrite('[ ВАЖНО ] Включи режим разработчика в настройках Windows 10', 'Yellow');
        writeEmptyString();
        colorWrite(
          '[ ВАЖНО ] Открой новую консоль после установки Volta, переменные окружения в Windows не подтягиваются на горячую',
          'Yellow',
        );
        writeEmptyString();
      } else if (os === 'linux' || os === 'macos' || os === 'cygwin') {
        colorWrite(' ====================== МИНУТОЧКУ ======================', 'Yellow');
        writeEmptyString();
        colorWrite('[ ERROR ] Volta не установлена в твоей системе', 'Red');
        writeEmptyString();
        colorWrite(' ================ ПОМОЩЬ ================', 'Green');
        colorWrite('Давай установим Volta вместе. У тебя Linux like система, я помогу тебе!', 'Green');
        colorWrite('Тебе нужно выполнить команду', 'Green');
        colorWrite('curl https://get.volta.sh | bash', 'Green');
        colorWrite(
          'Теперь Volta установлен, и ты можешь использовать его, только не забудь открыть новый терминал',
          'Green',
        );
        writeEmptyString();
      } else {
        colorWrite(' ====================== МИНУТОЧКУ ======================', 'Red');
        writeEmptyString();
        colorWrite(
          '[ ERROR ] я не представляю с какой операционной системы ты это разрабатываешь, наверное для нее нет Volta',
          'Red',
        );
        colorWrite('Не стоит тебе трогать этот репозиторий наверное', 'Red');
        colorWrite('Если ты знаешь че делаешь, то просто бахни', 'Red');
        colorWrite('yarn install --ignore-script', 'Red');
        writeEmptyString();
      }
      process.exit(1);
    }
  }
};

checkVolta();
