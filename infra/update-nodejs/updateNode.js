/* eslint-disable @typescript-eslint/no-var-requires */
const { execSync } = require('child_process');
const fs = require('fs');

// Скрипт меняет версию NODEJS в проекте, работает на смену мажорной версии
// Изменяет полностью все использование nodejs, включая CI!
// 1 gitlab.ci -> variables
// 2 volta пинит нужную ноду

const errorMessage =
  'Версия должна содержать набор из 1 или 3х цифр через точку! И пожалуйста используй ноду больше 10 и меньше 30';

const updateNodejs = (version, testMode) => {
  const versionArray = version.split('.');
  if (versionArray.length === 3 || versionArray.length === 1) {
    versionArray.map((i, idx) => {
      if (!parseInt(i) && i != 0) {
        throw new Error(errorMessage);
      } else {
        if (idx === 0) {
          if (parseInt(i) <= 10 || parseInt(i) >= 30) {
            throw new Error(errorMessage);
          }
        }
      }
    });

    if (testMode) {
      return true;
    }

    // Package.json
    execSync(`volta pin node@${version}`);

    // .gitlab-ci
    const gitlabFileName = '.gitlab-ci.yml';
    const gitlabData = fs.readFileSync(gitlabFileName).toString();
    const newYamlNode = gitlabData.replace(/NODE_VERSION: .*/, `NODE_VERSION: ${version}`);
    fs.writeFileSync(gitlabFileName, newYamlNode);
  } else {
    throw new Error(errorMessage);
  }
};

exports.default = updateNodejs;
