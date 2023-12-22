/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
const { execSync } = require('child_process');
const { colorWrite } = require('../tools/colorWrite');
const fs = require('fs');
const packagesListInstall = ['npm-check-updates', '@nestjs/cli'];
// npx browserslist@latest --update-db

const rcFileName = '.globaltoolrc';

const checkRcFileExist = () => {
  try {
    const data = fs.readFileSync(rcFileName);
    if (data) return true;
  } catch (err) {
    return false;
  }
};

const checkInstallDateOlderThanDays = daysDiff => {
  const daysInMs = daysDiff * 24 * 60 * 60 * 1000;
  const dateNow = Date.now();
  const installPackagesData = fs.readFileSync(rcFileName);
  return dateNow - parseInt(installPackagesData) >= daysInMs;
};

const writeCurrentDateToRcFile = () => {
  const now = Date.now();
  fs.writeFileSync(rcFileName, now.toString());
};

const installGlobalTool = () => {
  const globalNeedTools = packagesListInstall.join(' ');
  try {
    colorWrite('[ INFO ] Проверяю, установленны ли глобальные тулы', 'Cyan');
    const rcFileExist = checkRcFileExist();
    if (rcFileExist) {
      const installDate = checkInstallDateOlderThanDays(7);
      if (installDate) {
        colorWrite(`[ INFO ] Обновляю глобальные тулы ${globalNeedTools}`, 'Cyan');
        execSync(`npm install --engine-strict=false --global ${globalNeedTools}`);
        colorWrite('[ INFO ] Все глобальные тулы успешно установлены', 'Green');
        writeCurrentDateToRcFile();
      } else {
        colorWrite(`[ INFO ] Глобальные тулы уже установлены, и не нуждаются в обновлении`, 'Green');
      }
    } else {
      colorWrite(`[ INFO ] Устанавливаю необходимые глобальные тулы =  ${globalNeedTools}`, 'Cyan');
      execSync(`npm install --engine-strict=false --global ${globalNeedTools} `);
      writeCurrentDateToRcFile();
      colorWrite('[ INFO ] Все глобальные тулы успешно установлены', 'Green');
    }
  } catch (err) {
    colorWrite('[ ERROR ] Ошибка при установке глобальных тулов', 'Red');
    console.log(err);
    process.exit(1);
  }
};

// На линухе нужен
// MAKE
// G++

const postInstall = () => {
  installGlobalTool();
  // isntallNotCommonUtils();
  colorWrite('[ INFO ] Ура, мы закончили, можно работать! ⛏', 'Magenta');
};

postInstall();
