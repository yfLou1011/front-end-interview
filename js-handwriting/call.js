Function.prototype.myCall = function (context) {
  console.log("arguments: ", arguments);
  context = context || window;
  let fn = Symbol("fn");
  context[fn] = this; // 将当前函数绑定到 context 上

  // let args = [...arguments].slice(1);
  let args = Array.prototype.slice.call(arguments, 1);

  let result = context[fn](...args);
  delete context[fn];
  return result;
};
function Product(name, price) {
  this.name = name;
  this.price = price;
}
function Food(name, price) {
  Product.myCall(this, name, price);
  this.category = "food";
}
console.log(new Food("cheese", 5).name);

// Apply
Function.prototype.myApply = function (context, arr) {
  context = context || window;
  let fn = Symbol("fn");
  context[fn] = this;

  let result = context[fn](...arr);
  delete context[fn];
  return result;
};

function Product(name, price) {
  this.name = name;
  this.price = price;
}
function Food(name, price) {
  Product.myApply(this, [name, price]);
  this.category = "food";
}
console.log(new Food("cheese", 5).name);

// Bind
Function.prototype.myBind = function (context = window) {
  // 原型上添加mybind方法 this instanceof newf
  if (typeof this != "function") {
    throw new TypeError("this is not a function");
  }

  var args = Array.prototype.slice.call(arguments, 1); // 类数组转数组
  var self = this; // 调用的方法本身
  console.log("this: ", this);

  var F = function () {};
  F.prototype = this.prototype;
  var bound = function () {
    var bindArgs = Array.prototype.slice.call(arguments);
    return self.apply(
      this instanceof F ? this : context,
      args.concat(bindArgs)
    );
  };
  bound.prototype = new F();
  return bound;
};

var name = "window name";
var obj = {
  name: "obj name",
};
var fn = function () {
  console.log(this.name, [...arguments]);
};
fn(1, 2, 3, 4); // 直接执行，this指向window
fn.myBind(obj, 1, 2)(3, 4); // mybind改变this指向
fn.bind(obj, 1, 2)(3, 4); // 原生bind
