import typescript from '@rollup/plugin-typescript';

const config = {
  input: './src/index.ts',
  plugins: [typescript({ tsconfig: './tsconfig.json' })]
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
