module.exports = {
    watch: false,
    mode: "production",
    entry: {
        'js/chat': `${__dirname}/src/js/chat.ts`,
        'js/shogi': `${__dirname}/src/js/shogi.ts`
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader"
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ]
                    }
                }
            }
        ]
    },
    output: {
        path: `${__dirname}/public`,
        filename: "[name].js"
    },
    optimization: {
        minimize: true,
        splitChunks: {
            name: "js/chunks",
            chunks: "initial"
        }
    },
    resolve: {
        extensions: [
            ".js", ".ts"
        ]
    }
};
