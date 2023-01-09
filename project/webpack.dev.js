const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const env = require("./config/env")
const {DefinePlugin} = require("webpack");

module.exports = {
    mode: "development",
    entry: {
        path: path.resolve(__dirname, "src", "index.tsx")
    },
    output: {
        publicPath: "/",
    },
    resolve: {
        alias: {
            "@":path.resolve(__dirname, 'src')
        },
        extensions: ['.js', '.jsx', '.json', '.tsx']
    },
    devtool: "eval-source-map",
    devServer: {
        hot: true,
        port: 8080,
        static: {
            publicPath: '/',
            directory: path.join(__dirname, 'public')
        }
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
        // 该插件只能在开发环境中进行使用, build 模式下会出现错误
        new ReactRefreshWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./public/template.html",
            title: 'React App'
        }),
        new DefinePlugin({
           env: `"${env}"`
        })
    ]
}