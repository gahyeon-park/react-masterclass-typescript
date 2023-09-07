import React from 'react';
import { Draggable } from "react-beautiful-dnd";
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { todoListState } from '../atoms';


const Card = styled.div<{$isDragging: boolean}>`
  overflow: hidden;
  padding: 5px 10px;
  margin-top: 5px;
  border-radius: 5px;
  background-color: ${props => props.$isDragging ? "#62cdf5" : props.theme.cardColor};
  box-shadow: ${props => props.$isDragging ? "0 10px 10px rgba(0, 0, 0, .1)" : "none"}
`;

const Del = styled.button`
  position: relative;
  float: right;
  border: 1px solid #ddd;
  width: 20px;
  height: 20px;
  background-color: #f0f0f0;
  cursor: pointer;

  span {
    opacity: 0;
    width: 1px;
    height: 1px;
    clip: rect(0, 0, 0, 0) !important;
    position: absolute;
  }

  &:before,
  &:after {
    content: '';
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -6px;
    width: 1px;
    height: 12px;
    background-color: #777;
    transform: rotate(45deg);
  }

  &:after {
    transform: rotate(135deg);
  }
`;

interface IProps {
  todoId: number;
  todoText: string;
  index: number;
  boardId: string;
}

function DraggableCard({ todoId, todoText, index, boardId }: IProps) {
  const setTodos = useSetRecoilState(todoListState);

  const deleteItem = () => {
    console.log('항목 삭제 !');
    setTodos(allBoards => {
      const targetBoard = [...allBoards[boardId]];
      targetBoard.splice(index, 1);
      
      return allBoards = {
        ...allBoards,
        [boardId]: targetBoard
      };
    })
  }


  return (
    <Draggable draggableId={`${todoId}`} index={index}>
      {(provided, snapshot) => (
        <Card 
          $isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          {todoText}
          <Del onClick={deleteItem}><span>삭제</span></Del>
        </Card>
      )}
    </Draggable>
  )
}

export default React.memo(DraggableCard); // ★ prop이 변하지 않았다면 DraggableCard를 다시 렌더링하지 말것 ★