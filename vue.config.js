// vue.config.js
const isProd = process.env.NODE_ENV === 'production';
const BASE_URL = isProd ? '/hrsys/' : '/';

var webpack = require('webpack'); //引入webpack库

//引入插件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionWebpackPlugin = require("compression-webpack-plugin");

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
    // 选项...
    productionSourceMap: false,
    publicPath: BASE_URL,
    chainWebpack: config => {

        config.module
            .rule('images')
            .test(/\.(gif|png|jpe?g|svg)$/i)
            .use('image-webpack-loader')
            .loader('image-webpack-loader')
            .options({
                mozjpeg: { progressive: true, quality: 65 },
                optipng: { enabled: false },
                pngquant: { quality: [0.65, 0.9], speed: 4 },
                gifsicle: { interlaced: false }
                // webp: { quality: 75 }
            });

        config.plugin('html').tap(args => {
            if (isProd) {
                args[0].cdn = {
                    css: [
                        'https://unpkg.com/element-plus@1.0.2-beta.39/lib/theme-chalk/index.css',

                    ],
                    js: [
                        'https://unpkg.com/vue@3.0.11/dist/vue.global.prod.js',//3.0.0版本有问题
                        'https://cdn.jsdelivr.net/npm/element-plus@1.0.2-beta.39/lib/index.full.js',//依赖vue
                        'https://cdn.jsdelivr.net/npm/echarts@5.0.2/dist/echarts.min.js',
                        'https://cdn.jsdelivr.net/npm/tinymce@5.7.1/tinymce.min.js',
                        'https://cdn.jsdelivr.net/npm/moment@2.29.1/moment.min.js',
                    ]
                }
            }
            return args;
        });
    },
    configureWebpack: config => {
        const plugins = [];

        if (isProd) {
            plugins.push(
                new UglifyJsPlugin({
                    uglifyOptions: {
                        warnings: false,
                        compress: {
                            drop_console: true,
                            drop_debugger: false,
                            pure_funcs: ['console.log']//移除console
                        }
                    }
                })
            )

            // 开启分离js
            config.optimization = {
                runtimeChunk: 'single',
                splitChunks: {
                    chunks: 'all',
                    maxInitialRequests: Infinity,
                    minSize: 1000 * 60,
                    cacheGroups: {
                        vendor: {
                            test: /[\\/]node_modules[\\/]/,
                            name(module) {
                                // 排除node_modules 然后吧 @ 替换为空 ,考虑到服务器的兼容
                                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                                return `npm.${packageName.replace('@', '')}`
                            }
                        }
                    }
                }
            };

            // externals里的模块不打包
            const externals = {
                'vue': 'Vue',
                "element-plus": "ElementPlus",
                "echarts": "echarts",
                "tinymce": "tinymce",
                "moment": "moment",
            }
            config.externals = externals;


            //匹配此 {RegExp} 的资源
            plugins.push(
                new CompressionWebpackPlugin({
                    filename: "[path][base].gz",
                    algorithm: "gzip",
                    test: /\.js$|\.css$|\.html$/,
                    threshold: 10240,
                    minRatio: 0.8,
                }),
            );
        }

        return { plugins }
    },
}