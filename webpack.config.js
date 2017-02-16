var webpack = require('webpack')
require('shelljs/global')
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var routePath = require('./build/routePath');
// 默认安装的是1.0.1的版本：npm install --save-dev extract-text-webpack-plugin
// 卸载默认安装：npm uninstall --save-dev extract-text-webpack-plugin

// 安装命令：npm install --save-dev extract-text-webpack-plugin@2.0.0-beta.4 

var CleanPlugin = require('clean-webpack-plugin'); //清理文件夹
var HtmlWebpackPlugin = require('html-webpack-plugin');

var webpackConfig = {
  entry: {},
  output: {
    path: path.join(__dirname, "dist"),//[师父加的注释] src改成了dist
    // publicPath: path.join(__dirname, "./dist"),
    // publicPath: "./static/",
    filename: 'static/js/[name].js'
  },
  resolveLoader: {
    extensions: ['.js'],
    // fallback: [path.join(__dirname, './node_modules')],
    alias: {
        // 'jquery': path.resolve(__dirname, './static/js/jquery'),
        // 'bootstrap': path.resolve(__dirname, './static/js/bootstrap.min'),
        // 'bootstrap-table': path.resolve(__dirname, './static/js/bootstrap-table.min'),
        // 'bootstrap-datetimepicker': path.resolve(__dirname, './static/js/bootstrap-datetimepicker.min'),
        // 'bootstrap-suggest': path.resolve(__dirname, './static/js/bootstrap-suggest.min'),
        // 'sweetalert': path.resolve(__dirname, './static/js/sweetalert.min'),
        // 'formvalidation': path.resolve(__dirname, './static/js/formValidation.min'),
        // 'formvalidationBootstrap': path.resolve(__dirname, './static/js/formValidation.bootstrap.min')
        // 'common': path.resolve(__dirname, './static/js/common')
    }
  },
  module: {
    loaders: [{
        test: /\.js$/,
        exclude: [path.join(__dirname, './node_modules'), path.join(__dirname, './static')]
    }
    ,{
        test: /\.css$/,
        //配置css的抽取器、加载器。'在webpack 1的版本中 -loader'可以省去, webpack 2的版本中必须加上
        // css-loader 安装命令： npm install css-loader --save-dev
        // 如果是加载器 npm install css-loader style-loader html-loader url-loader file-loader --save-dev
        loader: ExtractTextPlugin.extract({fallbackLoader: 'style-loader',loader: 'css-loader'})
    },
     {
        test: /\.less$/,
        //配置less的抽取器、加载器。中间!有必要解释一下，
        //根据从右到左的顺序依次调用less、css加载器，前一个的输出是后一个的输入
        //你也可以开发自己的loader哟。有关loader的写法可自行谷歌之。
        loader: ExtractTextPlugin.extract('css!less')
    }, {
        //html模板加载器，可以处理引用的静态资源，默认配置参数attrs=img:src，处理图片的src引用的资源
        //比如你配置，attrs=img:src img:data-src就可以一并处理data-src引用的资源了，就像下面这样
        test: /\.html$/,
        loader: "html-loader?attrs=img:src img:data-src"
    }, {
        //文件加载器，处理文件静态资源
        test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=./static/fonts/[name].[ext]'
    }, {
        //图片加载器，雷同file-loader，更适合图片，可以将较小的图片转成base64，减少http请求
        //如下配置，将小于8192byte的图片转成base64码
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=80&name=./static/images/[hash].[ext]'
      },
      {
        //json文件加载器，json-loader
        test: /\.json$/,
        loader: 'json-loader',
        exclude: [path.join(__dirname, 'node_modules'), path.join(__dirname, 'static')]
      }
    ]
  },
  plugins: [
  // 这个加上就会打包进入口文件
    // new webpack.ProvidePlugin({
    //   $: 'jquery',
    //   jquery: 'jquery',
    //   'window.jQuery': 'jquery',
    //   jQuery: 'jquery',
    //   'bootstrap': 'bootstrap',
    //   'bootstrapTable': 'bootstrap-table',
    //   'bootstrapSuggest': 'bootstrap-suggest',
    //   'bootstrapDatetimepicker': 'bootstrap-datetimepicker',
    //   'sweetalert': 'bootstrap-table',
    //   'formvalidation': 'formvalidation',
    //   'formvalidationBootstrap': 'formvalidationBootstrap'
    // }),
    new webpack.BannerPlugin('This file is created by doudou'),
    // new ExtractTextPlugin('styles.css')
    new ExtractTextPlugin('static/css/[name].css'),
    // new webpack.optimize.CommonsChunkPlugin({name: "commons", filename: "static/js/commons.js"}),
    new webpack.HotModuleReplacementPlugin(), //热加载(模块热替换(HMR)交换, 添加, 或者删除模块, 同时应用持续运行, 不需要 页面刷新.)
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false 
        //删除所有的注释
      }
    })
    // ,
    // // ,
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'common',
    //   minChunks: function (module, count) {
    //     // any required modules inside node_modules are extracted to vendor
    //     return (
    //       module.resource &&
    //       /\.js$/.test(module.resource) &&
    //       module.resource.indexOf(
    //         path.join(__dirname, './node_modules')
    //       ) === 0
    //     )
    //   }
    // }),
    // // extract webpack runtime and module manifest to its own file in order to
    // // prevent vendor hash from being updated whenever app bundle is updated
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'manifest',
    //   chunks: ['common']
    // })

  ],
  devtool: "source-map",
    //使用webpack-dev-server，提高开发效率
    devServer: {
        contentBase: './',
        host: 'localhost',
        port: 8090, //默认8080
        inline: true, //可以监控js变化
        hot: true //热启动
    },
     watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    }
}

function initConfig(pageList) {
	// path.resolve(__dirname, '../dist')解析路径用的，可以打印看一下效果
    var assetsPath = path.join(path.resolve(__dirname, './dist'), 'static')
    // rm 这一行是删除dist文件夹
    rm('-rf', assetsPath)
    // mkdir是生成dist文件夹的目录
    mkdir('-p', assetsPath)
    // cp是拷贝static文件夹到dist/文件夹
    cp('-R', 'static/*', assetsPath)
    console.log(path.join(__dirname, './src/js/'));

    for(var i = 0;i< pageList.length;i ++) {
        // var e = pageList[i];//[师父加的注释] 我加了'../src/' + 
        var e = pageList[i];
        if(e.match("/")) {
            var pageFileName = e.split("/").join("_");
            var chunks = pageFileName;
        } else {
            var pageFileName = e;
            var chunks = pageFileName;
        }
        var pageFileName = pageList[i];
        if(pageList[i].match('/')){
            var pageListArray = pageList[i].split('');
            pageFileName = pageListArray[pageListArray.length - 1]
        }
        console.info(path.join(__dirname, './src/js/')  + e + ".js");
        webpackConfig.entry[pageFileName] =  path.join(__dirname, './src/js/')  + e + ".js";
        //配置HTML模板
        webpackConfig.plugins.push(new HtmlWebpackPlugin({
            //根据模板插入css/js等生成最终HTML
            filename: './' + pageFileName + ".html",
            //生成前的html存放路径，相对于path
            template: './src/'  + e + '.html',
            //js插入的位置，true/'head'/'body'/false
            inject: 'body',
            hash: true, //为静态资源生成hash值
            chunks: ["commons", chunks],//需要引入的chunk，不配置就会引入所有页面的资源
            minify: {
                removeComments: true,//移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            }
        }));
    }
}

initConfig(routePath)

module.exports = webpackConfig;