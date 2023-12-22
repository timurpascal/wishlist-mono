/* eslint-disable @typescript-eslint/no-var-requires */
const { readFileSync } = require('fs');
const path = require('path');

const writerOpts = {
  transform: commit => {
    switch (commit.type?.toLowerCase()) {
      case 'feat':
      case 'feature':
        commit.type = 'Features';
        break;
      case 'fix':
        commit.type = 'Bug Fixes';
        break;
      case 'perf':
      case 'performance':
        commit.type = 'Performance Improvements';
        break;
      case 'revert':
        commit.type = 'Reverts';
        break;
      case 'chore':
        commit.type = 'Chore';
        break;
      case 'docs':
      case 'doc':
        commit.type = 'Documentation';
        break;
      case 'style':
        commit.type = 'Styles';
        break;
      case 'refactor':
      case 'refactoring':
        commit.type = 'Code Refactoring';
        break;
      case 'test':
      case 'tests':
        commit.type = 'Tests';
        break;
      case 'infra':
      case 'ci':
      case 'build':
      case 'deploy':
        commit.type = 'Infrastructure';
        break;
      default:
        return;
    }

    if (commit.revert) {
      commit.type = 'Reverts';
    }

    if (commit.scope === '*') {
      commit.scope = '';
    }

    if (typeof commit.hash === 'string') {
      commit.shortHash = commit.hash.substring(0, 7);
    }

    return commit;
  },
  groupBy: 'type',
  commitGroupsSort: 'title',
  commitsSort: ['scope', 'subject'],
  noteGroupsSort: 'title',
};

module.exports = {
  //   parserOpts,
  writerOpts: {
    ...writerOpts,
    mainTemplate: readFileSync(path.resolve(__dirname, 'templates/template.hbs'), 'utf-8'),
    headerPartial: readFileSync(path.resolve(__dirname, 'templates/header.hbs'), 'utf-8'),
    commitPartial: readFileSync(path.resolve(__dirname, 'templates/commit.hbs'), 'utf-8'),
    footerPartial: readFileSync(path.resolve(__dirname, 'templates/footer.hbs'), 'utf-8'),
  },
  context: {
    commit: 'commit',
  },
};
