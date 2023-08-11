import { createBrowserRouter } from 'react-router-dom';
import Root from './Root';
import Home from './screens/Home';
import About from './screens/About';
import NotFound from './screens/NotFound';
import ErrorComponent from './components/ErrorComponent';
import User from './screens/users/User';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
        errorElement: <ErrorComponent />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "users/:userId",
        element: <User />
      }
    ],
    errorElement: <NotFound /> // url에 해당하는 어떤 하위경로도 없을 경우 노출
  }
])

export default router;