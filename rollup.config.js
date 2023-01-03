import babel from 'rollup-plugin-babel';
import pkg from './package.json';

export default {
  input: 'src/index.js',
  external: ['lodash'],
  plugins: [
    babel({
      exclude: ['node_modules/**']
    })
  ],
  output: [
    {
      file: pkg.main,
      sourcemap: true,
      format: 'cjs'
    },
    {
      file: pkg.exports['.'].import,
      sourcemap: true,
      format: 'es'
    }
  ]
};
