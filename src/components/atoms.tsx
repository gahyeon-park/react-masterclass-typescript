
import { atom, selector } from 'recoil'; 
// selector: atom을 가져와서 그 atom의 "output"을 변형시켜주는 도구 (★state 자체는 바꾸지 않음★)


// todoList 배열에 들어가는 각 todoItem의 type
export interface ITodo {
  id: number;
  text: string;
  category: "TODO"|"DOING"|"DONE";
}

// todoList state는 atom으로 저장하고, 
// 이 todoListState값은 ITodo 인터페이스를 따르는 객체로 이루어진 배열임(<ITodo[]>)을 Atom에 TS 전달
export const todoListState = atom<ITodo[]>({
  key: "todos",
  default: []
})

export const todoSelector = selector({
  key: "todoSelector",
  get: ({ get }) => {
    // ※ 이제 이 selector는 todoListState Atom을 구독하기 때문에 Atom이 변하면, selector도 따라서 바뀐 값을 반환한다.
    const todos = get(todoListState);

    const filtered = [
      todos.filter(todo => todo.category === 'TODO'), 
      todos.filter(todo => todo.category === 'DOING'), 
      todos.filter(todo => todo.category === 'DONE')
    ];

    return filtered;
  }
})