// let代替var
function counter1(num){
    for(let i = num; i > 0; i--){
        setTimeout( ()=>{console.log(i)}, 1000*(num-i+1) )
    }
}
counter1(5)

// 立即执行函数
function counter2(num) {
    for(var i = num; i > 0; i--){
        (
            function(a){
                setTimeout( ()=>{console.log(a)}, 1000*(num-a+1) )
            }
        )(i)
    }
}
counter2(5)