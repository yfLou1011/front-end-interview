class EventEmitter{
    constructor(){
        this.events = {}
    }

    on(name, cb){
        if(!this.events[name]){
            this.events[name] = [cb]
        } else {
            this.events[name].push(cb)
        }
    }

    emit(name, once = false, ...args){
        if(this.events[name]){
            this.events[name].forEach( fn => {
                fn.call(this, ...args)
            })
        }
        if(once){
            delete this.events[name]
        }
    }

    off(name,cb){
        if(this.events[name]){
            let tasks = this.events[name]
            tasks = tasks.filter( fn => {
                return fn !== cb
            })
            this.events[name] = tasks
        }
    }
}

let eb = new EventEmitter()
function fn1(name, age){
    console.log(`${name} ${age}`)
}
function fn2(name){
    console.log(`hello, ${name}`)
}
console.log('this.events_1: ', eb.events)		// this.events_1:  {}
eb.on('test', fn1)
eb.on('test', fn2)
console.log('this.events_2: ', eb.events)		// this.events_2:  {test: Array(2)}
eb.emit('test', false, 'Cheer', 46)			// Cheer 46	
									// hello, Cheer
eb.off('test', fn2)
console.log('this.events_3: ', eb.events)		// this.events_2:  {test: Array(1)}







