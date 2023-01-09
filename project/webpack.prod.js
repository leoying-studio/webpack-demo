const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const env = require("./config/env")
const {DefinePlugin} = require("webpack");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = {
    mode: "production",
    entry: {
        path: path.resolve(__dirname, "src", "index.tsx")
    },
    optimization: {
        splitChunks: {
            chunks: 'initial',
            minSize: 10
        }
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: "/",
    },
    resolve: {
        alias: {
            "@":path.resolve(__dirname, 'src')
        },
        extensions: ['.js', '.jsx', '.json', '.tsx']
    },
    target: 'web',
    module: {
        rules: [
            {
                test: /\*.css$/,
                use: ["style-loader", {
                    loader: "css-loader",
                    options: {
                        esModule: false
                    }
                }]
            },
            {
                test: /\*.(jpg|jpeg|gif|png)$/,
                type: "asset/resource",
                generator: {
                    filename: 'imgs/[name][ext]'
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 300 * 1024
                    }   
                }
            },
            {
                test: /\.(tsx|ts|jsx)$/,
                use: ["babel-loader"]
            }
        ]
    },
    plugins: [
        // 开发环境是不需要的
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./public/template.html",
            title: 'React App'
        }),
        new DefinePlugin({
           env: `"${env}"`
        })
    ]
}