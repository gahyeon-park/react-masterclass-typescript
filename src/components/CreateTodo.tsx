import { useForm } from "react-hook-form";
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { todoListState, categoryState } from './atoms';


// input에 입력하는 todo값의 type
interface IForm {
  todo: string;
}

function CreateTodo() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const setTodos = useSetRecoilState(todoListState);
  const category = useRecoilValue(categoryState);

  const isValidHandler = (data: IForm) => {
    addTodo(data.todo);
    setValue("todo", "");
  }
  
  const addTodo = (todo: string) => {
    setTodos(oldTodos => [
      {
        id: Date.now(),
        text: todo,
        category: category
      },
      ...oldTodos,
    ]);
  }

  return (
    <form onSubmit={handleSubmit(isValidHandler)}>
      <input type="text" { ...register("todo", { required: "write a your todo" })} placeholder="Write a to do" />
      <button>Add</button>
    </form>
  );
}

export default CreateTodo;