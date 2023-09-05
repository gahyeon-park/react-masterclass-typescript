import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import DraggableCard from './DraggableCard';

const Wrapper = styled.div`
  min-height: 200px;
  padding: 20px 10px;
  padding-top: 30px;
  border-radius: 5px;
  background-color: ${props => props.theme.boardColor};
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

interface IProps {
  todos: Array<string>;
  boardId: string;
}

function Board({ todos, boardId } : IProps){
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(provided) => (
          <div style={{backgroundColor: "red"}} ref={provided.innerRef} {...provided.droppableProps}>
            {todos.map((todo, idx) => (
              <DraggableCard key={todo} todo={todo} idx={idx} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      </Wrapper>
  )
}

export default Board;