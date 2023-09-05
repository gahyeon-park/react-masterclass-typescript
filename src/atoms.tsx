
import { atom, selector } from 'recoil'; 
// selector: atom을 가져와서 그 atom의 "output"을 변형시켜주는 도구 (★state 자체는 바꾸지 않음★)

export const todoListState = atom({
  key: "toDo",
  default: ["a", "b", "c", "d", "e", "f"]
});