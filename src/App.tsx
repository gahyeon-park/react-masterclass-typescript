import { useState } from 'react';

function App() {
  const [value, setValue] = useState("");

  // 1. React.FormEvent: ReactJS 내의 FormEvent를 사용. (react내 이벤트명이 javascript와 동일하진 않기 때문에 직관적으로 찾기 어려움. 추후 작업 시 어떤 이벤트를 사용할지 찾으려면 구글링해보자)
  // 2. React.FormEvent<HTMLInputElement> : 타입스크립트에게 onchange 함수가 InputElement에 의해 실행될 것을 알려준다
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
    const { currentTarget : { value }} = e;
    setValue(value);
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('hello', value);
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" value={value} onChange={onChange} placeholder="username" />
        <button>Log in</button>
      </form>
    </div>
  )
}

export default App;