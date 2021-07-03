Array.prototype.filter = function(fn,context){
    let arr = this
    let result = []
    for(let i = 0; i < arr.length; i++){
        let cur = fn.call(context, arr[i], i, arr)
        if(cur){
            result.push(arr[i])
        }    
    }
    return result
}
let arr = [1,2,3,4,5,6,7,8]
function fn(item){
    return item > 5
}
arr.filter(fn, window)	// [6,7,8]
