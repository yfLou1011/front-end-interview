// Fisher–Yates shuffle 洗牌算法
function shuffle(arr) {	
    let len = arr.length
	while(len > 1){		
        let index = parseInt(Math.random() * len--);
		[arr[index], arr[len]] = [arr[len], arr[index]]	
    }	
return arr}

console.log(shuffle([1,2,3,4,5]))   // [2, 4, 1, 5, 3]