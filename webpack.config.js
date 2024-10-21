import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: ['.js'],
        fallback: {
            "zlib": false,
            "querystring": false,
            "path": false,
            "crypto": false,
            "fs": false,
            "stream": false,
            "http": false,
            "net": false,
            "buffer": false,
            "string_decoder": false,
            "url": false,
            "util": false,
            "async_hooks": false,
        },
    },
    mode: 'production',
};
