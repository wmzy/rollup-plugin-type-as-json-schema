import * as path from 'path';
import * as rollup from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import snapshot from 'snap-shot-it';
import typeAsJsonSchemaPlugin from '../src';

/** @typedef {import('should')} */

describe('rollup-plugin-type-as-json-schema', () => {
  it('should load type as json schema', async () => {
    const bundle = await rollup.rollup({
      input: path.join(__dirname, 'fixtures/index.ts'),
      plugins: [
        resolve({
          extensions: ['.ts']
        }),
        typeAsJsonSchemaPlugin()
      ]
    });
    const {output} = await bundle.generate({
      format: 'es',
      file: path.join(__dirname, 'fixtures/out.js')
    });
    snapshot(output[0].code);
  });
});
