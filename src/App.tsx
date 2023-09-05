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
  const onDragEnd = (info : DropResult) => {
    console.log("dragging finished", info);

    const { destination, source } = info;

    if(!destination) return;
    if(destination?.droppableId === source.droppableId) {
      // same board movement
      setTodos(allBoards => {
        const boardCopied = [...allBoards[source.droppableId]];
        const dragTarget = boardCopied[source.index];
        boardCopied.splice(source.index, 1);
        boardCopied.splice(destination?.index, 0, dragTarget);
        
        return {
          ...allBoards,
          [source.droppableId]: boardCopied
        };
      });
    }

    if(destination.droppableId !== source.droppableId) {
      // across board movement
      setTodos(allBoards => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const dragTarget = sourceBoard[source.index];
        const destinationBoard = [...allBoards[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination.index, 0, dragTarget);

        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard
        }
      });
    }
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