import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import { todoListState } from './atoms';
import styled from 'styled-components';
import Board from './components/Board';

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
`;


function App() {
  const [todos, setTodos] = useRecoilState(todoListState);
  const onDragEnd = ({ draggableId, destination, source } : DropResult) => {
    // console.log("dragging finished", args.source.index, args.destination.index);

    // if(!destination) return;
    // setTodos(oldTodos => {
    //   const todosCopied = [...oldTodos];
    //   todosCopied.splice(source.index, 1);
    //   todosCopied.splice(destination?.index, 0, draggableId);

    //   return todosCopied;
    // });
  }
  console.log(todos);

 
  return <DragDropContext onDragEnd={onDragEnd}>
    <Wrapper>
      <Boards>
        {Object.keys(todos).map(boardId => <Board boardId={boardId} key={boardId} todos={todos[boardId]} />)}
      </Boards>
    </Wrapper>
  </DragDropContext>
}

export default App;