module.exports = {
  extension: ['js', 'ts'],
  recursive: true,
  exclude: ['mock', 'typings', 'fixtures'].map(dir => `test/${dir}/*`),
  require: ['test/babel-register.cjs', 'should', 'should-sinon']
}
