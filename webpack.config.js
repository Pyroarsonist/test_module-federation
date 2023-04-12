const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const {dependencies} = require("./package.json");


module.exports = {
    mode: 'development',
    output: {publicPath: 'auto'},
    devServer: {
        port: 8082,
        historyApiFallback: true,
        client: {
            progress: true,
        },
        proxy: [{
            context: ['/api', '/flags'],
            target: 'http://localhost:9090',
            // target: '18b0-34-76-65-254.ngrok-free.app',
            secure: false,
            changeOrigin: true,
            headers: {Connection: 'keep-alive', custom: 'dan'},
            // onProxyRes: function (proxyRes, req, res) {
            //     console.log(proxyRes.statusCode);
            // },
            onError: function (err, req, res) {
                console.error(err)
                console.log(`req.body: ${req.body}`); // here it returned undefined
                console.log(`err.code: ${err.code}`);
                if (err.code === 'ECONNRESET') {
                    res.writeHead(204, {'Content-Type': 'application/json'});
                    res.end();
                }
            },
            // bypass: function (req, res, proxyOptions) {
            //     console.log(proxyOptions)
            //     return null
            //     // if (req.headers.accept.indexOf('html') !== -1) {
            //     //     console.log('Skipping proxy for browser request.');
            //     //     return '/index.html';
            //     // }
            // },
        }]

    },
    module: {
        rules: [
            {
                /* The following line to ask babel
                     to compile any file with extension
                     .js */
                test: /\.js?$/,
                /* exclude node_modules directory from babel.
                    Babel will not compile any files in this directory*/
                exclude: /node_modules/,
                // To Use babel Loader
                loader:
                    'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env' /* to transfer any advansed ES to ES5 */,
                        '@babel/preset-react',
                    ], // to compile react to ES5
                },
            },
        ],
    },
    plugins: [
        new ModuleFederationPlugin(
            {
                name: 'MFE2',
                filename:
                    'remoteEntry.js',
                remotes: {
                    MFE1:
                        'MFE1@http://localhost:8083/remoteEntry.js',
                    MFE0:
                        'MFE0@http://localhost:8084/remoteEntry.js',
                    MFE4:
                        'MFE4@http://localhost:8085/remoteEntry.js',
                    Omni:
                        'Omni@http://localhost:3000/remoteEntry.js'
                },
                shared: {
                    ...dependencies,
                    react: {
                        singleton: true,
                        requiredVersion: dependencies["react"],
                    },
                    "react-dom": {
                        singleton: true,
                        requiredVersion: dependencies["react-dom"],
                    },
                }
            }
        ),
        new HtmlWebpackPlugin({
            template:
                './public/index.html',
        }),
    ],
};
