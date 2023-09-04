
import { atom, selector } from 'recoil'; 
// selector: atom을 가져와서 그 atom의 "output"을 변형시켜주는 도구 (★state 자체는 바꾸지 않음★)

// enumerable(: 열거할 수 있는) 
// └> enum으로 정의하는 이유는 type의 "TODO" | "DOING" | "DONE"과 같이 세 값중 하나를 쓴다고 알려줄 수 있기 때문. 
export enum Categories {
  "TODO" = "TODO", // (enum member) Categories["TODO"] = 0
  "DOING" = "DOING", // (enum member) Categories["DOING"] = 1
  "DONE" = "DONE" // (enum member) Categories["DONE"] = 2
}
// enumerable의 값은 숫자로 표현된다.

// todoList 배열에 들어가는 각 todoItem의 type
export interface ITodo {
  id: number;
  text: string;
  category: Categories;
}

export const categoryState = atom<Categories>({  // atom<ITodo["category"]> 도 가능
  key: "category",
  default: Categories.TODO  // 0/1/2 중에 하나로 써도 됨.
})

const localStorageEffect = (key: string) => ({setSelf, onSet}: any) => {
  const savedTodos = localStorage.getItem(key);
  if (savedTodos != null) {
    // setSelf -> Callbacks to set or reset the value of the atom.
    setSelf(JSON.parse(savedTodos));
  }
  console.log("localStorageEffect", savedTodos);

  // onSet -> Subscribe to changes in the atom value.
  onSet((newTodos: Array<ITodo>, _: any, isReset: boolean) => {
    isReset
      ? localStorage.removeItem(key)
      : localStorage.setItem(key, JSON.stringify(newTodos));
  });
};

export const todoListState = atom<ITodo[]>({
  key: "todos",
  default: JSON.parse(window.localStorage.getItem("myTodo") || `[]`),
  effects: [
    localStorageEffect('myTodo')
  ]
})

export const todoSelector = selector({
  key: "todoSelector",
  get: ({ get }) => {
    // ※ 이제 이 selector는 todoListState Atom을 구독하기 때문에 Atom이 변하면, selector도 따라서 바뀐 값을 반환한다.
    const todos = get(todoListState);
    const category = get(categoryState);  

    return todos.filter(todo => todo.category === category);
  }
})