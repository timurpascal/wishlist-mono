const checkOs = () => {
  const platform = process.platform;
  if (platform === 'win32') {
    return 'windows';
  }
  if (platform === 'darwin') {
    return 'macos';
  }
  if (platform === 'linux') {
    return 'linux';
  }
  if (platform === 'cygwin') {
    return 'cygwin';
  }
  return 'other';
};

module.exports = checkOs;
