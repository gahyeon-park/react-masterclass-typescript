import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import DraggableCard from './DraggableCard';
import { useRef } from 'react';

const Wrapper = styled.div`
  min-height: 300px;
  padding-top: 10px;
  border-radius: 5px;
  background-color: ${props => props.theme.boardColor};
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

interface IAreaProps {
  $isDraggingOver: boolean;
  $isDraggingFromThis: boolean;
}

// Area가 div 태그여서 isDraggingOver props를 인지못하기 때문에 ↓아래와 같이 type 선언
const Area = styled.div<IAreaProps>`
  flex-grow: 1;
  padding: 20px;
  background-color: ${props => props.$isDraggingOver ? "#e5e8ee" : props.$isDraggingFromThis ? "#c7cbd4" : "transparent"};
  transition: background-color .3s ease-in-out;
`;

interface IProps {
  todos: Array<string>;
  boardId: string;
}

function Board({ todos, boardId } : IProps){
  // ※ react의 useRef를 사용해 html태그를 가져와서 해당 DOM의 javascript 메소드를 실행할 수 있다.
  // ex) video 태그를 참조해온다면(useRef<HTMLVideoElement>(null)), 해당 video 엘리먼트를 play시키거나 pause 시키거나 할 수 있다.
  const inputRef = useRef<HTMLInputElement>(null);
  const onClick = () => {
    inputRef.current?.focus();
  }

  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <input type="text" ref={inputRef} placeholder="" />
      <button onClick={onClick}>Click me</button>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Area $isDraggingOver={snapshot.isDraggingOver} $isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)} ref={provided.innerRef} {...provided.droppableProps}>
            {todos.map((todo, idx) => (
              <DraggableCard key={todo} todo={todo} idx={idx} />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
      </Wrapper>
  )
}

export default Board;