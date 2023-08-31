import styled from 'styled-components';
import { ITodo, todoListState, Categories } from './atoms';
import { useRecoilValue, useSetRecoilState } from 'recoil';

const Li = styled.li`
  padding-left: 10px;

  &:before {
    content: '· ';
  }

  &:not(:first-child) {
    margin-top: 5px;
  }
`;

function Todo({ text, category, id }: ITodo) {
  const todos = useRecoilValue(todoListState);
  const setTodos = useSetRecoilState(todoListState);
  
  console.log(todos);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { currentTarget: { name }} = event;
    
    setTodos(oldTodos => {
      const targetIdx = oldTodos.findIndex(todo => todo.id === id);
      const newTodo = { text, id, category: name as any };

      // ※ 기존 todoList 배열 순서를 그대로 유지한 채, 현재 todo의 category만 업데이트한 새 배열이 반환되어야 함.
      const frontArr = oldTodos.slice(0, targetIdx);
      const backArr = oldTodos.slice(targetIdx+1, oldTodos.length);
      
      // 1.1 category값을 onClick 이벤트 객체에서 받을 경우의 타입 지정
      // ↓↓↓↓↓↓↓↓↓↓↓↓↓  ★ TS 에러  ↓↓↓↓↓↓↓↓↓↓↓↓↓
      // Types of property 'category' are incompatible.
      // Type 'string' is not assignable to type '"TODO" | "DOING" | "DONE"'.
      // newTodo의 category에 할당한 name의 type이 string 콘크리트 타입으로 되어있다. (↔ ITodo에는 값이 반드시 "TODO"|"DOING"|"DONE" 중 하나여야 한다고 선언되어 있으므로 에러가 발생하는 것)
      // ∴ 위에 newTodo 초기화에서 category값을 name as any 또는 name as ITodo["category"] 등으로 설정하면 OK.
      oldTodos = [
        ...frontArr,
        newTodo,
        ...backArr
      ]
      
      return oldTodos;
    });
  }

  return (
    <Li>
      <span>{text}</span>
      {category !== Categories.TODO && <button name={Categories.TODO} onClick={onClick}>To do</button>}
      {category !== Categories.DOING && <button name={Categories.DOING} onClick={onClick}>Doing</button>}
      {category !== Categories.DONE && <button name={Categories.DONE} onClick={onClick}>Done</button>}
    </Li>
  );

  // 1.2 category값을 onClick 이벤트리스너에 인자로 전달할 경우의 category 타입 지정
  // 이벤트핸들러에서 파라미터로 받을 때, ITodo["category"] 인터페이스로 타입 지정
  // const onClick = (newCategory: ITodo["category"]) => {
  // }

  // return (
  //   <Li>
  //     <span>{text}</span>
  //     {category !== "TODO" && <button onClick={() => onClick('TODO')}>To do</button>}
  //     {category !== "DOING" && <button onClick={() => onClick('DOING')}>Doing</button>}
  //     {category !== "DONE" && <button onClick={() => onClick('DONE')}>Done</button>}
  //   </Li>
  // );
}

export default Todo;