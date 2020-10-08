import typescript from 'rollup-plugin-typescript2';

const config = {
  input: './src/index.ts',
  plugins: [
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          declaration: true,
          declarationDir: './types'
        },
        include: ['./src/index.ts', './src/types']
      },
      useTsconfigDeclarationDir: true
    })
  ]
};

export default [
  {
    ...config,
    output: {
      file: './index.js',
      format: 'cjs'
    }
  },
  {
    ...config,
    output: {
      file: './index.mjs',
      format: 'es'
    }
  }
];
