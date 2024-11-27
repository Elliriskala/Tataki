import typescript from 'rollup-plugin-typescript2';
import {watch} from 'rollup';
import glob from 'glob';
import path from 'path';

const files = glob.sync('./src/**/*.ts'); // Match all .ts files in src directory

export default {
  input: files, // Use the dynamically matched files
  output: {
    format: 'cjs',   // CommonJS format
    entryFileNames: '[name].js', // Keep original file names for output
  },
  plugins: [typescript()],
  watch: {
    clearScreen: false,
    include: 'src/**',
    exclude: 'node_modules/**',
  },
};