# 学习笔记

## 安装 yo

运行yo命令需要全局安装：npm install -g yo

## yeoman 是generator的generator

npm init
npm install yeoman-generator
npm link

package.json中name要以generator-开头

```javascript
    initPackage() {
        const pkgJson = {
            devDependencies: {
                eslint: '^3.15.0'
            },
            Dependencies: {
                react: '^16.2.0'
            }
        }
        this.fs.extendJSON(this.destinationPath('package.json'),pkgJson);
        this.npmInstall();
    };
```

## webpack 

最早设计为node的打包工具

loader 是 webpack 的灵魂

## babel

babel原本是把高版本的JS转换成低版本的JS代码的工具

经常在webpack中以Babel-loader形式使用

babel-core babel-cli