function myInstanceOf(left, right){
    let protoType = right.prototype
    let proto = left.__proto__
    while(true){
        if(proto === null)    return false
        if(proto === protoType)    return true
        proto = proto.__proto__
    }
}
let str = new String('aa')
myInstanceOf(str, String)		// true