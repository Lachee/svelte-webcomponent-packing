import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'
import svelte from 'rollup-plugin-svelte'
import sveltePreprocess from 'svelte-preprocess'
import copy from 'rollup-plugin-copy'
import postcss from 'rollup-plugin-postcss'

const production = false; //!process.env.ROLLUP_WATCH
const filename = 'bundle' + (production ?'.min.js' : '.js');
console.log('rollup config', { production, filename });

export default {
  // The file we created with our web component wrapper.
  input: 'src/web-components.ts',
  output: {
    sourcemap: !production,
    format: 'iife',
    name: 'app',
    // We output it to public. This way, our svelte kit
    // app will also host the web components.
    file: `dist/${filename}`,
  },
  // Normal rollup svelte configuration. Nothing fancy
  // happening here.
  plugins: [
    postcss({
      extract: false,
      minimize: true,
    }),
    copy({
      targets: [
        { src: "src/example.html", dest: "dist", rename: 'index.html' },
        { src: "static/**/*", dest: "dist" },
        { src: "src/assets/**/*", dest: "dist/assets" }
      ]
    }),
    typescript(),
    svelte({
      preprocess: sveltePreprocess({
        sourceMap: !production,
        postcss: true,
      }),

      // We just make sure that no global CSS is injeced
      // into the page that imports this script.
      emitCss: false,
      compilerOptions: {
        dev: !production,
      },
    }),
    resolve(),
    commonjs(),
    production && terser(),
  ],
}