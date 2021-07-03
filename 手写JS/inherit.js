// 1. 原型链继承
//     * 基本的思路: 子类无法定义自己的方法和属性
	function Parent() {
    		this.colors = ['black', 'white']
	}
	Parent.prototype.getColor = function() {
    		return this.colors
	}
	function Child() {}
	Child.prototype =  new Parent()
	// 存在的问题：
    // - 问题1：原型中包含的引用类型属性将被所有实例共享
    // - 问题2：子类在实例化的时候不能给父类构造函数传参


// 2. 构造函数继承
//     * 基本的思路: 方法和属性都定义在构造函数中
	function Parent(name) {
   	 	this.name = name
		this.getName = function() {
				return this.name
		}
	}
	function Child(name) {
		Parent.call(this, name)
	}
	// Child.prototype =  new Parent()
	// 解决了原型链继承带来的2个问题
	// 存在的问题：
    // - 问题1：引用类型共享问题以及传参问题
    // - 问题2：由于方法必须定义在构造函数中，所以会导致每次创建子类实例都会创建一遍方法


// 3. 组合继承
//     * 基本的思路: 方法定义在原型链上，属性在构造函数中
	function Parent(name) {
		this.name = name
		this.colors = ['black', 'white']
	}
	Parent.prototype.getName = function() {
		return this.name
	}
	function Child(name) {
		Parent.call(this, name)
		this.age = age
	}
	Child.prototype =  new Parent()	
    Child.prototype.constructor = Child 
    // 存在的问题：
    // - 问题1：调用了 2 次父类构造函数，第一次是在 new Parent()，第二次是在 Parent.call() 这里
	
// 4. Object.create()  寄生式组合继承
//     * 基本的思路: 通过创建空函数 F 获取父类原型的副本
	function Parent(name) {
		this.name = name
		this.colors = ['black', 'white']
	}
	Parent.prototype.getName = function() {
    		return this.name
	}
	function Child(name) {
		Parent.call(this, name)
		this.age = age
	}

	Child.prototype = Object.create(Parent.prototype)
	Child.prototype.constructor = Child 
	// 优点: 
    // - 1. 只调用一次父类构造函数	
    // - 2. Child可以向Parent传参
    // - 3. 父类方法可以复用
    // - 4. 父类的引用属性不会被共享

// 5. ES6的Class继承
// ES6中实现的Person类
class Parent {
	constructor(name, age) {
	  // 实例对象的属性
	  this.name = name
	  this.age = age
	  // 实例对象的方法
	  this.getName = () => {
		return this.name
	  }
	}
  
	// Parent类原型对象的方法
	getAge() {
	  return this.age
	}
}
  