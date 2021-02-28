# 学习笔记  

1. git hook 检查时机
2. ESLint 轻量级代码检查方案
3. //PhantomJS 无头浏览器代码生成与检查
3. Chrome的headless模式

## Git hook

pre-commit   =>  lint

```bash
#! /usr/bin/env node
let process = require("process");
console.log("Hello, hooks!");
process.exit(1);
```

pre-push   => check

## ESLint

npm install --save-dev eslint

npx eslint --init

npx eslint ./index.js

## Chrome headless

puppeteer文件较大 安装需要一定时间

```nodejs
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:8080/main.html');
    const a = await page.$('a');
    console.log(await a.asElement().boxModel());
})();

```