export const add = (left: number[], right: number[]) => {
  const result = [];
  let increment = 0; //进位
  const length = Math.max(left.length, right.length);
  const leftReversed = left.slice().reverse();
  const rightRevered = right.slice().reverse();
  const incrementStep = 10;
  for (let i = 0; i < length; i++) {
    const t = (leftReversed[i] || 0) + (rightRevered[i] || 0) + increment;
    result[i] = t % incrementStep;
    increment = Math.floor(t / incrementStep);
  }
  if (increment) {
    result.push(increment);
  }
  return result.reverse();
}

export const sub = (left: number[], right: number[]) => {
  const sign = greater(left, right); //true false positive, false for negative
  let decrement = 0; //借位
  const greaterReversed = sign ? left.slice().reverse() : right.slice().reverse();
  const lessReversed = sign ? right.slice().reverse() : left.slice().reverse();
  const result = [];
  const decrementStep = 10;
  for (let i = 0; i < greaterReversed.length; i++) {
    const toSub = (lessReversed[i] || 0) + decrement;
    result[i] = greaterReversed[i] - toSub;
    if (result[i] < 0) {
      result[i] = result[i] + decrementStep;
      decrement = 1;
    } else {
      decrement = 0;
    }
  }
  result.reverse();
  const firstGreaterThanZeroIndex = result.findIndex(i => i > 0);
  if (firstGreaterThanZeroIndex < 0) return { sign, result: [] };
  return { sign, result: result.slice(firstGreaterThanZeroIndex) }
}

export const greater = (left: number[], right: number[]) => {
  if (left.length !== right.length) return left.length > right.length;
  for (let i = 0; i < left.length; i++) {
    if (left[i] !== right[i]) return left[i] > right[i];
  }
  return true;
}

export const getDigit = (numbers: number[], radix: number) => {
  if (numbers.length < 2) {
    return numbers;
  }

  const digits = '0123456789abcdefghijklmnopqrstuvwxyz'.substring(0, radix);
  const first2 = parseInt(numbers.slice(0, 2).join(''), 10);

  if (first2 < radix) {
    return [digits[first2]];
  }
  const result = [];

  return result;
}