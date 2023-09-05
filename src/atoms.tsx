
import { atom, selector } from 'recoil'; 
// selector: atom을 가져와서 그 atom의 "output"을 변형시켜주는 도구 (★state 자체는 바꾸지 않음★)

export interface ITodo {
  id: number;
  text: string;
}

interface ITodoListState {
  [key: string]: Array<ITodo>;
}

export const todoListState = atom<ITodoListState>({
  key: "toDo",
  default: {
    "to do": [{ id: 0, text: "출근"}],
    doing: [{ id: 1, text: "근무"}],
    done: [{id: 2, text: "기상"}]
  }
});