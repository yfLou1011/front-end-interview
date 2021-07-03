function myNew(obj){
    let new_obj = {}
    new_obj.__proto__ = obj.prototype
    obj.call(new_obj)
    return new_obj
}