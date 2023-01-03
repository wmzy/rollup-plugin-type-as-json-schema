
declare const __DEV__: boolean;

export type Falsy = void | undefined | null | '' | 0 | false;

export type Options = {
  /**
   *
   * @param id id of import
   * @param importer
   * @returns the import id of ts to generate json schema or a falsy value to ignore.
   */
  mapTsId?: (id: string, importer: string) => string | Falsy;
  /**
   * replace the type export name with a new name
   * @param name ts type export name
   * @returns json schema export name
   */
  mapExportName?: (name: string) => string;
  /**
   * ts-json-schema-generator config, default:
   * ```js
   * {
    topRef: false,
    skipTypeCheck: true,
    extraTags: ['faker'],
    type: '*' // Or <type-name> if you want to generate schema for that one type only
  }
  ```
   */
  config?: Partial<import('ts-json-schema-generator').Config>;
};

export default function typeAsJsonSchemaPlugin(options?: Options): import('rollup').Plugin;
export function defaultResolveTsSource(id): string;
export function defaultMapExportName(sym): string;
