import { exec } from 'child_process';

export function checkSecurityIssue(): Promise<any> {
  return new Promise((resolve, reject) => {
    exec(`yarn audit --level critical --json`, (err, stdout, stderr) => {
      if (stderr) reject(stderr);
      if (stdout.length === 0) reject('Yarn stdout === 0');
      resolve(JSON.parse(stdout));
    });
  });
}

export function checkOutdateDeps(): Promise<any> {
  return new Promise((resolve, reject) => {
    exec(`yarn outdated --json`, (err, stdout, stderr) => {
      if (stderr) reject(stderr);
      if (stdout.length === 0) {
        resolve(true);
        return;
      }
      const onlyOutdateData = stdout.slice(stdout.indexOf('}') + 1);
      resolve(JSON.parse(onlyOutdateData));
    });
  });
}
