const { createMacro } = require('babel-plugin-macros');
const { execSync } = require('child_process');

const parsedGitVersionFromTags = (() => {

  let gitCommand = 'git describe --tags --long';

  const logResult = execSync(gitCommand)
    .toString()
    .trim()

    const regexp = /([0-9]+)\.([0-9]+)-([0-9]+)(.*)/
    const [_, major, minor, buildNumber] = logResult.match(regexp);

    return {major, minor, buildNumber};
})();

const gitInfo = (() => {
  let ret = {};
  try {
    ret = parsedGitVersionFromTags;
  } catch (e) {
    throw Error(`Unable to parse the git information: ${e}`);
  }
  return ret;
})();

const getGitInformation = ({ references }) => {
  const sourceString = `(function() { return ${JSON.stringify(gitInfo)}; })`;
  references.default.forEach(referencePath => {
    referencePath.replaceWithSourceString(sourceString);
  });
};

module.exports = createMacro(getGitInformation);
