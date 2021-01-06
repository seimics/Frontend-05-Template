# 学习笔记

## 重学HTML

### HTML的定义：XML和SGML

#### DTD与XML namespace

<http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd>
<http://www.w3.org/1999/xhtml>

使用CSS中white-space属性来控制空格被显示出来，而不是使用nbsp（no-break space）

&lambda
&quot
&amp
&lt
&qt
&apos

namespace：
- HTML
- XHTML
- MathML
- SVG

### HTML 标签语义

header：通常出现在前部，表示导航或者介绍性地内容  
footer：通常出现在尾部，包含一些作者信息、相关链接、版权信息等。  
header和footer一般都是放在article或者body地直接子元素，但是标准中并没有明确规定，footer也可以和aside，nav，section相关联（header不存在关联问题）。  
aside：表示和文章主题不那么相关地部分，它可能包含导航、广告等工具性质地内容。

aside 很容易被理解为侧边栏，实际上二者是包含关系，侧边栏是 aside，aside 不一定是侧边栏。
  
aside 和 header 中都可能出现导航（nav 标签），二者的区别是，header 中的导航多数是到文章自己的目录，而 aside 中的导航多数是到关联页面或者是整站地图。  

最后 footer 中包含 address，这是个非常容易被误用的标签。address 并非像 date 一样，表示一个给机器阅读的地址，而是表示“文章（作者）的联系方式”，address 明确地只关联到 article 和 body。

### 标签嵌套规则

#### 块级元素
div、h1~h6、address、blockquote、center、dir、dl、dt、dd、fieldset、form、hr、isindex、menu、noframes、noscript、ol、p、pre、table、ul ...
特点：总是在新行上开始，高度、行高以及顶和底边距都可控制，宽度缺省是它的容器的100%，除非设定一个宽度
功能：主要用来搭建网站架构、页面布局、承载内容

#### 行内元素
span、a、abbr、acronym、b、bdo、big、br、cite、code、dfn、em、font、i、img、input、kbd、label、q、s、samp、select、small、strike、strong、sub、sup、textarea、tt、u、var ...
特点：和其他元素都在一行上，高、行高及顶和底边距不可改变，宽度就是它的文字或图片的宽度，不可改变
功能：用于加强内容显示,控制细节，例如：加粗、斜体等等

块级元素与行内元素并不是一成不变的，我们可以通过CSS来改变他的特性

```css
display: inline; //行内元素

display: block; //块级元素
```

1. 块级元素与块级元素平级、内嵌元素与内嵌元素平级

    ```html
    <div><span></span><p></p></div>  //span是行内元素，p是块级元素，所以这个是错误的嵌套
    
    <div><span></span><a></a></div>  //对的
    ```

2. 块元素可以包含内联元素或某些块元素，但内联元素不能包含块元素，它只能包含其它的内联元素

    ```html
    <div><span></span></div>
    
    <span><span></span></span>
    ```

3. 有几个特殊的块级元素只能包含内嵌元素，不能再包含块级元素

    h1、h2、h3、h4、h5、h6、p、dt

4. 块级元素不能放在标签p里面

5. li 标签可以包含 div 标签，因为li 和 div 标签都是装载内容的容器

### HTML 语法

#### 合法元素

1. Element:<tagname>...</tagname>
2. TExtLtext
3. Comment: <!--comments-->
4. DocumentType: <!Doctype html>
5. ProcessingInstruction: <?a 1?>
6. CDATA:<[CDATA[]]>

#### 字符引用

- &#161
- &amp
- &lt
- &quot

## 浏览器API

### DOM API

1. Traversal iterator（废弃）
2. 节点部分
3. 事件部分
4. Range API

#### 节点API

- Node
  - Element：元素型节点，与标签相对应
    - HTMLElement
      - HTMLAnchorElement
      - HTMLAppletElement
      - HTMLAreaElement
      - HTMLAudioElement
      - HTMLBaseElement
      - HTMLBodyElement
      - ...
    - SVGElement
      - SVGAemelent
      - SVGAltGlyphElement
      - ...
  - Document:文档根节点
  - CharacterData：字符数据
    - Text：文本节点 - CDATASection：CDATA节点
    - Comment：注释
    - ProcessingInstruction：处理信息
  - DocumentFragment：文档片段
  - DocumentType：文档类型

导航类操作

- parentNode
- childNodes
- firstChild
- lastChild
- nextSibling
- previousSibling
- parentElement
- children
- firstElementChild
- lastElementChild
- nextElementSibling
- previousElementSibling

修改操作

- appendChild
- insertBefore
- removeChild
- replaceChild

高级操作

- compareDocumentPosition：用于比较两个节点中关系的函数
- contains：检查一个节点是否包含另一个节点的函数
- isEqualNode：检查两个节点是否完全相同，==
- isSameNode：检查两个节点是否是同一个节点，===
- cloneNode：复制一个节点，如果传入参数true，则会连同子元素做深拷贝。

#### 事件API

事件对象模型

target.addEventListener(type,listener [, options]);

target.addEventListener(type,listener [, useCapture]);

target.addEventListener(type,listener [, useCapture, wantsUntrusted]);

- options:
  - capture: true为捕获模式，false为冒泡模式
  - once
  - passive:会不会产生副作用，改变默认监听事件需改成false

先捕获再冒泡

捕获：从外至内计算事件发生在哪个元素上
冒泡：计算出发生的元素层层地向外触发，让元素去响应的过程。

```html
<div id='a'>
    <div id='b'>
    </div>
</div>
<script>
var a = document.getElementById("a");
var b = document.getElementById("b");
a.addEventlistener("click",function(){console.log("a")});
b.addEventlistener("click",function(){console.log("b")});
b.addEventlistener("click",function(){console.log("b1")}, true);
a.addEventlistener("click",function(){console.log("a1")}, true);
b.addEventlistener("click",function(){console.log("b3")}, true);
// 结果为 a1,b,b1,b3,a
</script>
```

#### Range API

一个问题

- 把一个元素所有的子元素逆序

1，2，3，4，5 => 5, 4, 3, 2, 1

```html
<div id='a'>
    <span>1</span>
    <p>2</p>
    <a>3</a>
    <div>4</div>
</div>

<script>
//不使用Range API，不知道自动remove
let element = document.getElementById("a");

function reverseChildren(element) {
    let children = Array.prototype.slice.call(element.childNodes);

    for(let child of children) {
        element.removeChild(child);
    }

    children.reverse();

    for(let child of children) {
        element.appendChild(child);
    }
}

reverseChildren(element);
</script>
```

```html
<div id='a'>
    <span>1</span>
    <p>2</p>
    <a>3</a>
    <div>4</div>
</div>

<script>
let element  = document.getElementById("a");
// childNodes 是一个 living collection， 从后往前循环，把最后一个元素挪掉，不会影响前面的元素
function reverseChildren(element) {
    var len = element.childNodes.length;
    while(len-- > 0) {
        element.appendChild(element.childNodes[len])
    }
}

reverseChildren(element);
</script>
```

Range API

- var range = new Range();
- range.setStart(element, 9);
- range.setEnd(element, 4);
- var range = document.getSelection().getRangeAt(0);
-  
- range.setStartBefore
- range.setEndBefore
- range.setStartAfter
- range.setEndAfter
- range.selectNode
- range.selectNodeContents
-  
- var fragment = range.extractContents()
- range.insertNode(document.createTextNode("aaaa"))

```html
<div id='a'>123<span style="background-color:pink;">456789</span>0123456789</div>
<script>
    let range = new Range();
    range.setStart(document.getElementById("a").childNodes[0], 3);
    range.setEnd(document.getElementById("a").childNodes[2], 3);
    range.extractContents();
</script>
```

```html
<div id='a'>
    <span>1</span>
    <p>2</p>
    <a>3</a>
    <div>4</div>
</div>

<script>
let element  = document.getElementById("a");

function reverseChildren(element) {
    let range = new Range();
    range.selectNodeContents(element);

    let fragment = range.extractContents();
    var l = fragment.childNodes.length;
    while(l-- > 0) {
        fragment.appendChild(fragment.childNodes[l]);
    }
    element.appendChild(fragment);
}

reverseChildren(element);
</script>
```

### CSSOM

```html
<style title="Hello">
a::before {
    color:red;
    content:"Hello";
}
</style>
<link rel="stylesheet" title="x" href="data:text/css,p%7bcolor:blue%7D">
<a>world</a>
<script>
document.styleSheets
</script>
```

- document.styleSheets[0].cssRules
- document.styleSheets[0].insertRule("p{color:pink;}", 0)
- document.styleSheets[0].removeRule(0)

window.getComputedStyle(elt, pseudoElt);

### CSSOM View

#### window API

- window.innerHeight, window.innerWidth *
- window.outerWidth, window.outerWidth
- window.devicePixelRatio  (DPR) *
- window.screen
  - window.screen.width
  - window.screen.height
  - window.screen.availWidth
  - window.screen.availHeight
- window.open("about:blank","_blank","width=100,height=100,left=100,right=100")
- moveTo(x, y)
- moveBy(x, y)
- resizeTo(x, y)
- resizeBy(x, y)

#### scroll 

- scrollTop
- scrollLeft
- scrollWidth
- scrollHeight
- scroll(x,y)
- scrollBy(x,y)
- scrollIntoView()
- window
  - scrollX
  - scrollY
  - scroll(x,y)
  - scrollBy(x,y)

#### layout

getClientRects()
getBoundingClientRect()

```html
<style>
    .x::before {
        content:"额外 额外 额外 额外 额外 ";
        background-color: pink;
    }
</style>
<div style="width:100px;height:100px;overflow:scroll;">
    文字<span class="x" style="background-color:lightblue">文字 文字 文字 文字 文字 文字 文字 文字</span>
</div>
<script>
    var x = document.getElementsByClassName("x")[0];
</script>
```

## 所有API

标准化组织

- khronos
  - WebGL
- ECMA
  - ECMAScript
- WHATWG
  - HTML
- W3C
  - webaudio
  - CG/WG