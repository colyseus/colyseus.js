import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import alias from '@rollup/plugin-alias';

import pkg from "./package.json";
import schemapkg from "./node_modules/@colyseus/schema/package.json";

const external = Object.keys(pkg.dependencies);

const banner = `// colyseus.js@${pkg.version}`;
const bannerStatic = `// colyseus.js@${pkg.version} (@colyseus/schema ${schemapkg.version})`;

export default [

    // https://github.com/microsoft/TypeScript/issues/18442#issuecomment-749896695
    {
        preserveModules: true,
        input: ['src/index.ts'],
        output: [{ banner, dir: 'build/esm', format: 'esm', entryFileNames: '[name].mjs', sourcemap: true },],
        external,
        plugins: [
            typescript({ tsconfig: './tsconfig/tsconfig.esm.json' })
        ],
    },

    {
        preserveModules: true,
        input: ['src/index.ts'],
        output: [{ banner, dir: 'build/cjs', format: 'cjs', entryFileNames: '[name].js', sourcemap: true },],
        external,
        plugins: [
            typescript({ tsconfig: './tsconfig/tsconfig.cjs.json' })
        ],
    },

    // browser/embedded dependencies
    {
        preserveModules: false,
        input: ['src/index.ts'],
        output: [
            {
                banner: bannerStatic,
                dir: 'dist',
                name: "Colyseus",
                format: 'umd',
                entryFileNames: 'colyseus.js',
                sourcemap: true,
                amd: { id: pkg.name }
            },
        ],
        plugins: [
            typescript({ tsconfig: './tsconfig/tsconfig.cjs.json' }),
            alias({
                entries: [
                    // httpie: force `fetch` for web environments
                    { find: 'httpie', replacement: './node_modules/httpie/fetch/index.js' },

                    // ws: force browser.js version.
                    { find: 'ws', replacement: './node_modules/ws/browser.js' },

                    // @colyseus/schema: force browser version.
                    { find: '@colyseus/schema', replacement: './node_modules/@colyseus/schema/build/umd/index.js' },
                ]
            }),
            commonjs(),
            nodeResolve({ browser: true }), // "browser" seems to have no effect here. (why??)
        ],
    },

    // Cocos Creator SDK (same as browser/embedded, but use XHR instead of fetch)
    {
        preserveModules: false,
        input: ['src/index.ts'],
        output: [
            {
                banner: `// THIS VERSION USES "XMLHttpRequest" INSTEAD OF "fetch" FOR COMPATIBILITY WITH COCOS CREATOR\n${bannerStatic}`,
                dir: 'dist',
                name: "Colyseus",
                format: 'umd',
                entryFileNames: 'colyseus-cocos-creator.js',
                sourcemap: true,
                amd: { id: pkg.name }
            },
        ],
        plugins: [
            typescript({ tsconfig: './tsconfig/tsconfig.cjs.json' }),
            alias({
                entries: [
                    // httpie: force XHR implementation on browser/UMD environment
                    { find: 'httpie', replacement: './node_modules/httpie/xhr/index.js' },

                    // ws: force browser.js version.
                    { find: 'ws', replacement: './node_modules/ws/browser.js' },

                    // @colyseus/schema: force browser version.
                    { find: '@colyseus/schema', replacement: './node_modules/@colyseus/schema/build/umd/index.js' },
                ]
            }),
            commonjs(),
            nodeResolve({ browser: true }), // "browser" seems to have no effect here. (why??)
        ],

    },

];
