import {createGenerator} from 'ts-json-schema-generator';

/** @typedef { import('../index').Options } Options */
/** @typedef { import('rollup').Plugin } Plugin */

const SCHEMA_QUERY = '?json-schema-source';

/**
 * Rollup plugin
 * @param {Options} options
 * @return {Plugin} plugin
 */
export default function typeAsJsonSchemaPlugin({
  mapTsId: mapTsSource = defaultResolveTsSource,
  mapExportName = defaultMapExportName,
  config
} = {}) {
  const defaultConfig = {
    topRef: false,
    skipTypeCheck: true,
    // https://github.com/vega/ts-json-schema-generator/blob/f55be9f00c67d6ef5c13ee7d45f1dd378162fbf4/src/AnnotationsReader/BasicAnnotationsReader.ts#L86
    extraTags: ['faker'],
    type: '*' // Or <type-name> if you want to generate schema for that one type only
  };

  return {
    name: 'type-as-json-schema',
    async resolveId(source, importer, options) {
      const tsSource = mapTsSource(source, importer);
      if (tsSource) {
        const tsFile = await this.resolve(tsSource, importer, {
          ...options,
          skipSelf: true
        });
        return tsFile && tsFile.id + SCHEMA_QUERY;
      }
    },
    load(id) {
      if (id.endsWith(SCHEMA_QUERY)) {
        const tsFile = id.slice(0, -SCHEMA_QUERY.length);
        const generator = createGenerator({
          ...defaultConfig,
          ...config,
          path: tsFile
        });
        const symbols = generator
          // @ts-ignore
          .getRootNodes()
          .map((n) => n.symbol.escapedName);

        this.addWatchFile(tsFile);

        return symbols
          .map((sym) => {
            const schema = generator.createSchema(sym);
            const jsonSchema = JSON.stringify(schema);
            if (sym === 'default') return `export default ${jsonSchema};`;
            return `export const ${mapExportName(sym)} = ${jsonSchema};`;
          })
          .join('\n');
      }
    }
  };
}

/**
 * default map ts source
 * @param {string} id schema source
 * @returns {string | void}
 */
export function defaultResolveTsSource(id) {
  if (id.endsWith('.schema')) return id.slice(0, -'.schema'.length);
}

export function defaultMapExportName(sym) {
  return `${sym[0].toLocaleLowerCase() + sym.slice(1)}Schema`;
}
