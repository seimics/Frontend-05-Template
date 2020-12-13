# 学习笔记

## 1.排版-根据浏览器属性进行排版  

准备工作：处理flexDirection和wrap相关的属性。  
重点：把weight, height, left, right, top, bottom的属性抽象成main cross相关的属性。

## 2.排版-收集元素进行  

分行算法：  

+ 根据主轴尺寸把元素分进行。  
+ 如果设置了no-wrap，则强行分配进第一行。  

## 3.排版-计算主轴

计算主轴方向：  

+ 找出所有Flex元素。  
+ 将主轴方向的剩余尺寸按比例分配给这些元素。  
+ 若剩余空间为负数，所有flex元素为0，等比压缩剩余元素。  

## 4.排版-计算交叉轴  

计算交叉轴方向：  

+ 根据每一行中最大元素尺寸计算行高  
+ 根据行高flex-align和item-align,确定元素具体位置  

## 5.渲染-绘制单个元素  

准备环境：npm install images  
绘制在一个viewport上进行  
与绘制相关的属性：background-color、border、 background-image等  

## 6.渲染-绘制DOM树  

+ 递归调用子元素的绘制方法完成DOM树的绘制  
+ 忽略一些不需要绘制的节点  
+ 实际浏览器中，文字绘制是难点，需要依赖字体库，在这里忽略了  
+ 实际浏览器中，还会对一些图层做compositing，这里也忽略了  
