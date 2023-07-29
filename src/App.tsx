import React, { useEffect, useState } from 'react';
import Login from './loginpage/login';
import Register from './registerpage/register';
import { useCookies } from 'react-cookie';
import FormMainPage from './formpage/formMainPage';
import { useNavigate } from 'react-router-dom';

function App() {
  const [show, setShow] = useState(true)
  const [cookies, setCookie] = useCookies(['user']);
  const navigate = useNavigate();
  useEffect(() => {
    cookies.user && navigate("/main")
  })
  return (
    <div className="App">
      {show ? <Login setShow={setShow}></Login> : <Register setShow={setShow}></Register> }
    </div>
  );
}

export default App;
