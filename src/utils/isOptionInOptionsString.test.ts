import { isOptionInOptionsString } from "./isOptionInOptionsString";

describe('isOptionInOptionsString', () => {
  it('isOptionInOptionsString true', () => {
    expect(isOptionInOptionsString('sSs', 'ww,Sss ,ede')).toBeTruthy();
  })
  it('isOptionInOptionsString false', () => {
    expect(isOptionInOptionsString('sSs', 'ww,S s s ,ede')).toBeFalsy();
  })
})
