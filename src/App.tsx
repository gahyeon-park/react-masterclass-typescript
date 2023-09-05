import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import { todoListState } from './atoms';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  grid-template-colomns: repeat(1, 1fr);
  width: 100%;
`;

const Board = styled.div`
  min-height: 200px;
  padding: 20px 10px;
  padding-top: 30px;
  border-radius: 5px;
  background-color: ${props => props.theme.boardColor};
`;

const Card = styled.div`
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 5px;
  background-color: ${props => props.theme.cardColor};
`;

function App() {
  const [todos, setTodos] = useRecoilState(todoListState);
  const onDragEnd = ({ draggableId, destination, source } : DropResult) => {
    // console.log("dragging finished", args.source.index, args.destination.index);

    if(!destination) return;
    setTodos(oldTodos => {
      const todosCopied = [...oldTodos]; // splice는 원본배열을 수정하므로 todos배열 복사본으로 작업한다.
      // 1. Delete item on source.index
      todosCopied.splice(source.index, 1);
      // 2. Put back the item on the destination.index
      todosCopied.splice(destination?.index, 0, draggableId);

      return todosCopied;
    });
  }
  console.log(todos);
  

  return <DragDropContext onDragEnd={onDragEnd}>
    <Wrapper>
      <Boards>
        <Droppable droppableId="one">
          {(provided) => 
            <Board ref={provided.innerRef} {...provided.droppableProps}>
              {todos.map((todo, idx) => (
                // ※ react-beautiful-dnd에서 key와 draggableId는 같아야 함.
                <Draggable key={todo} draggableId={todo} index={idx}>
                  {(provided) => (
                    <Card 
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}>
                      {todo}
                    </Card>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Board>
          }
        </Droppable>
      </Boards>
    </Wrapper>
  </DragDropContext>
}

export default App;