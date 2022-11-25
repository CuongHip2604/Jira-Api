export function swapArrayElements(arr: [], fromIndex: number, toIndex: number) {
  const temp = arr[fromIndex];
  arr[fromIndex] = arr[toIndex];
  arr[toIndex] = temp;

  return arr;
}
