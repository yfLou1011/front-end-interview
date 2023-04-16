function omit<T extends Record<string | number, any>, K extends keyof T>(
  obj: T,
  keys: Array<K | string>
): Omit<T, K> {
  let clone = { ...obj };
  keys.forEach((i) => {
    if (clone[i]) delete clone[i];
  });
  return clone;
}

const omitRes = omit({ a: 1, b: 2, c: 3 }, ["a", "b"]);
console.log("===omit===", { omitRes });

function pick<T extends Record<string | number, any>, K extends keyof T>(
  obj: T,
  keys: Array<K | string>
): Pick<T, K> {
  let clone = {} as Pick<T, K>;
  keys.forEach((i) => {
    if (obj[i]) clone[i] = obj[i];
  });
  return clone;
}
const pickRes = omit({ a: 1, b: 2, c: 3 }, ["a", "b"]);
console.log("===omit===", { pickRes });

const arr = [1, 2, 3];

// 0 + 1 + 2 + 3
const initialValue = 0;
const add = (previousValue, currentValue) => previousValue + currentValue;
const sumArr = arr.reduce(add, initialValue);

console.log(sumArr);
