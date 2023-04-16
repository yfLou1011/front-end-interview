
## 数据类型 / 判断方法
1. 7个基本类型 & 2个引用类型
2. symbol
   1. 防止命名冲突
   2. 模拟私有变量(常规方法无法遍历到, getOwnPropertySymbols()除外)

3. typeof(⚠️typeof null -> "object")
4. Object.prototype.toString.call() -> '[object Array]'
5. a instanceof B (判断B是否在A的原型链上)
```javascript
  // 用Object.prototype.toString.call()实现typeof
  function myTypeof(obj){
    return Object.prototype.toString.call(obj).slice(8,-1).toLowerCase()
  }
  // 实现instanceof
  function myInstanceof(obj, constructor){
    let left = obj.__proto__, right = constructor.prototype
    while(true){
      if(left == null)  return false
      else if(left == right) return true
      left = left.__ptoto__
    }
  }
```
***

## es6新特性
1. 声明: let, const
2. 解构赋值
3. 字符串扩展
4. 数值扩展
5. 对象扩展
   1. Object.assign()：合并对象(浅拷贝)，返回原对象
   2. Object.getPrototypeOf()：返回对象的原型对象
   3. Object.setPrototypeOf()：设置对象的原型对象
   4. __proto__：返回或设置对象的原型对象
6. 数组扩展
   1. 扩展运算符(...)
   2. Array.from()：转换具有Iterator接口的数据结构为真正数组，返回新数组
7. 函数扩展
8. Set
9.  Map
10. Proxy
11. Class
12. Module
13. Promise 
***

## 隐式转换 / 显示转换
1. 加法
   1. 当一侧为String类型，被识别为字符串拼接，并会优先将另一侧转换为字符串类型
   2. 当一侧为Number类型，另一侧为原始类型，则将原始类型转换为Number类型
   3. 当一侧为Number类型，另一侧为引用类型，将引用类型和Number类型转换成字符串后拼接
2. 减乘除
   1. 非Number -> Number
3. ==
   1. undefined == null
   2. NaN永远为false, 包括ta自己
   3. Boolean 和其他任何类型比较, Boolean 首先被转换为 Number 类型
   4. String和Number比较, 先将String转换为Number类型
   5. 原始类型和引用类型做比较时，引用类型会依照ToPrimitive规则转换为原始类型
      1. 先valueof()后toString()
      2. 如果还是没法得到一个原始类型，就会抛出 TypeError
   6. 练习题
  ```javascript
    1. [] == ![] -> true
    - 第一步，![] 会变成 false
    - 第二步，应用 规则2 ，题目变成： [] == 0
    - 第三步，应用 规则5 ，[]的valueOf是0，题目变成： 0 == 0
    - 所以， 答案是 true ！
    //
    2. [undefined] == false
    - 第一步，应用 规则5 ，[undefined]通过toString变成 '',题目变成  '' == false
    - 第二步，应用 规则2 ，题目变成  '' == 0
    - 第三步，应用 规则3 ，题目变成  0 == 0
    - 所以， 答案是 true ！
  ```
***

## 谈一谈作用域
1. 什么是作用域
   - 作用域是(某些特定部分中变量, 函数和对象)的可访问性
2. 作用域的作用
   - 隔离变量, 不同作用域下同名变量不会有冲突
3. 作用域链: 由当前作用域开始寻找变量, 如果找不到就像父级查找, 直到找到全局作用域
4. 作用域和执行上下文之间最大的区别: 
   - 执行上下文在运行时确定，随时可能改变；作用域在定义时就确定，并且不会改变
***

## 谈一谈执行上下文
1. 什么是执行上下文?
   - 执行上下文就是当前 JavaScript 代码被解析和执行时所在环境的抽象概念
   - JavaScript 中运行任何的代码都是在执行上下文中运行
2. 执行上下文总共有三种类型:
   1. 全局执行上下文
   2. 函数执行上下文
   3. eval执行上下文
3. 执行上下文的生命周期:
   - 创建阶段
     1. 创建词法环境(LexicalEnvironment)(可以近似看做函数声明提前+引入外部环境)
     2. 创建变量环境(VariableEnvironment)(存储的var声明变量）
     3. 确定this指向
   - 执行阶段
     1. 变量赋值
     2. 代码执行
   - 回收阶段 
     1. 执行上下文出栈
     2. 等待垃圾回收器回收变量 
***

## 创建对象的多种方式
1. Object.create()
2. 字面量
3. 工厂模式
   - 缺点: 不能识别是被哪一个工厂函数创造的
```javascript
  function Person(name, age) {
    const obj = {}
    obj.name = name
    obj.age = age
    return obj
  }

  const person = Person('dz', 23)
  const person1 = Person('dz1', 24)
  console.log(person instanceof Person) // -> false
  console.log(person1.__proto__ == person.__proto_) // -> false
```
4. 构造函数
   - 优点: 可识别是被哪个构造函数所创造的
   - 缺点: 方法不被共享, 被创建多次, 占用内存
 ```javascript
  function Person(name, age) {
    this.name = name
    this.age = age
    this.sayName = function(){
      console.log(this.name)
    }
  }
  const person = new Person('dz', 23)
  const person1 = new Person('dz1', 24)
  console.log(p1 instanceof Person, p2 instanceof Person)// --> true true
```
5. 原型链模式
   - 优点: 方法共享, 可以通过原型链找到
   - 缺点: 引用类型的属性被共享
6. 组合模式(构造函数模式+原型模式)
   - 优点
     - 方法共享, 可以通过原型链找到
     - 属性独立, 不会被其他对象修改

## 谈一谈模块化
- 模块化开发优点
  - 模块化开发中，通常一个文件就是一个模块，有自己的作用域，只向外暴露特定的变量和函数，并且可以按需加载。
  - 依赖自动加载，按需加载。
  - 提高代码复用率，方便进行代码的管理，使得代码管理更加清晰、规范。
  - 减少了命名冲突，消除全局变量。
  - 目前流行的js模块化规范有CommonJS、AMD、CMD以及ES6的模块系统
- 常见模块化规范
  - CommonJs (同步、Node.js)
    - module、exports、require、global
  - AMD (异步、RequireJS)
    - 推崇依赖前置、提前执行，加载完立即执行，因此加载顺序和书写顺序不一致（但是主逻辑一定在所有依赖加载完成后才执行）
  - CMD (异步、SeaJS)
    - 推崇依赖就近、延迟执行，所有依赖模块加载完成后进入主逻辑，因此加载顺序和书写顺序一致
    ```javascript
      /** AMD写法 **/
      define(["a", "b", "c", "d", "e", "f"], function(a, b, c, d, e, f) { 
          // 等于在最前面声明并初始化了要用到的所有模块
          a.doSomething();
          if (false) {
              // 即便没用到某个模块 b，但 b 还是提前执行了
              b.doSomething()
          } 
      });

      /** CMD写法 **/
      define(function(require, exports, module) {
          var a = require('./a'); //在需要时申明
          a.doSomething();
          if (false) {
              var b = require('./b');
              b.doSomething();
          }
      });

      /** sea.js **/
      // 定义模块 math.js
      define(function(require, exports, module) {
          var $ = require('jquery.js');
          var add = function(a,b){
              return a+b;
          }
          exports.add = add;
      });
      // 加载模块
      seajs.use(['math.js'], function(math){
          var sum = math.add(1+2);
      });
    ```
  - ES6 Module
    - export、import、export default
    - ES6的模块不是对象，import命令会被 JavaScript 引擎静态分析，在编译时就引入模块代码，而不是在代码运行时加载，所以无法实现条件加载。也正因为这个，使得静态分析成为可能
- ES6 模块与 CommonJS 模块的差异
  - CommonJS 模块输出的是一个值的拷贝(一旦输出一个值，模块内部的变化就影响不到这个值)
  - ES6 模块输出的是值的引用 
    - JS 引擎对脚本静态分析的时候, 遇到模块加载命令import, 就会生成一个只读引用
    - 等到脚本真正执行时, 再根据这个只读引用, 到被加载的那个模块里面去取值
  2. CommonJS 模块是运行时加载，ES6 模块是编译时输出接口
  3. CommonJs 是单个值导出，ES6 Module可以导出多个
  4. CommonJs 是动态语法可以写在判断里，ES6 Module 静态语法只能写在顶层
  5. CommonJs 的 this 是当前模块，ES6 Module的 this 是 undefined
***

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

***

## 事件委托/代理
利用冒泡的原理，把事件加到父元素或祖先元素上，触发执行效果
优点:
  1. 减少内存消耗，提高性能
  2. 动态绑定事件
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
***

## 进程 vs. 线程
- 进程是CPU资源分配的最小单位
- 线程是CPU任务调度和执行的最小单位
- 一个进程内可以包含多个线程
- 进程间通信很消耗资源；浏览器通常有进程保护，一个进程挂了不会影响其他进程
- 线程一旦挂了，整个进程就被阻碍了
***

## 事件流相关内容：
1. 为什么要有事件?
   - JavaScript与HTML之间的交互是通过事件实现
2. 什么是事件?
   - 文档或浏览器窗口中发生的一些特定的交互瞬间
3. 什么是事件流
   - 页面接受事件的顺序 (IE: 捕获 / Netscape: 冒泡 / W3C:先捕获后冒泡)
   - 三个阶段: 事件捕获 -> 目标阶段 -> 事件冒泡
   - 三种方式: DOM0 / DOM2 / IE
4. 什么是事件捕获
5. 什么是事件冒泡
6. DOM事件流是怎么一回事?
   - DOM2 Events 规范规定事件流分为3个阶段: 事件捕获、到达目标、事件冒泡(只有 IE8 以及更早的浏览器不支持)
***

## 事件处理程序相关：
1. 什么是 HTML 事件处理程序
  ```html
    <input type="button" value="click me" onclick="console.log('click')" />
  ```
2. 什么是 DOM0 事件处理程序 -> el.onclick=function(){}
   - 给元素的事件行为绑定方法，这些方法都是在当前元素事件行为的冒泡阶段(或者目标阶段)执行的
   - 缺点: 同一个DOM元素只能绑定一个事件
  ```javascript
    const btn = document.getElementById("myBtn");
    btn.onclick = function(){
      console.log('Clicked')
    }
  ```
3. 什么是 DOM2 事件处理程序 -> el.addEventListener(event-name, callback, useCapture)
  - 优点: 
    1. 可以给一个元素添加多个事件处理程序，并按添加的顺序触发
    2. 第三个参数可以用来指定 捕获or冒泡
  ```javascript
    var btn = document.getElementById('btn');
    btn.addEventListener("click", test, false);
    function test(e){
      e = e || window.event;
        alert((e.target || e.srcElement).innerHTML);
        btn.removeEventListener("click", test)
    }
  ```
4. addEventListener()第三个参数 
  - useCapture 详解
  ```javascript
    target.addEventListener(type, listener, useCapture, wantsUntrusted );  // Gecko/Mozilla only
  ```
5. IE 事件处理程序
   - attachEvent()和detachEvent() 
  ```javascript
    const btn = document.getElementById("myBtn");
    btn.attachEvent("onclick", function(){
      console.log("Clicked");
    })
  ```
6. 四者有什么区别
***

https://juejin.cn/post/6844903824692346893
https://juejin.cn/post/6914600144621027336#heading-6

## 事件对象相关内容：
1. DOM 事件对象
  - preventDefault()
  - topPropagation()
      - 并不是所有事件都是冒泡的：🌰 scroll
2. IE 事件对象
***

## 怎么解决滚动穿透问题
  - ❎ addEventListener()第三个参数设置为 true
  - ❎ stopPropagation()阻止冒泡
  - ✅ preventDefault 阻止默认事件
  - ✅ 给外层元素设置 overflow：hidden
***

## ES5和ES6的继承的区别
- ES5是先创建**子类的实例对象**, 再执行父类的构造函数( Parent.call(Child) 将父类的方法添加到this)
- ES6是先创造**父类的实例对象**, 再用子类的构造函数修改this(因此必须调用super方法)
***

## 用setTimeout实现SetInterval
```javascript
  let count = 0
  let timerId = null
  timerId = setTimeout(function run(){
      console.log('count = ', count)
      if(count == 3){
          clearTimeout(timerId)
          return
      }
      count += 1
      timerId = setTimeout(run, 1000)
  }, 1000)
```


## Map vs WeakMap, Set vs WeakSet
https://juejin.cn/post/6901098126539489288#heading-24
1. Map
   - Map 数据结构. 它类似于对象, 也是键值对的集合, 但是“键”的范围不限于字符串, 各种类型的值（包括对象）都可以当作键
   - 创建
    ```javascript
      const map = new Map([
        ['name', '张三'],
        ['title', 'Author']
      ]);

      map.size // 2, Map 结构的成员总数
      map.get('name') // "张三"
      map.get('title') // "Author"

      typeof map;                          // "object"
      map instanceof Object;               // true
      Object.prototype.toString.call(map); // "[object Map]"
    ```
   - 操作方法
    ```javascript
      set(key, value) ：设置键值名，返回整个 Map 结构
      get(key): 读取key对应的键值，如果找不到key，返回undefined
      has(key): 表示某个键是否在当前 Map 对象之中
      delete(key): 成功删除某个键，返回true，否则返回 false
      clear(): 清除所有成员，没有返回值
    ```
   - 遍历方法
    ```javascript
      keys()：返回键名的遍历器。
      values()：返回键值的遍历器。
      entries()：返回所有成员的遍历器。
      forEach()：遍历 Map 的所有成员。
    ```
    - 和WeakMap的区别
    ```javascript
        WeakMap 只接受对象作为键名（null除外），不接受其他类型的值作为键名
        WeakMap 的键名所指向的对象，不计入垃圾回收机制
        WeakMap 没有遍历操作
    ```
***

## 如何实现私有变量
1. 闭包
2. Symbol
3. WeakMap
***

## async await vs Generator
1. 内置执行器
2. 更语义化
3. 更广的适用性
   1. await后可接 Promise / 基础数据类型 (Number，string，boolean，但这时等同于同步操作)
   2. yield后可接 Thunk函数 / Promise对象