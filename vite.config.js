import path from 'path';
import vue from '@vitejs/plugin-vue';



const SRC_DIR = path.resolve(__dirname, './src');
const PUBLIC_DIR = path.resolve(__dirname, './public');
const BUILD_DIR = path.resolve(__dirname, 'D:/NEW_SERVER/txData/NewTestserver_448B73.base/resources/[swkeep]/swkeep-tablet/html', );

export default {
    plugins: [
        vue(),

    ],
    root: SRC_DIR,
    base: '',
    publicDir: PUBLIC_DIR,
    build: {
        outDir: BUILD_DIR,
        assetsInlineLimit: 0,
        emptyOutDir: true,
        rollupOptions: {
            treeshake: false,
        },
    },
    resolve: {
        alias: {
            '@': SRC_DIR,
        },
    },
    server: {
        host: true,
    },

};