
## 功能
1. 变量 @
```javascript
    @height: 10px;
    @width: @height + 10px;
    #header {
        width: @width;
        height: @height;
    }
   // 编译为
   #header {
       width: 20px;
       height: 10px;
   }
```
2. Mixins(混合)
- 属性(class & id)被其他规则所引用
```javascript
    .border {
        border-top: dotted 1px black;
        border-bottom: solid 2px black;
    }
    #menu a {
        .border()   // 使用方法
    }
```
3. 嵌套(Nesting)
```javascript
    #header {
        color: black;
    }
    #header .navigation {
        font-size: 12px;
    }
    #header .logo {
        width: 300px;
    }
    // 编译后
    #header {
        color: black;
        .navigation {
            font-size: 12px;
        }
        .logo {
            width: 300px;
        }
    }
```
4. 运算
   - 计算的结果以最左侧操作数的单位类型为准
   - 如果单位换算无效或失去意义，则忽略单位
```javascript
    // 所有操作数被转换成相同的单位
    @conversion-1: 5cm + 10mm; // 结果是 6cm
    @conversion-2: 2 - 3cm - 5mm; // 结果是 -1.5cm

    // conversion is impossible
    @incompatible-units: 2 + 5px - 3cm; // 结果是 4px

    // example with variables
    @base: 5%;
    @filler: @base * 2; // 结果是 10%
    @other: @base + @filler; // 结果是 15%
```
5. 转义
6. 函数
- 内置了多种函数用于转换颜色、处理字符串、算术运算等
```javascript
    @base: #f04615;
    @width: 0.5;

    .class {
        width: percentage(@width); // returns `50%`
        color: saturate(@base, 5%);
        background-color: spin(lighten(@base, 25%), 8);
    }
```