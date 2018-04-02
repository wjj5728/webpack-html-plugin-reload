# HTML Webpack Plugin Reload

如果在webpack-dev-server开启hot模式的情况，修改html模板是无法自动刷新的，之后在一个[webpack教程](https://github.com/AriaFallah/WebpackTutorial/tree/master/part1/html-reload)中找到了一个方案，
后来在使用中发现当在入口文件中加入

```javascript

if (module.hot) {
    module.hot.accept()
}

```
html文件还是无法刷新
后来发现有webpack-html-plugin可以完成
全部代码都来自于两者的结合
[andrewcoelho](https://github.com/andrewcoelho/reload-html-webpack-plugin)
[zsy1993](https://github.com/zsy1993/reload-template-webpack-plugin)
## 用法

```javascript
// in webpack.config.js

var ReloadPlugin = require('webpack-html-plugin-reload');

//

plugins: [
    new ReloadPlugin()
]

//


```