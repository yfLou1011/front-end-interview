function myReduce<T extends any, U extends any>(
  array: T[],
  cb: (res: U, cur: T) => {},
  initialValue: U
): U {
  let res = initialValue;
  for (let i = 0; i < array.length; i++) {
    cb(res, array[i]);
  }
  return res;
}

function map(arr, callback) {
  const len = arr.length;
  const newArr = [];
  arr.reduce((pre, cur) => {
    newArr.push(callback(cur));
  }, 0);

  return newArr;
}
const arr = [1, 2, 3];
map(arr, (x) => x + 2);
