# 学习笔记

## CSS2.1  
<https://www.w3.org/TR/CSS21/grammar.html#q25.0>  
<https://www.w3.org/TR/css-syntax-3>

## CSS总体结构

+ @charset
+ @import
+ rules
  + @media
  + @page
  + rule

## CSS @规则的研究

- @charset: https://www.w3.org/TR/css-syntax-3/
- @import: https://www.w3.org/TR/css-cascade-4/
- @media: https://www.w3.org/TR/css3-conditional/
- @page: https://www.w3.org/TR/css-page-3/
- @counter-style: https://www.w3.org/TR/css-counter-styles-3/
- @keyframes: https://www.w3.org/TR/css-animations-1/
- @fontface: https://www.w3.org/TR/css-fonts-3/
- @supports: https://www.w3.org/TR/css3-conditional/
- @namespace: https://www.w3.org/TR/css-namespaces-3/

## CSS规则的结构

### CSS规则

+ 选择器
+ 声明
  + Key
  + Value

```css
div{
    background-color:blue;
}
```

+ Selector
  + https://www.w3.org/TR/selectors-3/
  + https://www.w3.org/TR/selectors-4/
+ Key
  + Properties
  + Variables: https://www.w3.org/TR/css-variables/
+ Value
  + https://www.w3.org/TR/css-values-4/

## 选择器语法

### 简单选择器

+ **
+ div svg|a
+ .cls
+ #id
+ [attr=value]
+ :hover
+ ::before

### 复合选择器

+ <简单选择器><简单选择器><简单选择器>
+ *或者div必须卸载最前面

### 复杂选择器

+ <复合选择器><sp><复合选择器>
+ <复合选择器>">"<复合选择器>
+ <复合选择器>"~"<复合选择器>
+ <复合选择器>"+"<复合选择器>
+ <复合选择器>"||"<复合选择器>

## 选择器优先级

1. 计算ID选择器的数量（=a） p[1]
2. 计算类选择器、属性选择器和伪类选择器的数量 (=b) p[2]
3. 计算类型选择器和伪元素的数量(=c) p[3]
4. 忽略通用选择器

```css
*    /* a=0 b=0 c=0 -> spec = 0 */
li    /* a=0 b=0 c=1 -> spec = 1 */
ul li    /* a=0 b=0 c=2 -> spec = 2 */
ul ol+li    /* a=0 b=0 c=3 -> spec = 3 */
h1 + *[rel=up]    /* a=0 b=1 c=1 -> spec = 11 */
ul ol li.red    /* a=0 b=1 c=3 -> spec = 13 */
li.red.level    /* a=0 b=2 c=1 -> spec = 21 */
#x34y    /* a=1 b=0 c=0 -> spec = 100 */
#s12:not(foo)    /* a=1 b=0 c=1 -> spec = 101 */

div#a.b .c[id=x] /*[0 1 3 1]*/
#a:not(#b)  /*[0 2 0 0] */
*.a   /*[0 0 1 0] */
div.a /*[0 0 1 1]*/
```

## 伪类

+ 链接/行为
  + :any-link
  + :link:visited
  + :hover
  + :active
  + :focus
  + :target

+ 树结构
  + :empty
  + :nth-child()
  + :nth-last-child()
  + :first-child :last-child :only-child

+ 逻辑型
  + :not伪类
  + :where :has

## 伪元素

+ ::before
+ ::after
+ ::first-line
+ ::first-letter

### first-line与first-letter可用属性

+ first-line
  + font系列
  + color系列
  + background系列
  + word-spacing系列
  + letter-spacing系列
  + text-decoration系列
  + text-transform系列
  + line-height系列

+ first-letter
  + font系列
  + color系列
  + background系列
  + word-spacing系列
  + letter-spacing系列
  + text-decoration系列
  + text-transform系列
  + line-height系列
  + float
  + vertical-align
  + 盒模型系列： margin，padding，border
