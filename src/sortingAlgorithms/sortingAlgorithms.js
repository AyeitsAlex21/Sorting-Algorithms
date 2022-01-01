export function getHeapSortAnimation(array) {
  const ExtraArray = array.slice();
  const animations = [];
  HeapSort(ExtraArray, animations);
  return animations;
}

function HeapSort(array, animations) {
  var n = array.length;
  // Build heap (rearrange array)
  for (var i = Math.floor(n / 2) - 1; i >= 0; i--)
    heapify(array, n, i, animations);

  // One by one extract an element from heap
  for (var i = n - 1; i > 0; i--) {
    // Move current root to end
    animations.push([i, 0]);
    animations.push([i, 0]);
    animations.push([i, array[0], 0, array[i]])

    var temp = array[0];
    array[0] = array[i];
    array[i] = temp;

    // call max heapify on the reduced heap
    heapify(array, i, 0, animations);
  }
}

function heapify(array, n, i, animations) {
  var largest = i; // Initialize largest as root
  var l = 2 * i + 1; // left = 2*i + 1
  var r = 2 * i + 2; // right = 2*i + 2

  // If left child is larger than root
  if (l < n && array[l] > array[largest])
    largest = l;

  // If right child is larger than largest so far
  if (r < n && array[r] > array[largest])
    largest = r;

  // If largest is not root
  if (largest != i) {
    animations.push([i, largest]);
    animations.push([i, largest]);
    animations.push([i, array[largest], largest, array[i]])

    var swap = array[i];
    array[i] = array[largest];
    array[largest] = swap;

    // Recursively heapify the affected sub-tree
    heapify(array, n, largest, animations);
  }
}

// --------------------------------------------------------------------------------------------

export function getQuickSortAnimation(array) {
  const ExtraArray = array.slice();
  const animations = [];
  quickSort(ExtraArray, 0, ExtraArray.length - 1, animations);
  return animations;
}

function quickSort(items, left, right, animations) {
  var index;
  if (items.length > 1) {
    index = partition(items, left, right, animations); //index returned from partition
    if (left < index - 1) { //more elements on the left side of the pivot
      quickSort(items, left, index - 1, animations);
    }
    if (index < right) { //more elements on the right side of the pivot
      quickSort(items, index, right, animations);
    }
  }
  return animations;
}

function swap(items, first, second) {
  var temp = items[first];
  items[first] = items[second];
  items[second] = temp;
}

function partition(items, left, right, animations) {
  var pivot = items[Math.floor((right + left) / 2)]; // get pivot which is in middle
  var i = left;
  var j = right;

  while (i <= j) {
    while (items[i] < pivot) {
      i++;
    }
    while (items[j] > pivot) {
      j--;
    }
    if (i <= j) {
      animations.push([i, j]);
      animations.push([i, j]);
      animations.push([i, items[j], j, items[i]])

      swap(items, i, j); //swap two elements if both found something
      i++;
      j--;
    }
  }
  return i;
}

// --------------------------------------------------------------------------------------------

export function getBubbleSortAnimation(array) {
  const ExtraArray = array.slice();
  const animations = [];
  const size = ExtraArray.length;
  var i, j;

  if (ExtraArray.length <= 1)
    return ExtraArray;

  // sorting array now
  for (i = 0; i < size - 1; i++) {
    for (j = 0; j < size - i - 1; j++) {
      if (ExtraArray[j] > ExtraArray[j + 1]) {
        // pushing the animations
        animations.push([j, j + 1]);
        animations.push([j + 1, j]);
        animations.push([j, ExtraArray[j + 1], j + 1, ExtraArray[j]])

        var temp = ExtraArray[j];
        ExtraArray[j] = ExtraArray[j + 1];
        ExtraArray[j + 1] = temp;
      }
    }
  }
  return animations;
}

// --------------------------------------------------------------------------------------------

export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations,) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}
