// Practice with Algorithms

// Display

const container = document.querySelector('.container');
const output = document.createElement('div');
output.textContent = "Output";
output.classList.add('output');
container.append(output);

const arr = [5, 8, 2, 4, 1, 3, 9, 7, 6];

// Insertion Sort

function insertionSort(arr) {
  let n = arr.length;

  for (let i = 0; i < n; i++) {
    let currentValue = arr[i]; // Current value at current index. It is 'taken out' of arr if while loop conditions are met and placed back in arr upon while loop exit.
    let j = i - 1; // The previous index.

    while ((j > -1) && (currentValue < arr[j])) {
      arr[j + 1] = arr[j]; // If arr contains previous index and current value < previous value, assign value at previous index to current index.
      j--; // Move down one index and repeat previous statement until either an invalid index is reached or current value > previous value.
    }
    arr[j + 1] = currentValue; // When one of the while loop conditions are no longer met, assign current 'taken out' value to the index you are currently on.
  }
  return arr; // Return new arr when for loop conditions are no longer met. This array is sorted in ascending order.
}

output.textContent = insertionSort(arr);