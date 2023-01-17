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

// Heapsort

function heapSort(arr) {
  const sortedArr = []; // Initializes an empty array that will contain the sorted elements.
  const newHeap = new MaxHeap(); // Creates a new heap through the MaxHeap class.

  for (let i = 0; i < arr.length; i++) {
    newHeap.insert(arr[i]); // Inserts array element into heap following the instructions of the custom .insert() method in MaxHeap. When the loop finishes, the resulting heap's root node is the largest element.
  }
  for (let i = 0; i < arr.length; i++) {
    sortedArr.push(newHeap.delete()); // Takes out the root node (largest element) from the heap array and inserts it into the final, sorted array. The last element in the heap becomes the root node. The .delete() method in MaxHeap moves the next largest element up into the root node.  
  }

  return sortedArr; // This final array contains all original elements sorted in descending order.
}

// MaxHeap class; this implementation utilizes a maximum heap which has more practical application compared to a minimum heap.

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

  swap(a,b) { // Swap nodes between indexes a and b.
    let temp = this.heap[a];
    this.heap[a] = this.heap[b];
    this.heap[b] = temp;
  } 

  insert(element) {
    this.heap.push(element); // Inserts new element into the last node (either bottom, rightmost node or the first leftmost node of a new level).
    let currentNodeIndex = this.heap.length - 1; // Initially assigns the index of the last node of the heap to the variable, currentNodeIndex; 'bubbling up'.
    let parentNodeIndex = this.parentIndex(currentNodeIndex); // Assigns the parent index of this node to the variable, parentNodeIndex.
    while (this.heap[parentNodeIndex] && this.heap[parentNodeIndex] < this.heap[currentNodeIndex]) { // Execute loop while there exists a parent of the current node AND that parent node is less than the current node.
      this.swap(parentNodeIndex, currentNodeIndex); // Swap current node with parent node. The current node is now one level up the heap.
      currentNodeIndex = this.parentIndex(currentNodeIndex); // Bubbling up, currentNodeIndex is now one level up, referencing the position of its original parent node.
      parentNodeIndex = this.parentIndex(currentNodeIndex); // Bubbling up, parentNodeIndex is the parent node index of the current node defined in previous statement.
    } // Exit loop when you reach a node with no parent OR the parent node is greater than the current node.
  } // Once every element undergoes this method, the largest element is pushed to the top of the heap.

  delete() {
    const root = this.heap.shift(); // The root node (first element) is logically the greatest element. It is removed and assigned to the variable, root.
    this.heap.unshift(this.heap.pop()); // Removes the last element of the heap and places it into the empty root node.
    let currentNodeIndex = 0; // Initiates an index of 0 at the root node; 'bubbling down'.
    let leftChild = this.leftChildIndex(currentNodeIndex); // Assigns left child of current node (initially for root) to variable, leftChild.
    let rightChild = this.rightChildIndex(currentNodeIndex); // Assigns right child of current node (initially for root) to variable, rightChild.
    while(this.heap[leftChild] && this.heap[leftChild] > this.heap[currentNodeIndex] || this.heap[rightChild] > this.heap[currentNodeIndex]){ // Execute loop while there exists a left child AND if the left OR right child in this level are greater than the current parent node.
        let max = leftChild; // The left node is declared as the max.
        if (this.heap[rightChild] && this.heap[rightChild] > this.heap[max]) { // Check if a right child node exists AND it is greater than its sibling, left node.
            max = rightChild // If so, declare the right node as the max.
        }
        this.swap(max, currentNodeIndex); // The child node with the larger value, max, gets swapped with its parent node.
        currentNodeIndex = max; // Bubbling down, the node that was swapped to a lower level now becomes the max node.
        leftChild = this.leftChildIndex(max); // Reassign the new left node of the current node.
        rightChild = this.rightChildIndex(max); // Reassign the new right node of the current node. 
    }
    return root; // Return the root node. This is placed into the final, sorted heap. 
  }
}

output.textContent = heapSort(arr);