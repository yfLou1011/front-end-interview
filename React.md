# React

<!-- MVVM
数据绑定
状态管理
组件通信
computed/watch 原理
React Hook
React Hoc/Vue mixin
Vue 和 React 有什么不同 -->

## v16.4的新版生命周期
1. 挂载阶段
    1. constructor
       1. 初始化state
       2. 对自定义方法进行绑定
    2. getDerivedStateFromProps(静态函数，不能使用this)
    ```javascript
    class Example extends React.Component {
        static getDerivedStateFromProps(props, state) {
            //根据 nextProps 和 prevState 计算出预期的状态改变，返回结果会被送给 setState
            // ...
        }
    }
    ```
    3. render
    4. componentDidMount
       1. 依赖于 DOM 节点的初始化应该放在这里
       2. 通过网络请求获取数据，此处是实例化请求的好地方

2. 更新阶段
   1. getDerivedStateFromProps
   2. shouldComponentUpdate(prevProps, nextProps) -> (性能优化)
   3. render
   4. getSnapshotBeforeUpdate
3. 卸载阶段
   1. componentWillUnmount

## React 中的 setState 为什么需要异步操作？
- 为了保持一致性；因为props是异步的，父组件re-render的时候，传入子组件的props才发生变化
- 因此为了保持一致，state也不直接更新，在flush的时候才更新
- 将state的更新延缓到最后**批量合并**再去渲染对于应用的**性能优化**是有极大好处

## setState什么时候是异步的？
- 在setTimeout和js原生事件中: 
  - 因为setState本身并不是真的异步，只是模拟了异步；
  - 在React中用一个标识(isBatchingUpdates)去判断setState是直接执行还是暂存入队列
  - 在合成事件和生命周期中，React可控，因此isBatchingUpdates为true -> 异步

## 从setState到渲染，发生了什么
1. 当我们调用 setState 时，state 内部状态发生变动
2. 再次调用 render 方法就会生成一个新的虚拟 DOM 树
3. 使用 diff 方法计算出新老虚拟 DOM 发送变化的部分
4. 最后使用 patch 方法，将变动渲染到视图中

## 虚拟DOM
- 是JS的Object对象模拟DOM中的节点, 拥有3个属性(tag/props/children)
- 然后再通过特定的render方法将其渲染成真实的DOM节点
```javascript
{
  tag: 'div',
  props: {
    id: 'app'
  },
  chidren: [
    {
      tag: 'p',
      props: {
        className: 'text'
      },
      chidren: [
        'hello world!!!'
      ]
    }
  ]
}
```

## diff算法如何实现优化
https://zhuanlan.zhihu.com/p/20346379?refer=purerender
https://juejin.cn/post/6844903870229905422
#### 计算一棵树形结构转换成另一棵树形结构的最少操作，是一个复杂且值得研究的问题。
- React 通过制定大胆的 diff 策略，将 O(n3) 复杂度的问题转换成 O(n) 复杂度的问题
1. 优化策略a: tree diff
   - **分层求异**策略: 两棵树仅会对同一层的节点进行比较
   - 跨层级的操作diff只能删除&新增

2. 优化策略b: component diff
   - 按照原策略继续比较 virtual DOM tree

3. 优化策略c: element diff
    - 同层级的子节点都**设置唯一key值**，用以区分
    - 当节点处于同一层级时，React diff 提供了三种节点操作，分别为：INSERT_MARKUP（插入）、MOVE_EXISTING（移动）和 REMOVE_NODE（删除）。

- 对比同一类型的元素，仅对比&更新不同的属性，如style更新时
```javascript
<div style={{color: 'red', fontWeight: 'bold'}} />
<div style={{color: 'green', fontWeight: 'bold'}} />
```
- 对比不同类型的元素
  - 当根节点为不同类型的元素时，React 会拆卸原有的树并且建立起新的树
    - 卸载时调用 componentWillUnmount() => UNSAFE_componentWillMount() => componentDidMount
```javascript
<div>
    <Counter />
</div>
<span>  // 根节点发生改变
    <Counter />
</span>
```
- 对比同类型的组件
  - 按照原策略继续比较 virtual DOM tree

## Render-性能优化
1. 什么时候执行
   1. 状态更新时
      1. class只要调用setState就会触发render
      2. function状态值改变才会触发render
   2. 组件重新渲染时
2. 执行时发生了什么
   1. diffing
   2. Reconciliation
3. 如何优化render()
   1. 特定的状态值放到更低的层级或组件(子组件状态更新->父组件render->所有子组件render(diffing阶段会执行) )
   2. 合并状态更新
   3. React.memo() || PureComponent
    ```javascript
      // 普通写法
      function Bar({ name }) {
        return <h1>{name}</h1>;
      }
      // 使用React.memo
      const Bar = React.memo(function Bar({name}) {
        return <h1>{name}</h1>;
      });
      // 使用PureComponent
      class Bar extends React.PureComponent {
        render() {
          return <h1>{name}</h1>;
        }
      }
    ```
    4. 控制更新: 使用React.memo, 我们可以传递一个比较函数作为第二个参数
    ```javascript
      const Bar = React.memo(
        function Bar({ name: { first, last } }) {
          console.log("update");
          return (
            <h1>
              {first} {last}
            </h1>
          );
        },
        // 传入第二个参数
        (prevProps, nextProps) =>
          prevProps.name.first === nextProps.name.first &&
          prevProps.name.last === nextProps.name.last
      );
    ```

  ## React.memo() || PureComponent 原理
  - 每次更新的时候(包括状态更新或上层组件重新渲染), 它们就会在新props、state和旧props、state之间对key和value进行浅比较
  - 浅比较是个严格相等的检查，如果检测到差异，render 就会执行
  - 对于引用类型, 存在value相同key不同的情况 -> 引发资源额外消耗
  ```javascript
    // 基本类型的比较
    shallowCompare({ name: 'bar'}, { name: 'bar'}); // output: true
    shallowCompare({ name: 'bar'}, { name: 'bar1'}); // output: false
    
    // 引用类型的比较
    shallowCompare(
        { name: {first: 'John', last: 'Schilling'}},
			  { name: {first: 'John', last: 'Schilling'}}
    ); // output: false -> 对象的引用是不同的
  ```



## 高阶组件？
- 一种设计模式; 入参为组件，返回值为新组件的函数
- 缺点:
  1. 高阶组件之间组合性差(多层嵌套 withAuth(withRouter(withUserStatus(UserDetail)))  )
  2. 容易发生wrapper hell
- 解决: 需要一个新的**复用组件之间非UI逻辑**的方法 -- hook


## Hook
- Hook 是一些可以让你在函数组件里“钩入” React state 及生命周期等特性的函数
- 为React提供更好的共享状态逻辑
1. 用于在函数组件中引入状态管理和生命周期方法
2. 取代高阶组件和render props来实现抽象和可重用性

## 常用的Hooks
1. useState(), 状态钩子, 为函数组建提供内部状态
2. useEffect(), 副作用钩子, 接受2个参数; 第一个是异步操作, 第二个是数组(接受该钩子执行的依赖项)
3. useContext(), 
4. useRef()
5. useReducer()

## 受控组件
- 在处理**表单**时的一种技术，表单元素通常维护它们自己的状态，而react则在组件的状态属性中维护状态
- 将两者结合起来控制输入表单，就称为受控组件
- 在受控组件表单中，数据由React组件处理
```javascript
    constructor(props) {
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    <input type="text" value={this.state.value} onChange={this.handleChange} />
```

## 非受控组件
- 通过使用Ref来处理表单数据。
- 在非受控组件中，Ref用于直接从DOM访问表单值，而不是事件处理程序。
```javascript
constructor(props) {
    this.input = React.createRef();
}
<Form.Control type="text" placeholder="Todo Item" ref={this.input}/>
{this.input.current.value}
```

## Props 和 State
- Props 是只读属性，传递给组件以呈现UI和状态

## React Fiber？
1. 是什么 / 解决什么问题
   - 当组件树很大的时候，更新耗时久；主线程无暇去处理一些紧急事件 -> 界面卡顿，很不好的用户体验
   - 把一个耗时长的任务分成很多小片，每一个小片的运行时间很短
   - 每个小片执行完之后，都给其他任务一个执行的机会，这样唯一的线程就不会被独占
   - 维护每一个分片的数据结构，就是Fiber。
2. 怎么用
   - React Fiber一个更新过程被分为两个阶段(Phase)第一个阶段Reconciliation Phase和第二阶段Commit Phase
   - 在第一阶段Reconciliation Phase，React Fiber会找出需要更新哪些DOM，这个阶段是可以被打断的
     1. componentWillMount
     2. componentWillReceiveProps
     3. shouldComponentUpdate
     4. componentWillUpdate
   - 但是到了第二阶段Commit Phase，那就一鼓作气把DOM更新完，绝不会被打断
     1. componentDidMount
     2. componentDidUpdate
     3. componentWillUnmount
