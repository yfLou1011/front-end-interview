# Webpack

## 静态模块打包工具, 遵循 CommonJS 模块规范

* 依赖关系: 文件A需要文件B即为一个依赖关系

* 流程: 入口(entry) -> 构建依赖关系图 -> 打包所有模块为bundle -> 输出(output)

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
### plugin 
- plugin用于执行范围更广的任务，包括：打包优化，资源管理，注入环境变量。
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

### mode
- 通过选择 development, production 或 none 之中的一个
```javascript
module.exports = {
  mode: 'production',
};
```


### 按需加载
- 组件提供了ES Module，并且支持Tree Shaking
- 否则，webpack的babel-plugin-import