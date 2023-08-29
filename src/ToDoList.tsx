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
  const { register, handleSubmit, formState } = useForm();
  const onValid = (data: any) => {
    // 데이터가 유효할 경우 실행됨.
    console.log('isValid: ', data);
  }
  
  const onInvalid = (data: any) => {
    // 데이터가 유효하지 경우 실행됨.
    console.log('isInValid: ', data);
  }

  console.log(formState.errors);
  
  
  return (
    <div>
      <form style={{display: "flex", flexDirection: "column"}} onSubmit={handleSubmit(onValid, onInvalid)}>
        <input {...register("email", { required: true })}  placeholder="Email" />
        <input {...register("firstName", { required: true })}  placeholder="First Name" />
        <input {...register("lastName", { required: true })}  placeholder="last Name" />
        <input {...register("userName", { required: true, minLength: 10 })}  placeholder="UserName" />
        <input 
          {...register("password1", { 
            required: "password1 is required", 
            minLength: { value: 5, message: "Your password is too short" }
          })}  
          placeholder="Password" />
        <input {...register("password2", { required: true, minLength: 5 })}  placeholder="Password" />
        <button>Add</button>
      </form>
    </div>
  )
}

export default TodoList;