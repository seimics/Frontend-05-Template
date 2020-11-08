# 学习笔记 
## proxy的基本用法
1. 在Proxy对象里设置没有的属性也能触发set的值。可以拦截内置函数的操作和原生操作并改变他的行为。
	使用proxy后，对象行为的可预测性会降低。 
	
2. proxy的应用 - 模仿Vue的reactive的实现原理
加入set与get
```
	function reactive() {
        return new Proxy(object, {
            set(obj, prop, val){
                obj[prop] = val;
                console.log(obj, prop, val);
                return obj[prop];
            },
            get(obj, prop){
                console.log(obj, prop);
                return obj[prop];
            }
        });
    }
```

3. 使用全局变量储存callbacks回调effect()
```
effect(() => {
        console.log(po.a);
    });

    function effect(callback) {
        callbacks.push(callback);
    }
	
	                for (let callback of callbacks) {
                    callback();
                }
```

4.连接reactive和reactive，获取函数能访问到的所有变量。
vue调用这个函数，在reactive的get里获取object属性

5. proxy和双向绑定
问题：po.a.b访问不到 
解决方法：当检测到get到的prop是对象时，进行处理，return reactive（obj[prop])
使用全局变量缓存reactive

6. proxy 双向绑定
```
effect(() => {
        document.getElementById("r").value = po.r;
    });

  document.getElementsById("r").addEventListener("input", event => po.r = event.target.value);
```

7. 实现拖拽
```
    let dragable = document.getElementById("dragable");
    dragable.addEventListener("mousedown", function(event) {
        let up = ()=> {
            document.removeEventListener("mouseup",up);
            document.removeEventListener("mousemove", move);
        }
        let move = event=> {
            console.log(event);
        }
        document.addEventListener("mouseup", up);
        document.addEventListener("mousemove", move);
    })
	```

8. 使用Range实现正常流拖拽


```
 for(let i = 0; i < container.childNodes[0].textContent.length; i++) {
        let range = document.createRange();
        range.setStart(container.childNodes[0], i);
        range.setEnd(container.childNodes[0], i);
        //console.log(range.getBoundingClientRect());
        ranges.push(range);
    }
    function getNearest(x, y) {
        let min = Infinity;
        let nearest = null;
        for(let range of ranges){
            let rect = range.getBoundingClientRect()
            let dist = (rect.x - x)** 2 + (rect.y - y) ** 2;
            if(dist < min) {
                nearest = range;
                min = dist;
            }
        }
        return nearest;
    }
    document.addEventListener("selectstart", event=>event.preventDefault());
	```