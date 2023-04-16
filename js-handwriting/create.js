Object.myCreate = function (proto, propertyObject = undefined){
    if (typeof proto !== 'object' && typeof proto !== 'function') {
        throw new TypeError('Object prototype may only be an Object or null.')
    }
    if (propertyObject == null) {
        new TypeError('Cannot convert undefined or null to object')
    }

    function F(){}
    F.prototype = proto
    let f = new F()

    // 处理第二个参数
    if(propertyObject !== undefined){
        Object.defineProperties(f, propertyObject)
    }
	  // 创建纯净的对象
    if(proto === null){
        f.__proto__ = null
    }
    return f
}

let myObj = Object.myCreate(null, {
    name: {
        value: 'Cheer',
        enumerable: true
    },
    job: {
        value: 'Singer-Songwriter'
    }
})
console.log(myObj)
