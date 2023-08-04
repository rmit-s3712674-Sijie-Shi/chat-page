import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import MainPage from './mainpage/mainpage';
import FormMainPage from './formpage/formMainPage';
import FormIndex from './formMainPage/FormIndex';

const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>
  },
  {
    path:"/main",
    element:<FormIndex/>
  }
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  //<React.StrictMode>
    <RouterProvider router={router}/>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
