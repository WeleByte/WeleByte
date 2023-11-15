const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

module.exports = {
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.(svg|png)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'images/'
                    }
                }
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "style-loader", "css-loader"]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].bundle.css',
            chunkFilename: '[id].css'
        }),
        new webpack.DefinePlugin({
            'process.env.BACKEND_URL': JSON.stringify(process.env.BACKEND_URL)
        })
    ]
}
