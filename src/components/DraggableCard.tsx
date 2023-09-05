import React from 'react';
import { Draggable } from "react-beautiful-dnd";
import styled from 'styled-components';


const Card = styled.div<{$isDragging: boolean}>`
  padding: 5px 10px;
  margin-bottom: 5px;
  border-radius: 5px;
  background-color: ${props => props.$isDragging ? "#62cdf5" : props.theme.cardColor};
  box-shadow: ${props => props.$isDragging ? "0 10px 10px rgba(0, 0, 0, .1)" : "none"}
`;

interface IProps {
  todoId: number;
  todoText: string;
  index: number;
}

function DraggableCard({ todoId, todoText, index }: IProps) {
  return (
    <Draggable draggableId={`${todoId}`} index={index}>
      {(provided, snapshot) => (
        <Card 
          $isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          {todoText}
        </Card>
      )}
    </Draggable>
  )
}

export default React.memo(DraggableCard); // ★ prop이 변하지 않았다면 DraggableCard를 다시 렌더링하지 말것 ★