import * as _ from 'lodash';

function myMapCallback<T>(element: any, index: number, array: T[]): any {
  return element * 2;
}

function myMap<T>(array: T[], myMapCallback: Function): T[] {
  if (array.length === 0)
    return []
  return (myMapHelper(array[0], 0, array, [], myMapCallback)).reverse()
}

function myMapHelper<T>(item: T, i: number, array: T[], result: T[], myMapCallback: Function): Array<T> {
  if (i === array.length-1) {
    return [...result, myMapCallback(item, i, array)]
  }
  return [...myMapHelper(array[i+1], i+1, array, result, myMapCallback), myMapCallback(item, i, array)]
}

function myFilterCallback<T>(element: any, index: number, array: []): boolean {
  return element > 1
}

function myFilter<T>(array: T[], myFilterCallback: Function): Array<T> {
  if (array.length === 0)
    return []
  return _.pullAll(myFilterHelper(array[0], 0, array, [], myFilterCallback).reverse(), [null])
}

function myFilterHelper<T>(item: T, i: number, array: T[], result: T[], myFilterCallback: Function): Array<T> {
  if (i === array.length - 1)
    return myFilterCallback(item, i, array) ? [...result, item] : [...result, null];
  return myFilterCallback(item, i, array)
    ? [...myFilterHelper(array[i+1], i+1, array, result, myFilterCallback), item]
    : [...myFilterHelper(array[i+1], i+1, array, result, myFilterCallback), null];
}

const array = [0, 1, 2, 3];
const obj = {myMap: myMap(array, myMapCallback), myFilter: myFilter(array, myFilterCallback)}

console.log(_.isEqual(myFilter([0], myFilterCallback), []));
console.log(_.isEqual(myFilter([1, 5, 6, 0, 7, 9], myFilterCallback), [5, 6, 7, 9]));
console.log(_.isEqual(myFilter([], myFilterCallback), []));

console.log(_.isEqual(myMap(array, myMapCallback), [0, 2, 4, 6]));
console.log(_.isEqual(myMap([1], myMapCallback), [2]));
console.log(_.isEqual(myMap([], myMapCallback), []));
