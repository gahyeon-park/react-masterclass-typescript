
import { atom, selector } from 'recoil'; 
// selector: atom을 가져와서 그 atom의 "output"을 변형시켜주는 도구 (★state 자체는 바꾸지 않음★)

export const minuteState = atom({
  key: "minutes",
  default: 0
});

// ※ minutes과 hours 2개의 atom을 만들지 않는 것이 핵심.
// minutes만 atom에 저장하고, 
// minutes 입력 시, hourSelector의 get property에서 변환한 값을 hours input value로 사용
// hours 입력 시, hourselector의 set property에서 입력한 값(newValue)을 받아 변환 후 set함수로 minute atom값을 업데이트.
export const hourSelector = selector<number>({
  key: "mSelector",
  get: ({get}) => {
    const m = get(minuteState);
    return m / 60;
  },
  set: ({set}, newValue) => {
    console.log('newValue', newValue);
    const m = Number(newValue) * 60;
    set(minuteState, m);
  }
})