import * as _ from 'lodash';

// without recursion
// function myMap(array) {
//   return array.reduce((accumulator, current, index, array) => _.flatten([accumulator].concat(myCallback(current, index, array))))
// }
//
// function myCallback(element, index, array) {
//   return element + index + array[index]
// }
//
// const array = [0, 1, 2, 3];
// const obj = {myMap: myMap(array), myFilter: myFilter(array)}
// console.log(obj.myFilter)
//
// function myFilter(array) {
//   return _.pullAll((array.reduce((accumulator, current, index, array) => _.flatten([accumulator].concat(myFilterCallback(current, index, array) ? current : null)), array[0])), [null]).slice(1)
// }

// function myFilterCallback(element, index, array) {
//   return element > 1
// }

// with recursion
function myMap(item, i, array, result) {
  if (i === array.length)
    return result.push(myCallback(item, i, array));
  myMap(array[i], i + 1, array, result);
  if (result.length === array.length)
    return result.reverse();
  return result.push(myCallback(item, i, array))
}

function myCallback(element, index, array) {
  return element * 2;
}

function myFilterCallback(element, index, array) {
  return element > 1
}

function myFilter(item, i, array, result) {
  if (i === array.length)
    return myFilterCallback(item, i, array) ? result.push(item) : result.push(null);
  myFilter(array[i], i + 1, array, result);
  if (result.length === array.length)
    return _.pullAll(result.reverse(), [null]);
  return myFilterCallback(item, i, array) ? result.push(item) : result.push(null);
}

const array = [0, 1, 2, 3];
const obj = {myMap: myMap(array[0], 0, array, []), myFilter: myFilter(array[0], 0, array, [])}