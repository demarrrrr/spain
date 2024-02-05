import { resolve } from 'path'

import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin'
import { merge } from 'webpack-merge'
import type { Configuration } from 'webpack'

import baseConfig from '../webpack.config'

import environment from './webpack.environment'
import 'webpack-dev-server'


const config: Configuration = merge(baseConfig, {
    mode: 'development',

    /* Manage source maps generation process */
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: resolve(__dirname, 'node_modules'),
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    'postcss-loader'
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                exclude: resolve(__dirname, 'node_modules'),
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    'sass-loader',
                    'postcss-loader'
                ],
            }
        ]
    },
    devServer: {
        open: false,
        client: {
            progress: true,
            logging: 'none',
            overlay: {
                warnings: false,
                errors: true
            }
        },
        watchFiles: [
            resolve(environment.paths.source, 'pages', '*.html'),
            resolve(environment.paths.source, 'pages/partials', '*.hbs')
        ],
        historyApiFallback: true,
        compress: true,
        ...environment.server
    },

    optimization: {
        minimize: false,
    },

    /* File watcher options */
    watchOptions: {
        aggregateTimeout: 500,
        ignored: /node_modules/
    },
})

export default config
