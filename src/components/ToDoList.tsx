import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import CreateTodo from './CreateTodo';
import Todo from './Todo';
import { todoListState } from './atoms';

const List = styled.ul`
  margin-top: 20px
`;

function TodoList() {
  const todos = useRecoilValue(todoListState);

  return (
    <div>
      <h1>To dos</h1>
      <hr />
      <CreateTodo />
      <List>
        {/* Todo 컴포넌트에서 props의 type이 ITodo 인터페이스이기 때문에, ITodo에 정의된 속성(id, text, category) 3개를 전부 props로 전달해야 함 */}
        {/* id={todo.id} text={todo.text} category={todo.category} ← 이렇게 펼쳐 써도 되지만,
            todos의 todo객체가 ITodo 인터페이스 속성 그대로 똑같이 들어갔기 때문에 스프레드 연산자(...)를 써서 전달할 수 있다. */}
        {todos.map(todo => <Todo key={todo.id} {...todo}  />)}
      </List>
    </div>
  )
}

export default TodoList;