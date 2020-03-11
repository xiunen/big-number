import { add, sub } from '../operation'

describe('test operation', () => {
  test('add', () => {
    expect(add([1], [1])).toEqual([2]);
    expect(add([1, 2, 4, 9], [2, 6, 1, 2, 5, 8])).toEqual([2, 6, 2, 5, 0, 7]);
  })

  test('sub', () => {
    expect(sub([1], [1])).toEqual([]);
    expect(sub([4, 2, 1, 9], [1, 5, 2])).toEqual([4, 0, 6, 7]);
    expect(sub([1, 5, 2], [4, 2, 1, 9])).toEqual([0, 4, 0, 6, 7]);
  })
})