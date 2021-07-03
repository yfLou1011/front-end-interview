
## JavaScript 和 TypeScript 有什么区别
1. TS是JS的超集, TS通过编译可转换为JS
2. TS通过**类型注解**提供编译时的静态类型检查
3. TS引入了模块概念, 可以把声明、数据、函数、类封装在模块中
4. 模块、泛型、接口

## TS的基础类型
1. boolean / string / number / array
```javascript
let isDone: boolean = false;    // ES5：var isDone = false;

let count: number = 10;         // ES5：var count = 10;

let name: string = "Semliker";  // ES5：var name = 'Semlinker';

let list: number[] = [1, 2, 3]; // ES5：var list = [1,2,3];

let list: Array<number> = [1, 2, 3]; // Array<number>泛型语法
// ES5：var list = [1,2,3];
```
## 
1. 类型注解: 一种轻量级的为函数或变量添加约束的方式
```javascript
    function greeter(person: string) {
        return "Hello, " + person;
    }
```
2. 接口
```javascript
    interface Person {
        firstName: string;
        lastName: string;
    }

    function greeter(person: Person) {
        return "Hello, " + person.firstName + " " + person.lastName;
    }

    let user = { firstName: "Jane", lastName: "User" };

    document.body.innerHTML = greeter(user);
```
3. 类


## TS的优点
1. bug 显著减少，之前会遇到的 xxx 为空的问题几乎不会出现了，类型相关 bug 直线减少。
2. 应用更可控，当你需要约束某些代码的时候，用类型就能很简单地做到，比如 React 里强制写 diaplayName 方便调试。
3. 查文档更方便，以前要打开浏览器看文档，现在直接查看定义就基本明白了


## 在进行项目选型时，什么因素会让你选择 TypeScript 

