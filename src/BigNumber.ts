import { add as addArray, sub as subArray } from "./helper/operation";

export type BigNumberProps = BigNumber | number
type Radix = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36;


export default class BigNumber {
  public isBigNumber = true;
  private integer = [];
  private decimal = [];
  private isNegative = false;

  constructor(number: any) {
    if ((typeof number !== 'number') && (typeof number !== 'string')) {
      throw new Error('invalid type');
    }

    const validReg = /^(-?\d+\.\d+)$|^(-?\d+)$/
    const numberString = `${number}`;

    if (!validReg.test(numberString)) {
      throw new Error('invalid number');
    }

    if (numberString.startsWith('-')) {
      this.isNegative = true;
    }

    const unsignNumberString = this.isNegative ? numberString.substring(1) : numberString;
    const [integerString, decimalString] = unsignNumberString.split('.');

    this.integer = integerString.split('').map((i: string) => parseInt(i, 10))

    if (decimalString) {
      this.decimal = decimalString.split('').map((i: string) => parseInt(i, 10))
    }
  }

  public static parse(number: any) {
    if (number instanceof BigNumber) return number;
    return new BigNumber(number)
  }

  public add(...numbers) {
    return add(this, ...numbers)
  }

  public sub(reduction: BigNumberProps) {
    return sub(this, reduction)
  }


  public multiply(...numbers) {
    return multiply(this, ...numbers)
  }


  public divide(divisor: BigNumberProps) {
    return divide(this, divisor)
  }

  public pow(exponential: BigNumberProps) {
    return pow(this, exponential)
  }


  public toFixed(number: number) {
    if (number <= 0) {
      return `${this.isNegative ? '-' : ''}${this.integer.join('')}`;
    }

    const zeroFillArray = new Array(number)
    zeroFillArray.fill(0);
    const decimals = [...this.decimal, ...zeroFillArray];

    if (decimals[number] < 5) {
      return `${this.isNegative ? '-' : ''}${this.integer.join('')}.${decimals.slice(0, number).join('')}`
    }

    const newDecimals = addArray(decimals.slice(0, number), [1]);
    if (newDecimals.length <= number) {
      return `${this.isNegative ? '-' : ''}${this.integer.join('')}.${newDecimals.join('')}`
    }

    const newIntegers = addArray(this.integer, [1]);
    return `${this.isNegative ? '-' : ''}${newIntegers.join('')}.${newDecimals.slice(1).join('')}`
  }


  public toString(radix: Radix = 10) {
    const digits = '0123456789abcdefghijklmnopqrstuvwxyz'.substring(0, radix);
    if (radix === 10) {
      if (!this.decimal.length) return `${this.isNegative ? '-' : ''}${this.integer.join('')}`;
      return `${this.isNegative ? '-' : ''}${this.integer.join('')}.${this.decimal.join('')}`;
    }

    const integers = [];
    const decimals = [];
    if (this.integer.length < 2) {
      integers.push(...this.integer);
    } else {
      const first2 = parseInt(this.integer.slice(0, 2).join(''), 10)
      if (first2 < radix) {
        integers.push(digits[first2]);
      } else {

      }
    }

    return `${this.isNegative ? '-' : ''}${integers.join('')}.${decimals.join('')}`;
  }
}

export const add = (...numbers) => {

}

export const sub = (number: BigNumberProps, reduction: BigNumberProps) => {

}


export const multiply = (...numbers) => {

}


export const divide = (number: BigNumberProps, divisor: BigNumberProps) => {

}


export const pow = (number: BigNumberProps, exponential: BigNumberProps) => {

}

export const round = (number: BigNumberProps) => {
  // if (!number.isBigNumber) {
  //   return number;
  // }
}