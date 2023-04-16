// 利用obj的key唯一性
function removeDup1(arr) {
    let new_obj = {}, new_arr = []
    for(let i = 0; i < arr.length; i++){
        if(!new_obj[arr[i]]){
            new_arr.push(arr[i])
            new_obj[arr[i]] = 1
        }
    }
    return new_arr
}

// indexOf
function removeDup2(arr) {
    let new_arr = []
    for(let i = 0; i < arr.length; i++){
        if( new_arr.indexOf(arr[i]) == -1 ){
            new_arr.push(arr[i])
        }
    }
    return new_arr
}

// ES6的Set
[...new Set(arr)]

// Array.from
Array.from(new Set(arr))