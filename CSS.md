
## CSS3新特性
https://segmentfault.com/a/1190000010780991
1. 文字效果: word-wrap / text-shadow / text-decoration
2. box-sizing(盒模型)
3. 渐变
4. border: border-redius / box-shadow 
5. transition / animation
***

## 哪些情况会引起回流
1. 页面首次渲染
2. 浏览器窗口大小发生改变
3. 元素尺寸或位置发生改变
4. 元素内容变化（文字数量或图片大小等等）
5. 元素字体大小变化
6. 添加或者删除可见的DOM元素
7. 激活CSS伪类（例如：:hover）
8. 查询某些属性或调用某些方法
```javascript
   clientWidth、clientHeight、clientTop、clientLeft
   offsetWidth、offsetHeight、offsetTop、offsetLeft
   scrollWidth、scrollHeight、scrollTop、scrollLeft
   scrollIntoView()、scrollIntoViewIfNeeded()
   getComputedStyle()
   getBoundingClientRect()
   scrollTo()
```
***

## 什么情况会引起重绘
1. color
2. background-color
3. visibility
***

## 如何尽量减少回流(reflow)
1. 用visibility代替display:none
2. 尽量使用css简写(border-style + border-width + border-color用border替代)
3. 避免使用table布局
4. dom操作时尽量批量操作
***

## float和position:absoulte的区别
1. 文档流: 相对于盒子模型讲的; 符合HTML中标签本身含义，遵循**自上而下，从左至右**的布局
2. 文本流: 相当于HTML讲的
3. float仅仅使元素脱离文档流, 其他的盒子元素会无视浮动元素所占的空间, 但文字并不会无视ta(实现文字环绕)
4. absolute/fixed 既脱离文档流也脱离文本流, 其他盒子&文字都会无视ta, 直接覆盖掉
***

## position有哪些属性
1. static: 在文档常规流中当前的布局位置, 此时 top, right, bottom, left 和 z-index 属性无效
2. relative
3. absolute: 
   - 元素会被移出文档流, 相对于最近的非 static 定位祖先元素的偏移
   - 绝对定位的元素可以设置外边距(margins), 且不会与其他边距合并
4. fixed: 
   - 元素会被移出文档流, 相对于屏幕视口(viewport)的位置来指定元素位置
   - 当元素祖先的 transform, perspective 或 filter 属性非 none 时，容器由视口改为该祖先
   - 总会创建新的层叠上下文
5. sticky
   - 元素根据正常文档流进行定位, 会“固定”在离它最近的一个拥有“滚动机制”的祖先上(当该祖先的overflow是hidden,scroll,auto或overlay时)
   - 总会创建新的层叠上下文（stacking context）
***

## 层叠上下文
1. 什么事层叠上下文
   - HTML 元素沿着其相对于用户的一条虚构的 z 轴排开, 层叠上下文就是对这些 HTML 元素的一个三维构想
2. 如何触发
   - 文档根元素（<html>）
   - position 值为 absolute（绝对定位）或 relative（相对定位）且 z-index 值不为 auto 的元素
   - position 值为 fixed（固定定位）或 sticky（粘滞定位）的元素
   - flex容器的子元素，且 z-index 值不为auto
   - grid (grid) 容器的子元素，且 z-index 值不为 auto
   - opacity 属性值小于 1 的元素
3. **其子级层叠上下文的 z-index 值只在父级中才有意义**
***

## CSS选择器
1. class选择器(.)
2. id选择器(#)
3. 属性选择器([]):
   🌰
   ```html
      <style type="text/css">
         a[href][title] {
            color:red;
         }
      </style>

      <a title="W3School Home" href="http://w3school.com.cn">W3School</a>  // red
      <a href="http://w3school.com.cn">W3School</a>   // 不满足[title] 无效
   ```
4. 相邻兄弟选择器(+): 选择紧挨在另一元素后的元素，且二者有相同父元素，强调**紧挨**
   🌰
   ```html
      <style type="text/css">
         h2+p {color: red; }
      </style>

      <p>这里是第一个p标签</p>
      <p>这里是第二个p标签</p>
      <h2>标题H2</h2>
      <p>这里是第三个p标签</p>  // red
      <p>这里是第四个p标签</p>
      <p>这里是第五个p标签</p>
   ```
   🌰
   ```html
      <style type="text/css">
         li + li {color:red;}
      </style>

      <ul>
         <li>List item 1</li>
         <li>List item 2</li> // red
         <li>List item 3</li> // red
      </ul>
      <ol>
         <li>List item 1</li>
         <li>List item 2</li> // red
         <li>List item 3</li> // red
      </ol>
   ```
5. 兄弟选择器(~): 表示某元素后所有同级的指定元素，强调**所有的**
   🌰
   ```html
      <style type="text/css">
         h2~p {color: red; }
      </style>

      <p>这里是第一个p标签</p>
      <p>这里是第二个p标签</p>
      <h2>标题H2</h2>
      <p>这里是第三个p标签</p>  // red
      <p>这里是第四个p标签</p>  // red
      <p>这里是第五个p标签</p>  // red
   ```
6. 子代选择器(>): 只匹配那些作为第一个元素的直接后代(子元素)的第二元素，强调**子代**
   🌰
   ```html
      <style type="text/css">
         h1 > strong {color:red;}
      </style>

      <h1>This is <strong>very</strong> <strong>very</strong> important.</h1> // 两个very red
      <h1>This is <em>really <strong>very</strong></em> important.</h1> // 非直接子代 故不起作用
   ```
7. 后代选择器():  可穿透
   🌰
   ```html
      <style type="text/css">
         ul em {color:red; font-weight:bold;}
      </style>
      <ul>
         <li>List item 1
            <ol>
               <li>List item 1-1</li>
               <li>List item 1-2</li>
               <li>List item 1-3
               <ol>
                  <li>List item 1-3-1</li>
                  <li>List item <em>1-3-2</em></li>   // red
                  <li>List item 1-3-3</li>
               </ol>
               </li>
               <li>List item 1-4</li>
            </ol>
         </li>
         <li>List item 2</li>
         <li>List item 3</li>
      </ul>
   ```