import { createDefaultEsmPreset } from 'ts-jest';

/** @type {import('jest').Config} */
export default {
  ...createDefaultEsmPreset({
    tsconfig: 'tsconfig.test.json',
    isolatedModules: false,
    diagnostics: {
      ignoreCodes: [151002],
    },
  }),
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js'],
  moduleNameMapper: {
    '^(\\..+)\\.js$': '$1',
  },
};
