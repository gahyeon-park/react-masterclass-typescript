import styled from 'styled-components';
import { ITodo } from './atoms';

const Li = styled.li`
  padding-left: 10px;

  &:before {
    content: '· ';
  }

  &:not(:first-child) {
    margin-top: 5px;
  }
`;

function Todo({ text }: ITodo) {  // props의 type이 ITodo 인터페이스이기 때문에, ITodo에 정의된 속성(id, text, category) 3개를 전부 props로 받아야 한다.
  return <Li>{text}</Li>;
}

export default Todo;