const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const foldName = "11";

module.exports = {
    mode: "development",
    entry: `./src/${foldName}/index.js`,
    output: {
        path: path.resolve(__dirname, "dist", foldName),
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.css/,
                use: ["style-loader", {
                    loader: "css-loader",
                    options: {
                        esModule: false
                    }
                }]
            },
            {
                /**
                 *  webpack5中的asset
                 */
                test: /\.(png|jpg|gif)/,
                type: "asset",
                generator: {
                    // 文件夹下面的名字和扩展名
                    filename: "img/[name][ext]"
                },
                parser: {
                    dataUrlCondition: {
                        // 配置阈值. 根据parser来判断是inline还是 url-loader
                        maxSize: 300 * 1024
                    }
                }
            },
            {
                /**
                 *  webpack5中的asset/resource 可以进行直接进行拷贝,相当于file-loader
                 */
                test: /\.(ttf|woff|woff2|ttof2?)$/,
                type: "asset/resource",
                generator: {
                    // 文件夹下面的名字和扩展名
                    filename: "font/[name][ext]"
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "public/temp/test.html"
        })
    ]
}