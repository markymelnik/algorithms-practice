// Practice with Algorithms

// Display

const container = document.querySelector('.container');
const output = document.createElement('div');
output.textContent = "Output";
output.classList.add('output');
container.append(output);

const arr = [5, 8, 4, 2, 1, 3, 9, 7, 6];

// Insertion Sort

function insertionSort(arr) {
  let n = arr.length;

  for (let i = 0; i < n; i++) {
    let currentValue = arr[i]; // Current value at current index. It is 'taken out' of array if while loop conditions are met and placed back into a 'sorted sequence' array upon exiting the while loop.
    let j = i - 1; // The previous index.

    while ((j > -1) && (arr[j] > currentValue)) {
      arr[j + 1] = arr[j]; // If array contains previous index and current value < previous value, assign value at previous index to current index.
      j--; // Move down one index and repeat previous statement until either an invalid index is reached or current value > previous value.
    }
    arr[j + 1] = currentValue; // When one of the while loop conditions are no longer met, assign current 'taken out' value to the index you are currently on.
  }
  return arr; // Return new array when for loop conditions are no longer met. This array is sorted in ascending order.
}

// Merge Sort

// This function merges two 'sorted' arrays. A 'sorted' array is an array that contains 0 or 1 value(s).

function mergeArr(leftArr, rightArr) {
  let sortedArr = []; // Initiate an empty array which will serve as a 'sorted' array throughout the implementation.

  while (leftArr.length && rightArr.length) {
    if (leftArr[0] < rightArr[0]) {
      sortedArr.push(leftArr.shift()); // If the first value of left array < first value of right array, remove this left value and place into sorted array.
    } else {
      sortedArr.push(rightArr.shift()); // Else remove this right value and place into sorted array.
    }
  } // Repeat sorting by comparison until either the left or right arrays have no values.

  return [...sortedArr, ...leftArr, ...rightArr]; // Return an array that contains the sorted sequence at each step of the merging process. The final return array is an array with all original values sorted in ascending order.
}

// This function recursively breaks down the initial, unsorted array into arrays of 0 or 1 value(s). When the base case is satisfied, arrays are compared and merged.

function mergeSort(arr) {
  if (arr.length < 2) return arr; // Base case; when the parameter array contains 1 or 0 value(s); it is returned to the respective leftArr or rightArr variable.

  let middleOfArr = Math.floor(arr.length / 2); // Calculate the middle index of the array and assign that value to the middleOfArr variable.

  let leftArr = mergeSort(arr.slice(0, middleOfArr)); // A new left array is populated with values left of the determined middle point (exlusive).
  let rightArr = mergeSort(arr.slice(middleOfArr)); // A new right array is populated with values right of the determined middle point (inclusive).

  // These arrays undergo recursive mergeSort calls until the base case is satisfied.

  return mergeArr(leftArr, rightArr); // When the base case is satisfied, the single value inside leftArr or rightArr no longer undergo mergeSort. They become parameters for mergeArr, which returns a sorted array of values. In the merging process, these arrays are continuously compared and merged in mergeArr until they return the final sorted array.
}

output.textContent = mergeSort(arr);