
## CommonJS vs. AMD vs. CMD vs. ES6 Module 比较
- 模块化开发优点
  - 模块化开发中，通常一个文件就是一个模块，有自己的作用域，只向外暴露特定的变量和函数，并且可以按需加载。
  - 依赖自动加载，按需加载。
  - 提高代码复用率，方便进行代码的管理，使得代码管理更加清晰、规范。
  - 减少了命名冲突，消除全局变量。
  - 目前流行的js模块化规范有CommonJS、AMD、CMD以及ES6的模块系统
- 常见模块化规范
  - CommonJs (Node.js)
  - AMD (RequireJS)
  - CMD (SeaJS)

## 事件绑定
事件绑定要想让 JavaScript 对用户的操作作出响应，首先要对 DOM 元素绑定事件处理函数
- 在JavaScript中，有三种常用的绑定事件的方法：
  - 在DOM元素中直接绑定: onclick、onmouseover、onmouseout、onmousedown等
    ```javascript
    <input type="button" value="按钮" onclick="alert(1);">
    ```
  - 在JavaScript代码中绑定；
    ```javascript
    <input type="button" value="按钮">
    <script type="text/javascript">
        var bt = document.getElementsBytagname("input")[0];
        bt.onclick = function(){
            alert(2)
        }
    </script>
    ```
  - 绑定事件监听函数(addEventListener)
    ```javascript
    <input type="button" value="按钮">
    <script type="text/javascript">
        var bt = document.getElementsBytagname("input")[0];
        bt.addEventListener("click", function(){
            alert(1)
        })
        bt.addEventListener("click", function(){
            alert(2)
        })
    </script>
    ```
    - addEventListener的三个参数：
      - 事件类型，不需要添加上on
      - 事件函数
      - 是否捕获（布尔值），默认是false，即不捕获，那就是冒泡。


## 事件监听
捕获阶段、目标阶段、冒泡阶段
- W3C规范
```javascript
element.addEventListener(event, function, useCapture)
```
- IE标准
```javascript
element.attachEvent(event, function)
```

## 事件委托
利用冒泡的原理，把事件加到父元素或祖先元素上，触发执行效果
```javascript
var btn6 = document.getElementById("btn6");
document.onclick = function(event){
  event = event || window.event;
  var target = event.target || event.srcElement;
  if(target == btn6){
    alert(btn5.value);
  }
}
```