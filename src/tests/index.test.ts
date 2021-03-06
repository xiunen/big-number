import BigNumber from '../BigNumber'
import { add } from '../BigNumberMath'

describe('big number', () => {
  test('toFixed', () => {
    expect((new BigNumber(1.1)).toFixed(0)).toEqual('1')
    expect((new BigNumber(1.1)).toFixed(2)).toEqual('1.10')
    expect((new BigNumber(1.115)).toFixed(2)).toEqual('1.12')
    expect((new BigNumber(-1.115)).toFixed(2)).toEqual('-1.12')
    expect((new BigNumber(1.099)).toFixed(2)).toEqual('1.10')
    expect((new BigNumber(1.999)).toFixed(2)).toEqual('2.00')
    expect((new BigNumber(-1.999)).toFixed(2)).toEqual('-2.00')
    expect((new BigNumber(99.999)).toFixed(2)).toEqual('100.00')
  })

  // test('add', () => {
  //   const num1 = new BigNumber(9.4091)
  //   const num2 = new BigNumber(1.63803)
  //   const num3 = new BigNumber(4721)
  //   const num4 = new BigNumber(90938)
  //   const num5 = new BigNumber(-9093)
  //   const num6 = new BigNumber(-82.399213)
  //   // expect(add(num1, num2)).toEqual('11.04713')
  // })

  test('toString', () => {
    const num5 = new BigNumber(-9093)
    const num1 = new BigNumber(9.4091)
    expect(num5.toString()).toEqual('-9093')
    expect(num1.toString()).toEqual('9.4091')
  })

  test('abs', () => {
    expect((new BigNumber('21.000')).abs().toString()).toEqual('21')
    expect((new BigNumber('-21.000')).abs().toString()).toEqual('21')
    expect((new BigNumber('-2.0')).abs().toString()).toEqual('2')
    expect((new BigNumber('-2.01')).abs().toString()).toEqual('2.01')
    expect((new BigNumber('-2.1')).abs().toString()).toEqual('2.1')
    expect((new BigNumber('-2.100')).abs().toString()).toEqual('2.1')
    expect((new BigNumber('0.0')).abs().toString()).toEqual('0')
    expect((new BigNumber('-0.0')).abs().toString()).toEqual('0')
  })

  test('add', () => {
    expect(add(1.92, 1.23).toString()).toEqual('3.15')
  })
})