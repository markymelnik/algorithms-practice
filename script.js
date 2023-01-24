// Practice with Algorithms

// Display

const container = document.querySelector('.container');
const output = document.createElement('div');
output.textContent = "Output";
output.classList.add('output');
container.append(output);

const arr = [5, 8, 4, 2, 1, 3, 9, 7, 6];

//
// Value Swap helper function
//

function swapValues(arr, a, b) { // Helper function.
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

//
// Insertion Sort
//

const insertionSort = (arr) => {
  let n = arr.length;
  // Invariant condition: For every loop iteration, elements in arr[1...i-1] are the elements originally in positions 1 through i-1, but are now in sorted order.
  for (let i = 0; i < n; i++) {
    let currentValue = arr[i]; // Current value at index i; this key is inserted into the ordered sequence arr[1...i-1].
    let j = i - 1; // A pointer to the index before i, j.

    while ((j > -1) && (arr[j] > currentValue)) { // While j points to a valid index preceeding i and the element at i-1, or j, is greater than the next element at i...
      arr[j + 1] = arr[j]; // ...the element at index i-1, or j, is assigned to the proceeding index at i, or j+1.
      j--; // Move the pointer down one index and repeat previous statement until one of the while loop conditions are no longer met.
    }
    arr[j + 1] = currentValue; // Upon exiting the while loop, signifying that either the preceeding element at j is not greater than the current element at i OR that j points to index -1 (non-existent), currentValue is assigned to the current index, i, or j+1. The loop invariant ensures that all elements in arr[1...i-1] are sorted in order for every loop iteration.
  }
  return arr; // Return new array when the for loop exits. This array contains the original elements sorted in ascending order.
}

//
// Merge Sort
//

// This function merges two arrays each containing a sorted subsequence of the original elements. A sorted subsequence can be an array with 0 or 1 elements(s).

const mergeArr = (leftArr, rightArr) => {
  let sortedArr = []; // Initiate an empty array which will contain a sorted subsequence of elements (with the exclusion of the last, largest element in some cases).

  while (leftArr.length && rightArr.length) { // Since .shift() removes the first element from the array, the proceeding element logically becomes the new first element. This is why the first elements of leftArr and rightArr are always compared until there are no elements remaining in one of the arrays.
    if (leftArr[0] < rightArr[0]) { 
      sortedArr.push(leftArr.shift()); // If the first element of the left array is less than the first element of the right array, remove this element and push it into the sorted array. 
    } else {
      sortedArr.push(rightArr.shift()); // Else remove the first element from the right array and push it into the sorted array.
    }
  } // Repeat sorting by comparison until either leftArr or rightArr are empty. Once either array is empty, there is no more comparison to be made.

  return [...sortedArr, ...leftArr, ...rightArr]; // Returns a merged array containing a sorted subsequence in every recursive mergeSort call. Since this implementation may result in either leftArr or rightArr containing one element with no other element to compare to, leftArr and rightArr are included here to ensure that remaining element is included at the end. Logically, this element is the largest element of the particular subsequence. 
}

// This function recursively breaks down the initial, unsorted array into arrays of 0 or 1 value(s). When the base case is satisfied, these arrays are compared and merged through the mergeArr function.

const mergeSort = (arr) => {
  if (arr.length < 2) return arr; // Base case; when the parameter array contains 1 or 0 value(s), it is returned to the respective leftArr or rightArr variable and the recursive calls in the call stack begin executing.

  let middleOfArr = Math.floor(arr.length / 2); // Calculate the middle index of the array and assign that value to the middleOfArr variable.

  let leftArr = mergeSort(arr.slice(0, middleOfArr)); // mergeSort() is called recursively to further divide the left array into left and right subarrays.
  let rightArr = mergeSort(arr.slice(middleOfArr)); // mergeSort() is called recursively to futher divide the right array into left and right subarrays.

  // Arrays are subdivided into two arrays until the base case is satisfied.

  return mergeArr(leftArr, rightArr); // When the base case is satisfied for an array, that array is no longer divided into two subarrays. Pairs of element sequences are merged and sorted through comparison until the final sorted sequence is returned.
}

//
// Bubble Sort
//

const bubbleSort = (arr) => {
  for (let i = 0; i < arr.length - 1; i++) { // For every element in the parameter array...
    for (let j = 0; j < (arr.length - i - 1); j++) { // ... and for every pair of adjacent elements...
      if (arr[j] > arr[j+1]) { // ...if the current element in greater than the next element...
        swapValues(arr, j, j+1); // ...then swap elements.
      }
      // After each loop iteration, the largest element is moved to the last index. Since this element is now in its correct position, that index is no longer useful for sorting the remaining elements. The proceeding loop will now perform the comparison procedure on one less index, hence the shortening of the index range by 1 after every iteration. 
    }
  }
  return arr; // Return the final, sorted array with elements in ascending order. 
}

//
// Heap Sort
//

const heapSort = (arr) => {
  const sortedArr = []; // Initializes an empty array that will contain the sorted sequence of elements.
  const newHeap = new MaxHeap(); // Creates a new heap through the MaxHeap class.

  for (let i = 0; i < arr.length; i++) {
    newHeap.createMaxHeap(arr[i]); // Inserts array element into the heap. When the loop exits, the resulting heap satisfies the maximum heap property.
  }

  for (let i = 0; i < arr.length; i++) {
    sortedArr.unshift(newHeap.removeLargestElement()); // Takes out the root element (largest element in every iteration) from the heap and adds it to the beginning of sortedArr using .unshift().
  }

  return sortedArr; // Returns an array containing the sorted sequence of elements.
}

// MaxHeap class; this implementation utilizes a maximum heap. 

class MaxHeap {
  constructor() {
    this.heap = []; // Initiates a heap in array form. 
  }

  parentIndex(index) {
    return Math.floor((index-1)/2); // Returns the index of the current node's parent. 
  }

  leftChildIndex(index) {
    return (2*index + 1); // Returns the index of the current node's left child.
  }

  rightChildIndex(index) {
    return (2*index + 2); // Returns the index of the current node's right child.
  }

  swap(a,b) { // Swaps nodes between indexes a and b.
    let temp = this.heap[a];
    this.heap[a] = this.heap[b];
    this.heap[b] = temp;
  } 

  createMaxHeap(element) { // This method is run for every element in the original array to produce a maximum heap with the largest element at the root.
    this.heap.push(element); // Inserts an element into the last node.
    let currentNodePointer = this.heap.length - 1; // Creates a pointer to the current (last) node.
    let parentNodePointer = this.parentIndex(currentNodePointer); // Creates a pointer to the parent node of the current node.
    while (this.heap[parentNodePointer] && this.heap[currentNodePointer] > this.heap[parentNodePointer]) { // Execute loop while parentNodePointer points to a parent node inside the heap and the current node is greater than the parent node.
      this.swap(parentNodePointer, currentNodePointer); // Swap current node with parent node. The current node is now one level up the heap. The larger elements 'bubble up' over the smaller elements to ultimately satisfy the maximum heap property.
      currentNodePointer = this.parentIndex(currentNodePointer); // Bubbling up, currentNodePointer points to the parent node, which is now the current node.
      parentNodePointer = this.parentIndex(currentNodePointer); // Bubbling up, parentNodePointer points to the parent of the current node from the previous statement.
    } // Exit loop when you reach a node with no parent OR the parent node is greater than the current node.
  }

  removeLargestElement() {
    const root = this.heap.shift(); // The root node (first element) is logically the greatest element. It is removed and assigned to the variable, root.
    this.heap.unshift(this.heap.pop()); // Removes the last element (smallest element) of the heap and places it into the empty root node from the previous statement.
    let currentNodePointer = 0; // Initiates an index of 0 at the root node. 
    let leftChild = this.leftChildIndex(currentNodePointer); // Assigns left child of current node (initially for root) to variable, leftChild.
    let rightChild = this.rightChildIndex(currentNodePointer); // Assigns right child of current node (initially for root) to variable, rightChild.
    while(this.heap[leftChild] && this.heap[leftChild] > this.heap[currentNodePointer] || this.heap[rightChild] > this.heap[currentNodePointer]){ // Execute loop while there exists a left child AND if the left child is greater than the current parent node OR the right child is greater than the current parent node. 
      let max = leftChild; // The left node is declared as the max. Max will be a point of reference for determining where an element is 'bubbled down.'
      if (this.heap[rightChild] && this.heap[rightChild] > this.heap[max]) { // Check if a right child node exists AND it is greater than its sibling, left node.
          max = rightChild // If so, declare the right node as the max.
      }
      this.swap(max, currentNodePointer); // The child node with the larger value, max, gets swapped with its parent node. This step 'bubbles down' the current element to the bottom of the heap, thereby logically pushing the next largest element to the root node. 
      currentNodePointer = max; // Bubbling down, the node that was swapped to a lower level becomes the new max.
      leftChild = this.leftChildIndex(max); // Reassign the new left node of the current node.
      rightChild = this.rightChildIndex(max); // Reassign the new right node of the current node. 
    }
    return root; // Return the root node from the first statement inside this method. This is placed into the final, sorted heap. 
  }
}

//
// Quick Sort
//

function quickSort(arr, start = 0, end = arr.length - 1) { // Takes an array of elements to be sorted, a start index, and an end index as parameters.
  if (start >= end) return; // Base case; returns the array that is empty or has 1 element. This array can not longer be partitioned.
  let partitionIndex = paritionArr(arr, start, end); // Partition the array based on start and end indexes and return new location of index pointer.
  quickSort(arr, start, partitionIndex - 1); // Recursively sort the left half of the array.
  quickSort(arr, partitionIndex + 1, end); // Recursively sort the right half of the array.
}

function paritionArr(arr, start, end) {
  let pivotValue = arr[end]; // Declare the element in the last index as the pivot point.
  let indexPointer = start; // Index of the smaller element; acts like a pointer.
  for (let i = start; i < end; i++) { // Loop through all elements of the parameter array.
    if (arr[i] < pivotValue) { // Check if the current element is smaller than the pivot.
      swapValues(arr, i, indexPointer); // If so, the smaller element is swapped with the largest element encountered in the previous loop iteration.
      indexPointer++; // Increment the index of the pointer.
    }
  } // Exit the loop
  swapValues(arr, indexPointer, end); // Once all elements smaller than the pivot are moved to the left, the pivot value at the end is swapped with the value that indexPointer points to. 
  return indexPointer; // This value will determine the end of the new left array and the start of the new right array when assigned back to paritionIndex in quickSort.
}

//
// Counting Sort
//


function countingSort(arr, n = arr.length) {

  let k = Math.max(...arr); // Returns the largest element in the parameter array.
  let count = 0; // Initializes a count variable and assigns an initial value of 0.

  const tempArr = new Array(k+1).fill(0); // Creates a temporary array with a length one more than the value of the largest element and fills every index with a 0.

  for (let i = 0; i < n; i++) { // For every element in the parameter array...
    count = arr[i]; // ...count is assigned to the element at the current index of the parameter array. This element value is present at least once.
    tempArr[count]++; // Since this element is present at least once, that element's corresponding index value in tempArr, representing frequency, is incremeneted by 1.
  } // When the for loop exits, each tempArr element represents the frequency of each number (tempArr index) in the original, unsorted array.

  for (let i = 1; i <= k; i++) { // Update the count based on the previous index.
    tempArr[i] = tempArr[i] + tempArr[i-1]; // Update the elements of the frequency array to track cumulative values present at an index, from start to end.
  } // When the for loop exits, the cumulative value information in the array is used to place element x directly into its position in the output array.

  const outputArr = new Array(n).fill(0); // Creates a new output array which will contain the sorted elements.

  for (let i = n - 1; i >= 0; i--) { // For every element in the parameter array and the temporary array with elements representing cumulative values...
    count = arr[i]; // Assign count to the element at the current index of the parameter array.
    outputArr[tempArr[count] - 1] = count; // Retrieve the frequency of that value inside tempArr and subtract this value by 1. This will be the new location of the element from the original array. Assign count to that index in outputArr.
    tempArr[count] = tempArr[count] - 1; // Decrement the cumulative frequency by 1 to indicate that index in outputArr now contains the correct element.
  }

  return outputArr; // Return the final, sorted array once the last for loop exits. 
}

//
// Radix Sort
//

function radixSort(arr) {

  let maxDigitCount = mostDigits(arr); // Assign maxDigitCount to the digit count of the largest number in the parameter array.

  for (let k = 0; k < maxDigitCount; k++) { // This for loop executes a number of times equal to the maxDigitCount. This ensures that every digit of every number in the parameter array is looked at. Starting from the lowest place and ending at the highest place, each iteration sorts the numbers in the current place.
    let tempArr = Array.from({ length: 10 }, () => []); // Create an array containing 10 subarrays, each to hold a value from 0 to 9, respectively.

    for (let i = 0; i < arr.length; i++) { // For each number at a specific place in the original array...
      let digit = getDigit(arr[i], k); // ... assign digit variable to the specified digit, k, of its corresponding number, arr[i].

      tempArr[digit].push(arr[i]); // ...push the number in the digit variable into the tempArr subarray, whose index is the same value as the specified digit. This sorts the numbers, in the current place being observed, in ascending order. 
    } 

  arr = [].concat(...tempArr); // Once every place has been observed, the for loop exits and concat() is called to merge the 10 subarrays into a single array.
  }
  return arr; // The single, sorted array is returned. 
}

function getDigit(num, place) { // Returns the number at the specified place.
  return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
}

function digitCount(num) { // Returns the digit count of the number.
  if (num === 0) return 1; // If the number is 0, return 1 since you have a single digit.
  return Math.floor(Math.log10(Math.abs(num))) + 1; // Return the rounded-down, base 10 logarithm of the absolute value of the parameter, num.
}

function mostDigits(nums) { // Returns the digit count of the largest number in the parameter array, nums.
  let maxDigits = 0; // Initial assignment of maxDigits to 0.
  for (let i = 0; i < nums.length; i++) { // For every number in the parameter array...
    maxDigits = Math.max(maxDigits, digitCount(nums[i])); // ...return the digit count of the largest number in the parameter array, nums.
  }
  return maxDigits; // Return the largest digit count to be used to determine the number of places to loop through.
}

//
// Bucket Sort
//

const bucketSort = (arr, n = arr.length - 1) => {

  const min = Math.min(...arr); // Finds minimum value in the parameter array.
  const max = Math.max(...arr); // Finds maximum value in the parameter array.

  const buckets = Array.from({ length: Math.floor((max - min) / n) + 2 }, () => []); // Creates a new array with 'buckets' where the input elements will be stored.
  // The elements in the current input array require 2 buckets.
  arr.forEach(el => {
    buckets[Math.floor((el - min) / n)].push(el); // Take each element and calculate the bucket it will be pushed into inside the buckets array.
  });

  return buckets.reduce((acc, b) => [...acc, ...b.sort((a, b) => a - b)], []); // Once every element has been placed into its respective bucket, combine the buckets into a single array. This array contains elements sorted in ascending order.  
};

//
// Output
//

output.textContent = heapSort(arr);