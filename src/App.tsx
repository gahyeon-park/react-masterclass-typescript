import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import { todoListState } from './atoms';
import styled from 'styled-components';
import Board from './components/Board';
import trashImg from './img/trash-can.png';
import { useForm } from 'react-hook-form';

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Form = styled.form`
  grid-column: 1 / span 3;
  padding-bottom: 10px;
  text-align: center;
  
  input {
    width: 50%;
    padding: 4px 10px;
    border-radius: 5px;
  }
`;

const Boards = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
`;

interface IDelZone {
  $isDraggingOver: boolean;
  $isDraggingFromThis: boolean;
}

const DelZone = styled.div<IDelZone>`
  grid-column: 1 / span 3;
  padding: 20px;
  background-color: ${props => props.$isDraggingOver ? `rgba(225, 225, 225, .5)`: `transparent`};
  border-radius: 5px;
  border: 3px dashed rgba(225, 225, 225, .5);
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  font-style: italic;
  color: rgba(225, 225, 225, .5);

  p {
    position: relative;
    display: inline-block;
    padding-left: 30px;

    &:before {
      content: '';
      display: block;
      position: absolute;
      left: 0;
      top: 50%;
      margin-top: -10px;
      width: 20px;
      height: 20px;
      padding-right: 10px;
      background: url('${trashImg}') no-repeat 0 0/20px auto;
      vertical-align: middle;
      opacity: 0.5;
    }
  }
`;

interface IBoardField {
  boardName: string;
}

function App() {
  const [todos, setTodos] = useRecoilState(todoListState);
  const { register, handleSubmit, setValue } = useForm<{boardName: string}>();
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
      // 항목 삭제
      if(destination.droppableId === "delZone") {
        setTodos(allBoards => {
          const targetBoard = [...allBoards[source.droppableId]];
          targetBoard.splice(source.index, 1);

          return {
            ...allBoards,
            [source.droppableId]: targetBoard
          }
        });
        return;
      }
 
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
  // console.log(todos);

  const onValid = ({ boardName }: IBoardField) => {
    console.log('Add Board', boardName);
    setTodos(allBoards => {
      return {
        ...allBoards,
        [boardName]: [] 
      }
    });
    setValue("boardName", "");
  }
 
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          <Form onSubmit={handleSubmit(onValid)}>
            <input type="text" placeholder="add another board" {...register("boardName")} />
          </Form>
          {Object.keys(todos).map(boardId => 
            <Board boardId={boardId} key={boardId} todos={todos[boardId]} />
          )}
          <Droppable droppableId="delZone">
            {(provided, snapshot) => (
              <DelZone
                $isDraggingOver={snapshot.isDraggingOver} 
                $isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)} 
                ref={provided.innerRef} 
                {...provided.droppableProps}
              >
                <p>delete Item</p>
                {provided.placeholder}
              </DelZone>
            )}
          </Droppable>
        </Boards>
      </Wrapper>
    </DragDropContext>
  )
}

export default App;