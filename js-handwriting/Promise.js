const PENDING = 'pending'
const FULLFILLED = 'fullfilled'
const REJECTED = 'rejected'

// 1. 声明
class myPromise1 {
	constructor(executor){
		let resolve = () => {}
		let reject = () => {}
		executor(resolve, reject)
	}
}

// 2. 解决基本状态
class myPromise2 {
	constructor(executor){
		this.state = PENDING
		this.value = undefined	// 成功的值
		this.reason = undefined	// 失败的值

		let resolve = (value) => {
			if(this.state === 'pending'){
				this.state = 'fullfilled'
				this.value = value
			}
			
		}
		let reject = (reason) => {
			if(this.state === 'pending'){
				this.state = 'rejected'
				this.reason = reason
			}
		}

		try{
			executor(resolve, reject);
		} catch (err) {
			reject(err);
		}
	}
	then(resolve, reject){

	}
	catch(err){

	}
}

// 3. then方法
class Promise3 {
	constructor(){}
	then(onFullfilled, onRejected){
		if(this.state === 'fullfilled'){
			onFullfilled(this.value)
		} 
		if(this.state === 'rejected'){
			onRejected(this.reason)
		}
	}
}

// 4. 解決setTimeout
class Promise4 {
	constructor(executor){
		this.state = PENDING
		this.value = undefined	// 成功的值
		this.reason = undefined	// 失败的值

		this.onResolveCallbacks = []	// 成功存放的数组
		this.onRejectedCallbacks = []	// 失败存放法数组

		let resolve = (value) => {
			if(this.state === 'pending'){
				this.state = 'fullfilled'
				this.value = value
				this.onResolveCallbacks.forEach( fn => fn() )	// 一旦resolve执行，调用成功数组的函数
			}
			
		}
		let reject = (reason) => {
			if(this.state === 'pending'){
				this.state = 'rejected'
				this.reason = reason
				this.onRejectedCallbacks.forEach( fn => fn() )	// 一旦reject执行，调用失败数组的函数
			}
		}

		try {
			executor(resolve, reject);
		} catch(err) {
			reject(err);
		}
	}
	then(onFullfilled, onRejected){
		let promise2 = new Promise( (resolve, reject) => {
			if(this.state === 'fullfilled'){
				this.onFullfilled(this.value)
			}
			if(this.state === 'rejected'){
				this.onRejected(this.reason)
			}
			if(this.state === 'pending'){
				// onFulfilled传入到成功数组
				this.onResolvedCallbacks.push(()=>{
					onFullfilled(this.value);
				})
				// onRejected传入到失败数组
				this.onRejectedCallbacks.push(()=>{
					onRejected(this.reason);
				})
			}
		})
		return promise2
	}
	catch(reason) {
		return this.then()
	}
}

// 5. 链式调用 then返回Promise
class Promise5 {
	constructor(executor){
	  this.state = 'pending';
	  this.value = undefined;
	  this.reason = undefined;
	  this.onResolvedCallbacks = [];
	  this.onRejectedCallbacks = [];
	  let resolve = value => {
		if (this.state === 'pending') {
		  this.state = 'fulfilled';
		  this.value = value;
		  this.onResolvedCallbacks.forEach(fn => fn());
		}
	  };
	  let reject = reason => {
		if (this.state === 'pending') {
		  this.state = 'rejected';
		  this.reason = reason;
		  this.onRejectedCallbacks.forEach(fn => fn());
		}
	  };
	  try{
		executor(resolve, reject);
	  } catch (err) {
		reject(err);
	  }
	}
	then(onFulfilled,onRejected) {
	  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
	  onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };
	  let promise2 = new Promise5((resolve, reject) => {
		if (this.state === 'fulfilled') {
		//   this.onFullfilled(this.value)
		  setTimeout(() => {
			try {
			  let x = onFulfilled(this.value);
			  resolvePromise(promise2, x, resolve, reject);
			} catch (e) {
			  reject(e);
			}
		  }, 0);
		};
		if (this.state === 'rejected') {
		  setTimeout(() => {
			try {
			  let x = onRejected(this.reason);
			  resolvePromise(promise2, x, resolve, reject);
			} catch (e) {
			  reject(e);
			}
		  }, 0);
		};
		if (this.state === 'pending') {
		  this.onResolvedCallbacks.push(() => {
			setTimeout(() => {
			  try {
				let x = onFulfilled(this.value);
				resolvePromise(promise2, x, resolve, reject);
			  } catch (e) {
				reject(e);
			  }
			}, 0);
		  });
		  this.onRejectedCallbacks.push(() => {
			setTimeout(() => {
			  try {
				let x = onRejected(this.reason);
				resolvePromise(promise2, x, resolve, reject);
			  } catch (e) {
				reject(e);
			  }
			}, 0)
		  });
		};
	  });
	  return promise2;
	}
	catch(fn){
	  return this.then(null,fn);
	}
}
function resolvePromise(promise2, x, resolve, reject){
	if(x === promise2){
	  return reject(new TypeError('Chaining cycle detected for promise'));
	}
	let called;
	if (x != null && (typeof x === 'object' || typeof x === 'function')) {
	  try {
		let then = x.then;
		if (typeof then === 'function') { 
		  then.call(x, y => {
			if(called)return;
			called = true;
			resolvePromise(promise2, y, resolve, reject);
		  }, err => {
			if(called)return;
			called = true;
			reject(err);
		  })
		} else {
		  resolve(x);
		}
	  } catch (e) {
		if(called)return;
		called = true;
		reject(e); 
	  }
	} else {
	  resolve(x);
	}
}
//resolve方法
Promise5.resolve = function(val){
	return new Promise5((resolve,reject)=>{
	  resolve(val)
	});
}
//reject方法
Promise5.reject = function(val){
	return new Promise5((resolve,reject)=>{
	  reject(val)
	});
}
//race方法 
Promise5.race = function(promises){
	return new Promise5((resolve,reject)=>{
	  for(let i=0;i<promises.length;i++){
		promises[i].then(resolve,reject)
	  };
	})
}
//all方法(获取所有的promise，都执行then，把结果放到数组，一起返回)
Promise5.all = function(promises){
	let arr = [];
	let i = 0;
	function processData(index,data){
	  arr[index] = data;
	  i++;
	  if(i == promises.length){
		resolve(arr);
	  };
	};
	return new Promise5((resolve,reject)=>{
	  for(let i=0;i<promises.length;i++){
		promises[i].then(data=>{
		  processData(i,data);
		},reject);
	  };
	});
}

// test
let p1 = new Promise5( (resolve,reject) => {
	console.log(1)
	setTimeout(() => {
		console.log("timerStart");
		resolve("success")
		console.log('timerEnd')
	}, 1000);
})
p1.then(
	(res) => {
		console.log('resolved: ', res)
	},
	(err) => {
		console.error('rejected: ', err)
	},
)

// let p2 = new Promise5( (resolve, reject) => {
// 	console.log('2')
// 	resolve('p2 success')
// })
// p2.then(
// 	(value) => { console.log(value) }
// )