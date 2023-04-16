function myFlat (arr) {
    let result = []
    for(let i = 0; i < arr.length; i++){
        if(Array.isArray(arr[i])){
            result = [...result, ... myFlat(arr[i])]
            // result.concat(myFlat(arr[i]))
        } else {
            result.push(arr[i])
        }    
        // console.log('after: ', result)
    }
    return result
}

const arr1 = [0, 1, 2, [3, 4]];
console.log(myFlat(arr1))

// ES6  var newArray = arr.flat([depth])
console.log(arr1.flat());