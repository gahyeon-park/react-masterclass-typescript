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

interface IProps {
  todos: Array<string>;
  boardId: string;
}

function Board({ todos, boardId } : IProps){
  return (
    <Droppable droppableId={boardId}>
    {(provided) => 
      <Wrapper ref={provided.innerRef} {...provided.droppableProps}>
        {todos.map((todo, idx) => (
          <DraggableCard key={todo} todo={todo} idx={idx} />
        ))}
        {provided.placeholder}
      </Wrapper>
    }
  </Droppable>
  )
}

export default Board;