# 学习笔记

## 组件化基础

### 对象与组件

对象：

- Properties
- Methods
- Inherit

组件

- Properties
- Methods
- Inherit
- Attribute
- Config & State
- Event
- Lifecycle
- Children


attribute强调描述性，property强调从属关系

Attribute:
```html
<my-component attribute="v" />
myComponent.getAttribute("a")
myComponent.setAttribute("a","value");
```

Property:

```html
myComponent.a = "value";
```

```html
<input value="cute"/>
<script>
var input = document.getElementByTagName('input');//若property没有设置，则结果为attribute
input.value //cute
input.getAttribute('value');//cute
input.value='hello';//若value属性已经设置，则attribute不变，property变化，元素上实际的效果是property优先
input.value//hello
input.getAttribute('value');//cute
// attribute的value是默认值，property的value是值。
</script>
```

|Markup set|JS set|JS change|User Input Change|     |
|:--:|:--:|:--:|:--:|:--:|
|×|√|√|?|property|
|√|√|√|?|attribute|
|×|×|×|√|state|
|×|√|×|×|config|

