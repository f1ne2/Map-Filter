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



function myMapCallback(element: any, index: number, array: any[]): any {
  return element * 2;
}

function myMap(array: any[], myMapCallback: Function): any[] {
  if (array.length === 0)
    return []
  return (myMapHelper(array[0], 0, array, [], myMapCallback)).reverse()
}

function myMapHelper(item: any, i: number, array: any[], result: any[], myMapCallback: Function): any | any[] {
  if (i === array.length-1) {
    return [...result, myMapCallback(item, i, array)]
  }
  return [...myMapHelper(array[i+1], i+1, array, result, myMapCallback), myMapCallback(item, i, array)]
}

function myFilterCallback(element: any, index: number, array: []): boolean {
  return element > 1
}

function myFilter(array: any[], myFilterCallback: Function): any[] | any {
  if (array.length === 0)
    return []
  return _.pullAll(myFilterHelper(array[0], 0, array, [], myFilterCallback).reverse(), [null])
}

function myFilterHelper(item: any, i: number, array: any[], result: any[], myFilterCallback: Function): any[] | any {
  if (i === array.length - 1)
    return myFilterCallback(item, i, array) ? [...result, item] : [...result, null];
  return myFilterCallback(item, i, array) ? [...myFilterHelper(array[i+1], i+1, array, result, myFilterCallback), item] : [...myFilterHelper(array[i+1], i+1, array, result, myFilterCallback), null];
}

const array = [0, 1, 2, 3];
const obj = {myMap: myMap(array, myMapCallback), myFilter: myFilter(array, myFilterCallback)}



console.log(_.isEqual(myFilter([0], myFilterCallback), []));
console.log(_.isEqual(myFilter([1, 5, 6, 0, 7, 9], myFilterCallback), [5, 6, 7, 9]));
console.log(_.isEqual(myFilter([], myFilterCallback), []));

console.log(_.isEqual(myMap(array, myMapCallback), [0, 2, 4, 6]));
console.log(_.isEqual(myMap([1], myMapCallback), [2]));
console.log(_.isEqual(myMap([], myMapCallback), []));
