function deepClone(obj) {
    if(typeof obj !== 'object')    return
    let result = Array.isArray(obj)? []:{}
    if(obj.hasOwnProperty(key)){	// hasOwnProperty 过滤掉原型链上继承来的属性
        for(let key in result){
            result[key] = typeof obj[key] === 'obj'? deepClone(result[key]) : result[key]
        }
    }
    return result
}