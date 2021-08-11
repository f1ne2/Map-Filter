import * as _ from 'lodash';

function myFilterCallback(element: number): boolean {
  return element > 5
}

function myFilter<T>(array: T[], myFilterCallback: (n: T) => boolean): T[] {
  return myFilterHelper(array, [], myFilterCallback).reverse()
}

function myFilterHelper<T>(curr_array: T[], result: T[], myFilterCallback: (n: T) => boolean): T[] {
  if (!curr_array.length)
    return result
  return myFilterHelper(curr_array.slice(1), (myFilterCallback(curr_array[0]) ? [curr_array[0], ...result] : result),
    myFilterCallback)
}

console.log(_.isEqual(myFilter([0], myFilterCallback), []));
console.log(_.isEqual(myFilter([1, 5, 6, 0, 7, 9], myFilterCallback), [6, 7, 9]));
console.log(_.isEqual(myFilter([], myFilterCallback), []));
