export default function sortItemsForMasonryList(columnsLength: number, array: any[]) {
  const result: any[] = []

  for (let column = 0; column < columnsLength; column++) {
    for (let columnItem = column; columnItem < array.length; columnItem += columnsLength) {
      // console.log(`column ${column} columnItem ${columnItem}`)
      result.push(array[columnItem])
    }
  }

  // notSorted
  // 0 5 10 15 20
  // 1 6 11 16 21
  // 2 7 12 17 22
  // 3 8 13 18 23
  // 4 9 14 19 24

  // may sorted to be
  // 0 - 0 5 - 1 10 - 2 15 - 3 20 - 4

  return result
}
