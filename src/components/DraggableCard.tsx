import React from 'react';
import { Draggable } from "react-beautiful-dnd";
import styled from 'styled-components';


const Card = styled.div`
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 5px;
  background-color: ${props => props.theme.cardColor};
`;

interface IProps {
  todo: string;
  idx: number;
}

function DraggableCard({ todo, idx }: IProps) {
  console.log(todo, `has been rendered`); 
  // 아이템을 드래그앤드롭할때 미세하게 항목간의 떨림이 일어나는데 이유는 한 항목만 드래그해도 나머지 항목들도 다 렌더링이 일어나기 때문.
  // └> f를 드래그해서 e자리로 옮기면 a,b,c,d도 불필요하게 렌더링됨.
  // Draggable이 드래그앤드롭되는 과정은 모두 상위 부모 컴포넌트의 provided 객체로부터 넘겨받는 props들에 의해 일어난다.
  // └> Droppable, Board, DragDropContext 등의 부모 state가 바뀌면, 자식 컴포넌트는 항상 재렌더링됨.
  // └> 리액트의 장점이지만 현재 DND 컴포넌트에선 e, f만 바뀌는데 a,b,c,d를 다시 렌더링할 필요 없음.
  // 여기서는 f와 e의 index props만 바뀌었는데 a,b,c,d도 렌더링되는 상황.
  // ★ React.memo()를 사용해서 실제 props가 바뀐 항목만 렌더링되도록 한다.
  return (
    <Draggable draggableId={todo} index={idx}>
      {(provided) => (
        <Card 
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          {todo}
        </Card>
      )}
    </Draggable>
  )
}

export default React.memo(DraggableCard); // ★ prop이 변하지 않았다면 DraggableCard를 다시 렌더링하지 말것 ★