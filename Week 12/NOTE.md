# 学习笔记

## CSS排版

### 盒


### 正常流

- Block Container:里面有BFC的block
- Block-level Box:外边有BFC的block
- Block Box=Block Container+Block-level Box  里外都是BFC的盒子

### 正常流的行级排布

- line-top
- line-bottom
- text-bottom
- text-top
- baseline

### 正常流的块级排布

#### float与clear

float：浮动元素依附于正常流去定义。先把元素拍到页面的某个特定位置，朝float定义的方向挤一下，挤开元素需要的盒的位置，影响其余的行盒的尺寸  
clear：找一个干净的地方浮动。

### BFC合并

#### block container

- block
- inline-block
- table-cell
- flex item
- grid cell
- table-caption

#### Block-level Box

#### 设立BFC

- floats
- absolutely positioned elements
- block containers(such as inline-blocks, table-cells, and table-captions) that are not block boxes
  - flex items
  - grid cell
  - ......
- and blocks boxes with 'overflow' other than 'visible'


block box && overflow:visible
    - BFC合并float
    - BFC合并与边距折叠

### Flex排版

- 收集盒进行
  - 根据主轴尺寸把元素分进行
  - 设置no-wrap，强行分配进第一行
- 计算何在主轴方向的排布
  - 找出所有Flex元素
  - 把主轴方向的剩余尺寸按比例分配给这些元素
  - 若剩余空间为负数，所有flex元素为0，等比压缩剩余元素。
- 计算盒在交叉轴方向的排布
  - 根据每一行中最大最大元素尺寸计算行高
  - 根据行高flex-align和item-align，确定元素具体位置

## CSS动画与绘制

### Animation

@keyframes定义  
animation：使用

```html
<style>
@keyframe mykf
{
from {background:red;}
to {background:yellow;}
}

div
{
animation:mykf 5s ininite;
}
</style>
<div style='width:100px;height:100px;'>

</div>
```

- animation-name 时间名字
- animation-duration 动画时长
- animation-timing-function动画的时间曲线
- animation-delay 动画开始前的延迟
- animation-iteration-count 动画的播放次数
- animation-direction 动画的方向

```css
@keyframes mykf{
0%{top:0px;}
50%{top:30px;}
75%{top:10px;}
100%{top:0px;}
}
```

### transition

- transition-property 要变换的属性
- transition-duration 变换的时长
- transition-timing-function 时间曲线
- transition-delay 延迟

cubic-bezier 三次贝塞尔曲线

### 颜色

RGB与CMYK  
HSL与HSV

```html
<style>
.button {
    display: inline-block;
    outline: none;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    font: 14px/100% Arial, Helvetica, sans-serif;
    padding: .5em, 2em, .55em;
    text-shadow: 0 1px 1px rgba(0,0,0,.3);
    border-radius: .5em;
    box-shadow:0 1px 2px rgba(0,0,0,.2);
    color: white;
    border: solid 1px;
}
</style>
<div class="button orange">123</div>
<script>
var btn = document.querySelector(".button");
var h = 25;
setInterval(function(){
    h++;
    h = h % 360;
    btn.style.borderColor = `hsl(${h}, 95%, 45%)`
    btn.style.background = `linear-gradient(to bottom, hsl(${h},95%,54.1%), hsl(${h},95%,84.1%))`
},100);
</script>
```

### 绘制

#### 几何图形

- border
- box-shadow
- border-radius

#### 文字

- font
- text-decoration
- backfround-image

#### 复杂图形

加载SVG  
data uri
