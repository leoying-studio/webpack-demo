const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const env = require("./config/env");
const {DefinePlugin} = require("webpack");
module.exports = {
    entry: {
        path: path.resolve(__dirname, "src", "index.tsx")
    },
    resolve: {
        // 编译时候的类型别名, 但是在开发过程中引用路径提示需要在tsconfig中配置
        alias: {
            "@":path.resolve(__dirname, 'src')
        },
        // 可识别的后缀名
        extensions: ['.js', '.jsx', '.json', '.tsx']
    },
    // 常用的编译loader
    module: {
        rules: [
            {
                // 不要写成\*.css$/ 这样无法命中, 遇到@font-face 才成功
                test: /\.css$/i,
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
                test: /\.(ttf|eot|woof2)$/i,
                type: "asset/resource",
                generator: {
                    filename: 'font/[name][ext]'
                }
            },
            {
                test: /\.(tsx|ts|jsx)$/,
                use: ["babel-loader"]
            }
        ]
    },
    plugins: [
        // 默认会创建一个html 模板
        new HtmlWebpackPlugin({
            template: "./public/template.html",
            title: 'React App'
        }),
        new DefinePlugin({
           env: `"${env}"`
        })
    ]
}