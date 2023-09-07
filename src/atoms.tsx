
import { atom, selector } from 'recoil'; 
// selector: atom을 가져와서 그 atom의 "output"을 변형시켜주는 도구 (★state 자체는 바꾸지 않음★)

export interface ITodo {
  id: number;
  text: string;
}

interface ITodoListState {
  [key: string]: Array<ITodo>;
}

const localStorageEffect = (key: string) => ({setSelf, onSet} : any) => {
  // 앱 실행하자마자 호출됨
  const savedValue = localStorage.getItem(key)
  if(savedValue != null) {
    console.log('Atom localStorage Effect >>>>>> savedValue:', savedValue);
    setSelf(JSON.parse(savedValue));
    // setSelf(): 로컬스토리지에 "myTodos" 값이 저장되 있을 경우, 그 값으로 바로 자기 자신인 toDo atom의 값으로 설정.
  }

  // onSet(): toDo Atom에 변경사항이 생기면 실행됨.
  onSet((newValue: ITodoListState, _: any, isReset: boolean) => {
    console.log('Atom localStorage Effect >>>>>> newValue:', newValue, 'isReset:', isReset);
    
    isReset
    ? localStorage.removeItem(key)
    : localStorage.setItem(key, JSON.stringify(newValue));
  })
}

export const todoListState = atom<ITodoListState>({
  key: "toDo",
  default: {
    "to do": [],
    doing: [],
    done: []
  },
  effects: [
    localStorageEffect("myTodos")
  ]
});