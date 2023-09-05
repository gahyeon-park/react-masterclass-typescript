import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import DraggableCard from './DraggableCard';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { ITodo, todoListState } from '../atoms';

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

const Form = styled.form`
  width: 100%;

  input {
    width: 100%;
  }
`;

interface IProps {
  todos: Array<ITodo>;
  boardId: string;
}

interface IForm {
  todo: string;
}

function Board({ todos, boardId } : IProps){
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const setTodos = useSetRecoilState(todoListState);

  const onValid = ({ todo }: IForm) => {
    const newTodo = {
      id: Date.now(),
      text: todo
    };

    setTodos(allBoards => {
      return {
        ...allBoards,
        [boardId]: [...allBoards[boardId], newTodo]
      }
    });

    setValue("todo", "");
  }

  const onInvalid = () => {}

  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid, onInvalid)}>
        <input type="text" {...register("todo", {required: true})} placeholder={`add task ${boardId}`} />
      </Form>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Area 
            $isDraggingOver={snapshot.isDraggingOver} 
            $isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)} 
            ref={provided.innerRef} 
            {...provided.droppableProps}
          >
            {todos.map((todo, idx) => (
              <DraggableCard 
                key={todo.id} 
                todoText={todo.text} 
                todoId={todo.id} 
                index={idx} 
              />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
      </Wrapper>
  )
}

export default Board;