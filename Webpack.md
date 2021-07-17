## 体积优化的方式
1. 安装webpack-bundle-analyzer, 分析哪些模块体积过大
2. 安装mini-css-extract-plugin,
3. uglifyjs-webpack-plugin 压缩js
***

## 按需加载的方式
- treeshaking原理
- [title](./浏览器相关.md#优化)
***

## webpack构建
- 初始化项目
  1. mkdir webpack-demo && cd webpack-demo
  2. npm init -y
  3. npm install webpack@4.41.5 webpack-cli@3.3.10 -D(-D等于--save --dev, 会把包添加到devDependencies里)
  4. mkdir src && cd src
  5. touch index.js
  6. npx webpack --mode=development  -> 多出一个dist文件夹
- 将JS转义为低版本(将JS代码向低版本转换，我们需要使用 babel-loader)
  1. 安装相应依赖
  ```javascript
    npm install babel-loader -D
    npm install @babel/core @babel/preset-env @babel/plugin-transform-runtime -D
    npm install @babel/runtime @babel/runtime-corejs3
  ```
  2. 新建 webpack.config.js
  ```javascript
    //webpack.config.js
    module.exports = {
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    use: ['babel-loader'],
                    exclude: /node_modules/ //排除 node_modules 目录
                }
            ]
        }
    }
  ```
  3. 创建一个 .babelrc
  ```json
    {
      "presets": ["@babel/preset-env"],
      "plugins": [
          [
              "@babel/plugin-transform-runtime",
              {
                  "corejs": 3
              }
          ]
      ]
    }
  ```
  4. npx webpack --mode=development  -> dist/main.js编译成了低版本的代码
  5. 在 webpack.config.js 中配置babel
  ```javascript
    module.exports = {
        module:{
            rules:[
                {
                    test:/\.js?$/,
                    // use:['babel-loader'],
                    // use可以为string / [] / {}
                    use:{
                        loader: 'babel-loader',
                        options: {
                            "presets": ["@babel/preset-env"],
                            "plugins": [
                                [
                                    "@babel/plugin-transform-runtime",
                                    {
                                        "corejs": 3
                                    }
                                ]
                            ]
                        }
                    },
                    exclude:/node_modules/
                }
            ]
        }
    }
  ```
- mode
  1. 将 mode 增加到 webpack.config.js 中
     1. development：将 process.env.NODE_ENV 的值设置为 development，启用 NamedChunksPlugin 和 NamedModulesPlugin
     2. production：将 process.env.NODE_ENV 的值设置为 production，启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 UglifyJsPlugin
  ```javascript
    module.exports = {
      //....
      mode: "development",
      module: {
          //...
      }
    }
  ```
- 在浏览器中查看页面
  1. 安装依赖
  ```javascript
    npm install html-webpack-plugin@4.3.2 -D 
  ```
  2. 我们在 public 目录下新增一个 config.js ->  为了灵活控制需要的模板/功能
  ```javascript
    //public/config.js 除了以下的配置之外，这里面还可以有许多其他配置，例如,pulicPath 的路径等等
    module.exports = {
        dev: {
            template: {
                title: '你好',
                header: false,
                footer: false
            }
        },
        build: {
            template: {
                title: '你好才怪',
                header: true,
                footer: false
            }
        }
    }
  ```
  3. 修改webpack.config.js
  ```javascript
    //webpack.config.js
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const isDev = process.env.NODE_ENV === 'development';
    const config = require('./public/config')[isDev ? 'dev' : 'build'];

    modue.exports = {
        //...
        mode: isDev ? 'development' : 'production'
        plugins: [
            new HtmlWebpackPlugin({
                template: './public/index.html',
                filename: 'index.html', //打包后的文件名
                config: config.template
            })
        ]
    }
  ```
  4. 修改src/index.html
  ```html
    <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <% if(htmlWebpackPlugin.options.config.header) { %>
          <link rel="stylesheet" type="text/css" href="//common/css/header.css">
          <% } %>
          <title><%= (htmlWebpackPlugin.options.config.title) %></title>
      </head>

      <body>
      </body> 
      <% if(htmlWebpackPlugin.options.config.header) { %>
      <script src="//common/header.min.js" type="text/javascript"></script> 
      <% } %>
    </html>
    ```
- cross-env
  1. 安装依赖
  ```javascript
    npm install cross-env -D
  ```
  2. 在package.json定义
  ```javascript
      "scripts": {
        "dev": "cross-env NODE_ENV=development webpack",
        "build": "cross-env NODE_ENV=production webpack"
      }
  ```
- 在浏览器中实时展示效果
  1. 安装依赖
  ```javascript
    npm install webpack-dev-server -D
  ```
  2. 修改 package.json 文件的 scripts
  ```json
    "scripts": {
        "dev": "cross-env NODE_ENV=development webpack-dev-server",
        "build": "cross-env NODE_ENV=production webpack"
    },
  ```
  3. 将编译后的代码映射回原始源代码
  ```javascript
      //webpack.config.js
      module.exports = {
          devtool: 'cheap-module-eval-source-map' //开发环境下使用
      }
  ```
- 处理css文件
  1. 安装依赖
  ```javascript
    npm install style-loader less-loader css-loader postcss-loader autoprefixer less -D
    "autoprefixer": "^9.7.4",
    "css-loader": "^3.4.2",
    "less": "^3.1.1",
    "less-loader": "^7.0.1",
    "postcss-loader": "^3.0.0",
    "style-loader": "^1.0.0",
  ```
  2. 新建index.less, 在index.js中引入
  ```less
    // src/index.less
    @color: lightblue;
    body{
        background: @color;
        transition: all 2s;
    }
  ```
  ```JavaScript
    // src/index.js
    import './index.less';
  ```
  3. webpack配置loader
  ```javascript
      //webpack.config.js
      module.exports = {
          //...
          module: {
              rules: [
                  {
                      test: /\.(le|c)ss$/,
                      use: [
                        "style-loader", // 动态创建 style 标签，将 css 插入到 head 中
                        'css-loader', // 负责处理 @import 等语句
                        {
                            loader: 'postcss-loader', 
                            options: {
                                plugins: function () {
                                    return [
                                        // postcss-loader和autoprefixer自动生成浏览器兼容性前缀
                                        require('autoprefixer')({
                                            "overrideBrowserslist": [
                                                ">0.25%",
                                                "not dead"
                                            ]
                                        })
                                    ]
                                }
                            }
                        }, 
                        {
                            loader: "less-loader",  // 负责处理编译 .less 文件,将其转为 css
                            options: {
                                lessOptions: {
                                    strictMath: true,
                                    noIeCompat: true
                                }
                            }
                        }
                      ],
                      exclude: /node_modules/
                  }
              ]
          }
      }
  ```
- 处理css中的图片
  1. 安装依赖
  ```javascript
    npm install url-loader file-loader -D
  ```
  2. 在 webpack.config.js 中进行配置
  ```javascript
    //webpack.config.js
    module.exports = {
        //...
        modules: {
            rules: [
                {
                    test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                // 10K, 即资源大小小于 10K 时，将资源转换为 base64，超过 10K，将图片拷贝到 dist 目录
                                limit: 10240, 
                                esModule: false 
                            }
                        }
                    ],
                    exclude: /node_modules/
                }
            ]
        }
    }
  ```
- 输入
  ```javascript
    //webpack.config.js
    module.exports = {
        entry: './src/index.js' //webpack的默认配置
    }
  ```
- 输出
  ```javascript
    const path = require('path');
    module.exports = {
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'), //必须是绝对路径
            filename: 'bundle.js',
            publicPath: '/' //通常是CDN地址
        }
    }
  ```
- 每次打包前清空dist目录
  ```javascript
    npm install clean-webpack-plugin -D // 安装依赖
    //webpack.config.js
    const { CleanWebpackPlugin } = require('clean-webpack-plugin');
    module.exports = {
      //...
      plugins: [
          //不需要传参数喔，它可以找到 outputPath
          new CleanWebpackPlugin() 
      ]
    }
  ```
***

## 谈一谈babel
1. 核心库 @babel/core
   - core是核心，没有它，在 babel 的世界里注定寸步难行
2. CLI命令行工具 @babel/cli
3. 插件: Babel 构建在插件之上，使用现有的或者自己编写的插件可以组成一个转换通道
   - 语法插件
   - 转换插件

   1. npm install @babel/core @babel/cli -D
   2. 将命令配置在 package.json 文件的 scripts 字段中
    ```json
        "scripts": {    
          "compiler": "babel src --out-dir lib --watch"
        }
    ```
   3. npm run compiler 
      1. 现在我们没有配置任何插件，编译前后的代码是完全一样的
      2. 如果想要 Babel 做一些实际的工作，就需要为其添加插件(plugin)
4. 预设

***

## 静态模块打包工具, 遵循 CommonJS 模块规范
* 依赖关系: 文件A需要文件B即为一个依赖关系
* 流程: 入口(entry) -> 构建依赖关系图 -> 打包所有模块为bundle -> 输出(output)
***
## 相关概念

### entry 
- 构建依赖图的入口
- 用法：entry: string | [string]
```javascript
module.exports = {
    entry: {
        main: './src/app.js',   // 应用程序入口
        vendor: './src/vendor.js',  // 第三方入口
    },
    entry: ['./src/file_1.js', './src/file_2.js'],  // 多入口写法
};
```

### output
- 告诉 webpack 在哪里输出它所创建的 bundle
```javascript
const path = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js',
  },
};
```
***

### loader
- (webpack只能理解JS & JSON)
- 让 webpack 能够去处理其他类型的文件，并将它们转换为有效 模块，以供应用程序使用，以及被添加到依赖图中

    1. 有两个属性：
    - test 属性，识别出哪些文件会被转换。
    - use 属性，定义出在进行转换时，应该使用哪个 loader。
    2. 配置rules时, 要定义在 module.rules
```javascript
const path = require('path');

module.exports = {
  output: {
    filename: 'my-first-webpack.bundle.js',
  },
  module: {
    rules: [{ test: /\.txt$/, use: 'raw-loader' }], 
    // 嘿，webpack 编译器，当你碰到「在 require()/import 语句中被解析为 '.txt' 的路径」时，在你对它打包之前，先 use(使用) raw-loader 转换一下。
  },
};
```
***

### plugin 
- plugin用于执行范围更广的任务，包括：打包优化，资源管理，注入环境变量
- 特定时机注入扩展逻辑来改变构建结果
- (loader 用于转换某些类型的模块) 

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const webpack = require('webpack'); // 用于访问内置插件

module.exports = {
  module: {
    rules: [{ test: /\.txt$/, use: 'raw-loader' }],
  },
  plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
};
```
***

### mode
- 通过选择 development, production 或 none 之中的一个
```javascript
module.exports = {
  mode: 'production',
};
```


## 按需加载
- 组件提供了ES Module，并且支持Tree Shaking
- 否则，webpack的babel-plugin-import
***

## 优化方式
1. 图片小于10k的时候, 将资源转换为 base64 可以减少网络请求次数
```javascript
    {
        test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
        use: [
            {
                loader: 'url-loader',
                options: {
                    limit: 10240, //10K
                    esModule: false 
                }
            }
        ],
        exclude: /node_modules/
    }
```
***

## loader的原理?
1. css-loader将a.css、b.css和c.css的样式内容以字符串的形式拼接在一起，并将其作为js模块的导出内容
2. less-loader的原理很简单，就是调用less库提供的方法，转译less语法后输出
  ```javascript
    // less-loader实现（经简化）
    const less = require('less');

    module.exports = function(content) {
      const callback = this.async(); // 转译比较耗时，采用异步方式
      const options = this.getOptions(); // 获取配置文件中less-loader的options
      
      less.render(
        content,
        createOptions(options), // less转译的配置
        (err, output) => {
          callback(err, output.css); // 将生成的css代码传递给下一个loader
        }
      );
    };
  ```