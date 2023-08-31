import { useRecoilValue, useRecoilState } from 'recoil';
import styled from 'styled-components';
import CreateTodo from './CreateTodo';
import Todo from './Todo';
import { todoSelector, categoryState, Categories } from './atoms';

const List = styled.ul`
  margin-top: 20px
`;

function TodoList() {
  const filteredList = useRecoilValue(todoSelector);
  const [category, setCategory] = useRecoilState(categoryState);

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    console.log('cate type', typeof event.currentTarget.value);
    
    setCategory(event.currentTarget.value as Categories);
  }

  console.log("filteredList", filteredList);
  
  return (
    <div>
      <h1>To dos</h1>
      <hr />
      <form>
        <select value={category} onInput={onInput}>
          <option value={Categories.TODO}>To Do</option>
          <option value={Categories.DOING}>Doing</option>
          <option value={Categories.DONE}>Done</option>
        </select>
      </form>
      <CreateTodo />
      <List>
        {filteredList.map(todo => <Todo key={todo.id} {...todo} />)}
      </List>
    </div>
  )
}

export default TodoList;