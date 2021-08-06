import * as _ from 'lodash';

// without recursion
// function myMap(array: number[], myMapCallback: Function) {
//   if (array.length > 1)
//     return array.reduce((accumulator, current, index, array) =>
//       _.flatten([accumulator]
//         .concat(myMapCallback(current, index, array))
//       )
//     )
//   if (array.length === 1) {
//     return [myMapCallback(array[0], 0, array)]
//   }
//   return []
// }
//
// function myMapCallback(element, index, array): number | undefined {
//   return element
// }
//
// const array = [0, 1, 2, 3];
// const obj = {myMap: myMap(array, myMapCallback), myFilter: myFilter(array, myFilterCallback)}
// console.log(obj.myMap)
//
// function myFilter(array: number[], myFilterCallback: Function): any[]  {
//   if (array.length > 0)
//     return _.pullAll((array.reduce((accumulator, current, index, array) =>
//       _.flatten([accumulator]
//       .concat(myFilterCallback(current, index, array) ? current : null)), array[0])), [null])
//       .slice(1)
//   return [myFilterCallback(array[0], 0, array) ? array[0] : []]
// }
//
// function myFilterCallback(element: number, index: number, array: number[]): boolean {
//   return element < 1
// }
//
// console.log(_.isEqual(myFilter([0], myFilterCallback), []))

// with recursion

function myMapCallback(element: any, index: number, array: any[]) {
  return element * 2;
}

function myMap(array: any[], myMapCallback: Function) {
  if (array.length === 0)
    return []
  return myMapHelper(array[0], 0, array, [], myMapCallback)
}

function myMapHelper(item: any, i: number, array: any[], result: any[], myMapCallback: Function) {
  if (i === array.length)
    return result.push(myMapCallback(item, i, array));
  myMapHelper(array[i], i + 1, array, result, myMapCallback);
  if (result.length === array.length) {
    return result.reverse();
  }
  return result.push(myMapCallback(item, i, array))
}

function myFilterCallback(element: any, index: number, array: []) {
  return element < 1
}

function myFilter(array: any[], myFilterCallback: Function) {
  if (array.length === 0)
    return []
  return myFilterHelper(array[0], 0, array, [], myFilterCallback)
}

function myFilterHelper(item: any, i: number, array: any[], result: any[], myFilterCallback: Function) {
  if (i === array.length)
    return myFilterCallback(item, i, array) ? result.push(item) : result.push(null);
  myFilterHelper(array[i], i + 1, array, result, myFilterCallback);
  if (result.length === array.length)
    return _.pullAll(result.reverse(), [null]);
  return myFilterCallback(item, i, array) ? result.push(item) : result.push(null);
}

const array = [0, 1, 2, 3];
const obj = {myMap: myMap(array, myMapCallback), myFilter: myFilter(array, myFilterCallback)}

console.log(_.isEqual(myFilter([0], myFilterCallback), [0]))
console.log(_.isEqual(myFilter([1, 5, 6, 0, 7, 9], myFilterCallback), [0]))
console.log(_.isEqual(myFilter([], myFilterCallback), []))

console.log(_.isEqual(myMap(array, myMapCallback), [0, 2, 4, 6]))
console.log(_.isEqual(myMap([1], myMapCallback), [2]))
console.log(_.isEqual(myMap([], myMapCallback), []))

array.map((item) => item)
