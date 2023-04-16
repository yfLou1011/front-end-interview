// 定时器版
function throttle(fn, wait) {	
    let timer = null
	return function() {		
        let context = this
		let args = [...arguments]
		if(timer)	return
		timer = setTimeout(function(){
            timer = null
            fn.apply(context,args)
        }, wait)	
    }
}
// 时间戳版
function throttle2(fn, wait) {
    let prev = 0
    return function(){
        let now = new Date()
        let context = this   
        let args = [...arguments]
        if(now-prev > wait) {
            fn.apply(context, args)
            prev = now
        }
    }
}