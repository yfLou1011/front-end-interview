function test(arr, index_arr){
    return arr.filter( (item, idx) => {
        return index_arr.indexOf(idx+1)==-1
    })
}
console.log(test([1,2,3,4,5],[1,3,5]))