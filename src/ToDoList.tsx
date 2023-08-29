import { useForm } from 'react-hook-form';

interface IForm {
  todo: string;
}

function TodoList() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const isValidHandler = (data: IForm) => {
    console.log('add todo', data.todo);
    
    setValue("todo", "");
  }

  return (
    <div>
      <form onSubmit={handleSubmit(isValidHandler)}>
        <input type="text" { ...register("todo", { required: "write a your todo" })} placeholder="Write a to do" />
        <button>Add</button>
      </form>
    </div>
  )
}


export default TodoList;