const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
        static: {
            publicPath: '/',
            // contentBase: path.resolve(__dirname, 'public')
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
        new HtmlWebpackPlugin({
            template: "./public/template.html",
            title: 'React App'
        })
    ]
}