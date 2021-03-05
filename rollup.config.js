import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import alias from '@rollup/plugin-alias';

import pkg from "./package.json";
import schemapkg from "./node_modules/@colyseus/schema/package.json";

const external = Object.keys(pkg.dependencies)
    .concat(['httpie/fetch']);

const banner = `// colyseus.js@${pkg.version}`;
const bannerUMD = `// colyseus.js@${pkg.version} (@colyseus/schema ${schemapkg.version})`;

export default [

    // https://github.com/microsoft/TypeScript/issues/18442#issuecomment-749896695
    {
        preserveModules: true,
        input: ['src/index.ts'],
        output: [
            { banner, dir: 'build/esm', format: 'esm', entryFileNames: '[name].mjs', sourcemap: true },
            { banner, dir: 'build/cjs', format: 'cjs', entryFileNames: '[name].js', sourcemap: true }
        ],
        external,
        plugins: [
            typescript({ tsconfig: './tsconfig/tsconfig.esm.json' })
        ],
    },

    // browser/embedded dependencies
    {
        preserveModules: false,
        input: ['src/index.ts'],
        output: [{
            banner: bannerUMD,
            dir: 'build',
            name: "Colyseus",
            format: 'umd',
            entryFileNames: 'colyseus.js',
            sourcemap: true 
        }],
        plugins: [
            typescript({ tsconfig: './tsconfig/tsconfig.esm.json' }),
            alias({
                entries: [
                    // httpie: force fetch on browser/UMD environment
                    { find: 'httpie', replacement: './node_modules/httpie/fetch/index.js' }, 

                    // ws: force browser.js version.
                    { find: 'ws', replacement: './node_modules/ws/browser.js' }, 
                ]
            }),
            commonjs(),
            nodeResolve(),
        ],
    },

];