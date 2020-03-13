import BigNumber, { BigNumberProps } from './BigNumber'

export const add = (number: any, ...numbers: any[]) => {
  const first = BigNumber.parse(number);
  return numbers.reduce((lastResult: BigNumber, item: any) => {
    return lastResult.add(item);
  }, first)
}

export const sub = (number: any, reduction: any) => {
  const reducted = new BigNumber(number);
  return reducted.sub(reduction)
}


export const multiply = (...numbers: BigNumberProps[]) => {

}


export const divide = (number: BigNumberProps, divisor: BigNumberProps) => {

}

export const mod = (number: BigNumberProps, divisor: BigNumberProps) => {

}


export const pow = (number: BigNumberProps, exponential: BigNumberProps) => {

}

function abs(number: number): number;
function abs(number: BigNumber): BigNumber;
function abs(number) {
  if (number instanceof BigNumber) {
    return number.abs()
  }
  return Math.abs(number);
}

export { abs };


function round(number: number): BigNumber;
function round(number: BigNumber): BigNumber;

function round(number) {
  const bigNum = BigNumber.parse(number);
  return bigNum.round();
}

export { round }
