import { add as addArray, sub as subArray } from "./helper/operation";

export type BigNumberProps = BigNumber | number
type Radix = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36;


export default class BigNumber {
  public isBigNumber = true;
  private integer = [];
  private decimal = [];
  private isNegative = false;

  constructor(number?: string | number);
  constructor(number: BigNumber);
  constructor(number: { integer: number[]; decimal?: number[], isNegative?: boolean; });
  constructor(number) {
    if (number !== 0 && !number) {
      return;
    }

    if (number instanceof BigNumber) {
      this.integer = number.getInteger();
      this.decimal = number.getDecimal();
      this.isNegative = number.getIsNegative();
      return;
    }

    if (typeof number === 'object') {
      this.integer = number.integer;
      this.decimal = number.decimal || [];
      this.isNegative = !!number.isNegative;
      return;
    }

    if ((typeof number !== 'number') && (typeof number !== 'string')) {
      throw new Error(`invalid type: ${number}`);
    }

    const validReg = /^(-?\d+\.\d+)$|^(-?\d+)$/
    const numberString = `${number}`;

    if (!validReg.test(numberString)) {
      throw new Error(`invalid number: ${number}`);
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

  public getInteger() {
    return this.integer.slice(0);
  }

  private setInteger(newInteger: number[]) {
    this.integer = newInteger;
  }

  public getDecimal() {
    return this.decimal.slice(0);
  }

  private setDecimal(newDecimal: number[]) {
    this.decimal = newDecimal;
  }

  public getIsNegative() {
    return this.isNegative;
  }

  private setIsNegative(newIsNegative: boolean) {
    this.isNegative = newIsNegative;
  }

  public static parse(number: string): BigNumber;
  public static parse(number: number): BigNumber;
  public static parse(number: BigNumber): BigNumber;
  public static parse(number) {
    return new BigNumber(number)
  }

  public add(number: number): BigNumber;
  public add(number: BigNumber): BigNumber;
  public add(number) {
    let toAdd = number;
    if (!(number instanceof BigNumber)) {
      toAdd = new BigNumber(number)
    }

    const isSameSign = this.getIsNegative() === toAdd.getIsNegative();

    if (isSameSign) {
      let integer = addArray(this.getInteger(), toAdd.getInteger());
      let decimal = addArray(this.getDecimal(), toAdd.getDecimal());
      const maxLength = Math.max(this.getDecimal().length, toAdd.getDecimal().length);

      if (decimal.length > maxLength) {
        integer = addArray(integer, [1]);
        decimal = decimal.slice(1);
      }

      return new BigNumber({
        isNegative: this.getIsNegative(),
        integer: integer,
        decimal: decimal
      })
    }

    let { sign: signInteger, result: integer } = subArray(this.getInteger(), toAdd.getInteger());
    let { sign: signDecimal, result: decimal } = subArray(this.getDecimal(), toAdd.getDecimal());


  }

  public sub(reduction: BigNumberProps) {

  }


  // public multiply(...numbers) {
  //   return multiply(this, ...numbers)
  // }


  // public divide(divisor: BigNumberProps) {
  //   return divide(this, divisor)
  // }

  // public pow(exponential: BigNumberProps) {
  //   return pow(this, exponential)
  // }

  // public mod(divisor: BigNumberProps) {
  //   return mod(this, divisor)
  // }


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

  private trimDecimalZero() {
    let lastZeroIndex = this.decimal.length;
    for (let i = this.decimal.length - 1; i >= 0; i--) {
      lastZeroIndex = i + 1;
      if (this.decimal[i]) break;
    }

    if (lastZeroIndex === 1 && this.decimal[0] === 0) {
      lastZeroIndex = 0;
    }

    return this.decimal.slice(0, lastZeroIndex);
  }

  public abs() {
    return new BigNumber({ integer: this.getInteger(), decimal: this.getDecimal() })
  }

  public round() {
    return null;
  }

  public toString(radix: Radix = 10) {
    const digits = '0123456789abcdefghijklmnopqrstuvwxyz'.substring(0, radix);
    const decimal = this.trimDecimalZero()
    if (radix === 10) {
      if (!decimal.length) return `${this.isNegative ? '-' : ''}${this.integer.join('')}`;
      return `${this.isNegative ? '-' : ''}${this.integer.join('')}.${decimal.join('')}`;
    }

    const integers = [];
    const decimals = [];


    return `${this.isNegative ? '-' : ''}${integers.join('')}.${decimals.join('')}`;
  }
}
