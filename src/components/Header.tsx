import { Link } from 'react-router-dom';

// ※ <Link>를 사용하려면 Header 컴포넌트가 Router 안에 있어야한다. (Router 밖에서는 Link를 렌더할 수 없음)
function Header() {
  return (
    <header>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </header>
  )
}

export default Header;