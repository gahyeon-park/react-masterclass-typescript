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

interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  password1: string;
  password2: string;
  extraError?: string;
}

function TodoList() {
  const { register, handleSubmit, formState: { errors }, setError } = useForm<IForm>({ defaultValues: { email: "@naver.com" }});
  const onValid = (data: IForm) => {
    // 데이터가 유효할 경우 실행됨.
    console.log("isValid", data);
    
    if(data.password1 !== data.password2) {
      setError("password2", { message: "your password are not the same" }, { shouldFocus: true });
    }

    // setError("extraError", { message: "Server offline." }) // 특정 항목에 해당되는 에러가 아닌, 전체 form에 해당되는 에러
  }
  
  const onInvalid = (data: any) => {
    // 데이터가 유효하지 경우 실행됨.
    console.log('isInValid: ', data);
  }

  return (
    <div>
      <form style={{display: "flex", flexDirection: "column"}} onSubmit={handleSubmit(onValid, onInvalid)}>
        <input {...register("email", { required: "Email is required", pattern: { value: /^[A-Za-z0-9._%+-]+@naver.com$/, message: "Only naver.com emails allowed" } })}  placeholder="Email" />
        <span>{errors?.email?.message}</span>
        <input {...register("firstName", { required: "FirstName is required", validate: {
          checkNico: value => value.includes("nico") ? "no nico allowed" : true,
          checkIsNumber: value => { 
            const newVal = value.split("");
            return newVal.every(str => isNaN(Number(str))) ? true : "Write text only"
          }
        } })}  placeholder="First Name" />
        <span>{errors?.firstName?.message }</span>
        <input {...register("lastName", { required: "LastName is required" })}  placeholder="last Name" />
        <span>{errors?.lastName?.message }</span>
        <input {...register("userName", { required: "UserName is required", minLength: 10 })}  placeholder="UserName" />
        <span>{errors?.userName?.message }</span>
        <input 
          {...register("password1", { 
            required: "password is required", 
            minLength: { value: 5, message: "Your password is too short" }
          })}  
          placeholder="Password" />
        <span>{errors?.password1?.message }</span>
        <input {...register("password2", { required: "Please write your password once more.", minLength: 5 })}  placeholder="Password" />
        <span>{errors?.password2?.message }</span>
        <button>Add</button>
        <span>{errors?.extraError?.message}</span>
      </form>
    </div>
  )
}

export default TodoList;