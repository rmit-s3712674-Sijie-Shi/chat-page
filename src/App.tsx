import React, { useState } from 'react';
import Login from './loginpage/login';
import Register from './registerpage/register';

function App() {
  const [show, setShow] = useState(true)
  return (
    <div className="App">
      {show ? <Login setShow={setShow}></Login> : <Register setShow={setShow}></Register> }
    </div>
  );
}

export default App;
