import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './Router';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
  );
  
  // 2. Router.tsx에서 createBrowserRouter함수로 정의한 router를 <RouteProvider />에 전달.
root.render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>
);
 
