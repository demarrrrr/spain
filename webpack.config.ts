import { resolve } from 'path'

import { DefinePlugin } from 'webpack'
import type { Configuration } from 'webpack'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import ESLintPlugin from 'eslint-webpack-plugin'
import StylelintPlugin from 'stylelint-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import dotenv from 'dotenv'

import environment from './configuration/webpack.environment'
import { fileNameGenerator, pages } from './utils/utils'

dotenv.config({ path: './.env' })

const config: Configuration = {
    entry: {
        app: resolve(environment.paths.source, 'assets/js', 'index.ts')
    },
    output: {
        filename: process.env.no_hash === 'true' ? 'assets/js/[name].js' : 'assets/js/[name].[fullhash].js',
        path: environment.paths.output
    },
    module: {
        rules: [
            // Handlebars
            {
                test: /\.(hbs|html)$/,
                use: [
                    {
                        loader: 'handlebars-loader',
                        options: {
                            inlineRequires: /\/img\//,
                            helperDirs: resolve(environment.paths.source, 'pages/helpers'),
                            partialDirs: resolve(environment.paths.source, 'pages/partials')
                        }
                    }
                ],
                exclude: resolve(__dirname, 'node_modules')
            },
            // JS
            {
                test: /\.(ts|js)$/i,
                loader: 'esbuild-loader',
                options: {
                    target: 'es6'
                },
                exclude: resolve(__dirname, 'node_modules')
            },
            // Images
            {
                test: /\.(png|gif|jpe?g)$/i,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: environment.limits.images
                    }
                },
                generator: {
                    filename({ filename }: { filename: string }) {
                        return fileNameGenerator(filename)
                    }
                }
            },
            {
                test: /\.svg$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: environment.limits.images
                    }
                },
                generator: {
                    filename({ filename }: { filename: string }) {
                        return fileNameGenerator(filename)
                    }
                },
                use: 'svgo-loader'
            },
            // Videos
            {
                test: /\.(mp4|webm|mov)$/i,
                type: 'asset/resource',
                generator: {
                    filename({ filename }: { filename: string }) {
                        return fileNameGenerator(filename)
                    }
                }
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: environment.limits.fonts
                    }
                },
                generator: {
                    filename({ filename }: { filename: string }) {
                        return fileNameGenerator(filename)
                    }
                }
            }
        ]
    },
    plugins: [
        new ESLintPlugin({
            exclude: ['node_modules'],
            extensions: ['js', 'ts', 'html', 'hbs']
        }),
        new StylelintPlugin({
            exclude: ['node_modules']
        }),
        new ForkTsCheckerWebpackPlugin(),
        // Clean dist folder
        new CleanWebpackPlugin({
            verbose: true,
            cleanOnceBeforeBuildPatterns: ['**/*', '!stats.json']
        }),
        new DefinePlugin({
            'process.env': JSON.stringify(process.env)
        })
    ]
        // @ts-ignore
        .concat(pages()),
    target: 'web',
    resolve: {
        alias: {
            '@': resolve(__dirname, environment.paths.source),
            '@assets': resolve(__dirname, environment.paths.source, 'assets'),
            '@html': resolve(__dirname, environment.paths.source, 'views'),
            '@parts': resolve(__dirname, environment.paths.source, 'views/templates'),
            '@data': resolve(__dirname, environment.paths.source, 'views/data'),
            '@img': resolve(__dirname, environment.paths.source, 'assets/img')
        },
        extensions: ['.js', '.ts']
    },
    externals: {
        jquery: 'jQuery'
    }
}

export default config
