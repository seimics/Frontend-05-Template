# 学习笔记

## JS表达式 

### 运算符和表达式 

运算符优先级从高到低  
Member运算：  
```javascript
a.b   成员访问
a[b]  成员访问 b可以是运行时的字符串
foo`string` 反引号的字符串前面加一个函数名，会把反引号的字符串部分拆开，传进函数当作参数。  
super.b      member运算  
super['b']  member运算  
new.target  
new Foo()  
```

上面的优先级相同，最高
///////////////////

```javascript
New
  new Foo
Example
  new a()()
  new new a()
```

///////////////////
Call Expressions

```javascript
foo()  
super()  
foo()['b']  
foo().b  
foo()`abc`
Example : new a()['b']
/////////////////////
Update  
a++  
a--  
--a  
++a  
```

Unary  

```javascript
delete a.b
void foo()   //把后面的东西变成undefined
typeof a
+a  
-a  
~a  
!a  
await a  
```

////////
Exponental **  右结合运算符
////////
+-*/  
<< >> >>>  
< > <= >= instanceof  
in  
//////////////////
== != === !==
& ~
//////////////////
&& ||  短路原则  &&前的为false，后面不会执行  ||前的为true，后面的不会被执行  
?: 前面执行为true时，后面的不会被执行  

### 引用类型 Reference  标准中的类型  

一个Reference类型取出来是一个Object和Key  
delete和assign会用到Reference

拆箱  
toPrimitive()

``` javascript
var o = {
    toString(){return "2";},
    valueOf(){return 1;},
    [Symbol.toPrimitive](){return 3;}//定义后会忽略前两个方法，加号情况下后面的优先级高于前面的
}
var x = {};
x[o] = 1;//o作为属性名时，没有toPrimitive时优先调用toString方法
console.log("x" + o); //x3
```

装箱  
undefined null 没有包装类  
Number             new Number(1)     1  
String             new String("a")   a  
Boolean            new Boolean(true) true  
Symbol             new Object(Symbol("a"))  Symbol("a")  

当点和方括号前的变量或者表达式是基础类型，那么会自动调用装箱过程。  

## JS语句

### 运行时相关概念  

#### Completion Record  

需要一种数据结构储存语句执行结果：是否返回，值是多少？  
[[type]]: normal, break, continue, return, throw  
[[value]]: 基本类型  
[[target]]:label   break和continue的目标  

#### 简单语句和复合语句  

简单语句  
ExpressionStatement  
EmptyStatement：一个分号  
DebuggerStatement：调试用的语句  
ThrowStatement:抛出异常  
ContinueStatement  
BreakStatement  
ReturnStatement  
  
复合语句
BlockStatement  
    [[type]]:normal  
    [[value]]:--  
    [[target]]:--  
IfStatement  
SwitchStatement: JS中少用  
IterationStatement  
WithStatement:少用  
LabelledStatement  
TryStatement：  

### 声明  

FunctionDeclaration:  
GeneratorDeclaration:function *    Generator 声明  
AsyncFunctionDeclaration: async function  异步函数的声明  
AsyncGenemratorDeclaration: 两个都加是异步产生器的声明  
VariableStatement  
上面的作用范围是function body, 并且会当作在函数的第一行被处理  ， 但 var a = 1的 a = 1赋值没有在第一行执行  
LexicalDeclaration ： const  let

#### 预处理  

```js
var a = 2;
void function() {
    a = 1;
    return;
    var a;
}();
console.log(a);//  2
```  

```js
var a = 2;
void function() {
    a = 1;
    return;
    const a;
}();
console.log(a);//  抛错
```  

#### 作用域

var 函数体
const  花括号内

## JS结构化  

### JS执行粒度

宏任务  
微任务 Promise  
函数调用 Execution Context  
语句/声明  Commpletion Record  
表达式  Reference  
直接量/变量/this .....  

### 事件循环 EventLoop  

wait getCode execute  

## 函数调用

栈  ： Execution Context
栈顶元素： Running Execution Context
Execution Context 结构：  
code evaluation state  : async 或者 generator 表示代码执行到哪里的状态
Function  
Script or Module  
Generator  
Realm   ： 保存内部对象
LexicalEnvironment  
VariavleEnvironment  
Environment Record:

```js
Environment Records
    Declarative Environment Records
        Function Environment Records
        Module Environment Records
    Global Environment Records
    Object Environment Records
```

### Function - Closure 

```js
var y = 2;
function foo2(){
    console.log(y);
}
export foo2;
```

Environment Record:  

``` js
Function: foo2
    Environment Record:
        y:2
    Code:
        console.log(y);
```

另一个例子：  

```js
var y = 2;
function foo2(){
    var z = 3;
    return()=>{
        console.log(y,z);
    }
}
var foo3 = foo2();
export foo3;
```
Environment Record:

```js
Function: foo3
    Environment Record:
        z:3
        this:global
        Environment Record:
            y:2
    Code:
        console.log(y,z);
```

### Realm
