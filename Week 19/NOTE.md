# 学习笔记

## 使用WSL2 安装Ubuntu 20.04

安装node: apt install node  
安装npm: apt install npm  
npm install n  
n latest  

## 使用Express，编写服务器

mkdir server  
cd server  
npx express-generator  
npm install  
npm start  
scp -P 8022 -r ./* winter@127.0.0.1:home/winter/server  

## 使用node实现发布工具

流式处理  
压缩传递多个文件  

## GitHub OAuth

注册github app，获取Client ID和Client secrets  

<https://docs.github.com/en/developers/apps/authorizing-oauth-apps>

1. 打开https://github.com/login/oauth/authorize   【publish】  
2. auth 路由： 接收code， 用code+client_id+client_secret换token  【server】  
3. 创建server， 接受token， 点击发布  【publish】  
4. publish路由：用token获取用户信息，检查权限，接受发布  【server】  

问题：完成后页面一直在转圈，没有结束。