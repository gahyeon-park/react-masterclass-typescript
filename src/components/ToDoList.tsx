import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import CreateTodo from './CreateTodo';
import Todo from './Todo';
import { todoSelector } from './atoms';

const List = styled.ul`
  margin-top: 20px
`;

function TodoList() {
  const [todos, doing, done] = useRecoilValue(todoSelector); // todoListState가 아닌 selector값 가져오기
  // todoSelector = [[category가 todo인 배열], [category가 doing인 배열], [category가 done인 배열]]
  // const [todo, setTodo] = useState('')에서 쓴 것과 같은 문법으로 [todos, doing, done] 가져옴.

  return (
    <div>
      <h1>To dos</h1>
      <hr />
      <CreateTodo />
      <h2>To Do</h2>
      <List>
        {todos.map(todo => <Todo key={todo.id} {...todo}  />)}
      </List>
      <hr />
      <h2>Doing</h2>
      <List>
        {doing.map(todo => <Todo key={todo.id} {...todo}  />)}
      </List>
      <hr />
      <h2>Done</h2>
      <List>
        {done.map(todo => <Todo key={todo.id} {...todo}  />)}
      </List>
      <hr />
    </div>
  )
}

export default TodoList;