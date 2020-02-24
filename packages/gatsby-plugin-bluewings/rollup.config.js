import pugAsJsx from 'rollup-plugin-pug-as-jsx';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';
import path from 'path';

const pkg = require('./package.json');

console.log(__dirname);

const rollupConfig = {
  input: 'src/index.ts',
  plugins: [
    pugAsJsx({
      rootDir: path.join(__dirname, 'src'),
      autoUpdateJsFile: true,
      resolve: {

        classnames: 'cx',
        '@/helpers/util.ts': {
          member: {
            decimal: 'decimalFormat',
            ellipsis: 'ellipsis',
            dateFormat: 'dateFormat',
          },
        },
      },
    }),
    // typescript({
    //   tsconfigOverride: {
    //     compilerOptions: {
    //       declaration: true,
    //     },
    //   },
    // }),
    typescript({
      // https://github.com/ezolenko/rollup-plugin-typescript2
      clean: true,
      objectHashIgnoreUnknownHack: true,
      useTsconfigDeclarationDir: true,
      tsconfigOverride: {
        compilerOptions: {
          declaration: true,
          declarationDir: 'dist',
          allowJs: false,
          isolatedModules: false,
        },
        // include: [entry],
      },
    }),
    postcss(),
    image(),
  ],
  external: (id) => !id.startsWith('.') && !id.startsWith('/'),
};

const cjs = {
  ...rollupConfig,
  output: {
    file: pkg.main,
    format: 'cjs',
    sourcemap: true,
  },
};

const esm = {
  ...rollupConfig,
  output: {
    file: pkg.module,
    format: 'es',
    sourcemap: true,
  },
};

export default [cjs, esm];