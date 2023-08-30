import styled from 'styled-components';
import { ITodo, todoListState } from './atoms';
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
  
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { currentTarget: { name }} = event;
    console.log(todos);
    
    setTodos(oldTodos => {
      const targetIdx = oldTodos.findIndex(todo => todo.id === id);
      const oldTodo = oldTodos[targetIdx];
      const newTodo = {text, id, category: name};
      
       return oldTodos;
    });
  }

  return (
    <Li>
      <span>{text}</span>
      {category !== "TODO" && <button name="TODO" onClick={onClick}>To do</button>}
      {category !== "DOING" && <button name="DOING" onClick={onClick}>Doing</button>}
      {category !== "DONE" && <button name="DONE" onClick={onClick}>Done</button>}
    </Li>
  );

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