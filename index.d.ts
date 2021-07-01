
declare const __DEV__: boolean;

export type Options = {
  mapTsSource?: (source: string) => string | void;
  mapExportName?: (name: string) => string;
  config?: Partial<import('ts-json-schema-generator').Config>;
};
