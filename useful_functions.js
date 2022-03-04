export function sortByProp(arr, prop) {
  return arr.sort((a, b) => {
    a = parseInt(a[prop]);
    b = parseInt(b[prop]);
    return b - a;
  })
}