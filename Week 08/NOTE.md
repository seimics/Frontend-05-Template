# 学习笔记

## 浏览器工作原理

### 目标：使用 Node.JS 实现简单浏览器  从URL到Bitmap

URL + http => HTML + parse => DOM + CSS computing => DOM with CSS + layout => DOM with position + render => Bitmap  

### 有限状态机处理字符串  

#### 有限状态机  

每一个状态都是一个机器  

+ 在每一个机器，都可以计算、存储、输出
+ 所有的这些机器接受的输入是一致的  
+ 状态机的每一个机器本身没有状态。如果使用函数来表示时，它应该是纯函数（无副作用）。

每一个机器知道下一个状态  

+ 每个机器都有确定的下一个状态(Moore)  
+ 每个机器根据输入决定下一个状态(Mealy)

JS中的有限状态机Mealy

```javascript
//每个函数都是一个状态
function state(input) {
    //在函数中可以自由地编写代码，处理每个状态的逻辑
    return next;//返回值作为下一个状态
}
//以下是调用
while(input) {
    //获取输入
    state = state(input);
}
```

### 不使用有限状态机处理字符串  

```javascript
function find(string) {
  for(let c of string) {
    if(c === 'a') {
      return true;
    }
  }
  return false;
}
```

```javascript
function match(string) {
    for(let i=0; i< string.length-1; i++){
        if(string.charAt(i)==='a' && string.charAt(i+1)==='b') {
            return true;
        }
    }
    return false;
}
console.log(match(" I am a human"));
```

```javascript
function match(string) {
  if(string.length < 'abcdef'.length){
    return false;
  }
    for(let i=0; i< string.length-5; i++){
        if(string.charAt(i)==='a' && string.charAt(i+1)==='b'
                                    && string.charAt(i+2)==='c'
                                    && string.charAt(i+3)==='d'
                                    && string.charAt(i+4)==='e'
                                    && string.charAt(i+5)==='f') {
            return true;
        }
    }
    return false;
}
console.log(match(" I am a human"));
```

### ISO-OSI七层网络协议  

```text
应用 表示 会话 -> HTTP    require("http")  
传输          -> TCP     require("net")  
网络          -> Internet  
数据链路  物理层 -> 4G/Wifi

```  

#### TCP/IP  
TCP 流  端口  require('net')  
IP  包  IP地址  libnet/libpcap(C++)  

#### HTTP  
Request  
RequestLine:  POST / HTTP/1.1  
headers:    Host:127.0.0.1  
            Content-Type: 决定body的格式

headers 以空行结束
body:      
Response  

```NodeJS
const http = require('http');

http.createServer((request, response) => {
    let body = [];
    request.on('error', (err) => {
        console.error(err);
    }).on('data', (chunk) => {
        body.push(chunk.toString());
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        console.log.toString("body: " + body);
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end('Hello, node\n');
    });
}).listen(8088);

console.log("[INFO]: Server started!");
```

### 写一个HTTP请求  

host  ： IP层  
port  ： TCP层  
method  path  headers body ： HTTP协议  
小结：  

- 设计一个HTTP请求的类  
- content-type 是一个必要的字段，要有默认值  
- body是Key-Value格式
- 不同的content-type影响body的格式

send函数

- 在Request的构造器中收集必要的信息
- 设计一个send函数，把请求真是发送到服务器
- send函数应该是异步的，所以返回Promise

发送请求

- 设计支持已有的connection或者自己新建connection
- 收到数据传给parser
- 根据parser的状态resolve Promise

ResponseParser

- Response必须分段构造，所以使用ResponseParser来装配
- ResponseParser分段处理ResponseText, 用状态机分析文本的结构
