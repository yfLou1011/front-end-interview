function myNew(obj){
    let new_obj = {}
    new_obj.__proto__ = obj.prototype   // new_obj继承了函数的原型
    obj.call(new_obj)
    return new_obj
}