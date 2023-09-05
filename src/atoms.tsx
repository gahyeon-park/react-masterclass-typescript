
import { atom, selector } from 'recoil'; 
// selector: atom을 가져와서 그 atom의 "output"을 변형시켜주는 도구 (★state 자체는 바꾸지 않음★)

interface ITodoListState {
  [key: string]: string[];
}

export const todoListState = atom<ITodoListState>({
  key: "toDo",
  default: {
    "to do": ["a", "b"],
    doing: ["c", "d", "E"],
    done: ["F"],
    "do later": ["x", "z"]
  }
});