import { useForm } from 'react-hook-form';
import { atom, useRecoilState } from 'recoil';
import styled from 'styled-components';

const List = styled.ul`
  margin-top: 20px
`;

const Li = styled.li`
  padding-left: 10px;

  &:before {
    content: '· ';
  }

  &:not(:first-child) {
    margin-top: 5px;
  }
`;

// input에 입력하는 todo값의 type
interface IForm {
  todo: string;
}

// todoList 배열에 들어가는 각 todoItem의 type
interface ITodo {
  id: number;
  text: string;
  category: "TODO"|"DOING"|"DONE";
}

// todoList state는 atom으로 저장하고, 
// 이 todoListState값은 ITodo 인터페이스를 따르는 객체로 이루어진 배열임(<ITodo[]>)을 Atom에 TS 전달
const todoListState = atom<ITodo[]>({
  key: "todos",
  default: []
})

function TodoList() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  // const todoList = useRecoilValue(todoListState); // atom 가져오기(A)
  // const setTodoList = useSetRecoilState(todoListState); // atom 값 변경하기(B)
  const [todos, setTodos] = useRecoilState(todoListState); // atom값(A)과 atom값 변경함수(B)를 동시에 배열로 얻는다.(useState랑 동일하게 작동)

  const isValidHandler = (data: IForm) => {
    console.log('add todo', data.todo);
    
    addTodo(data.todo);
    setValue("todo", "");
  }

  console.log(todos);
  
  const addTodo = (todo: string) => {
    setTodos(oldTodos => [
      {
        id: Date.now(),
        text: todo,
        category: "TODO"
      },
      ...oldTodos,
    ]);
  }

  return (
    <div>
      <h1>To dos</h1>
      <hr />
      <form onSubmit={handleSubmit(isValidHandler)}>
        <input type="text" { ...register("todo", { required: "write a your todo" })} placeholder="Write a to do" />
        <button>Add</button>
      </form>
      <List>
        {todos.map(todo => <Li key={todo.id}>{todo.text}</Li>)}
      </List>
    </div>
  )
}

export default TodoList;