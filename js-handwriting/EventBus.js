/**
 * 1. 使用$on订阅事件
 * 2. 使用$emit发布事件
 * 3. $emit发布事件可以传参
 * 4. 实现$off取消订阅
 * 5. 实现$once执行一次
 */

class EventBus {
  constructor() {
    this.cacheMap = new Map();
  }

  $on(event, cb) {
    if (!this.cacheMap.has(event)) {
      this.cacheMap.set(event, []);
    }
    let fns = this.cacheMap.get(event);
    fns.push(cb);
    this.cacheMap.set(event, fns);
  }

  $emit(event, isOnce, ...args) {
    if (this.cacheMap.has(event)) {
      this.cacheMap.get(event).forEach((fn) => {
        fn.apply(this, args);
      });
    }
    if (isOnce) {
      this.cacheMap.delete(event);
    }
  }

  $off(event, name) {
    if (this.cacheMap.has(event)) {
      let fns = this.cacheMap.get(event);
      fns = fns.filter((fn) => {
        console.log(fn !== name);
        return fn !== name;
      });
      this.cacheMap.set(event, fns);
    }
  }
}

const eb = new EventBus();
function fn1(name, age) {
  console.log(`${name} ${age}`);
}
function fn2(name) {
  console.log(`hello, ${name}`);
}
eb.$on("test", fn1);
eb.$on("test", fn2);
console.log("this.events_1: ", eb.cacheMap); // this.events_1:  Map(1) { 'test' => [ [Function: fn1], [Function: fn2] ] }

eb.$emit("test", false, "Chebr", 44);

eb.$off("test", fn1);
console.log("this.events_2: ", eb.cacheMap); // this.events_2:  {test: Array(1)}
