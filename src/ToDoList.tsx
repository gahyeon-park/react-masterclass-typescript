import { useState } from "react";
import { useForm } from 'react-hook-form';

// function TodoList() {
//   const [todo, setTodo] = useState("");

//   const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//     const { currentTarget: { value }} = event;
//     setTodo(value);
//   }

//   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     console.log(todo);
//   }
  
//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input type="text" onChange={onChange} value={todo} placeholder="Write a to do" />
//         <button>Add</button>
//       </form>
//     </div>
//   )
// }

function TodoList() {
  const { register, watch } = useForm();
  console.log(watch());
  
  
  return (
    <div>
      <form action="">
        <input {...register("email")}  placeholder="Email" />
        <input {...register("firstName")}  placeholder="First Name" />
        <input {...register("lastName")}  placeholder="last Name" />
        <input {...register("userName")}  placeholder="UserName" />
        <button>Add</button>
      </form>
    </div>
  )
}

export default TodoList;