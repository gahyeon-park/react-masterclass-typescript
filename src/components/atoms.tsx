
import { atom } from 'recoil';

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