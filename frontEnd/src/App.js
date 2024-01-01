import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Homepage from './components/Homepage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
function App() {
  const [user, setLoginUser] = useState({})

  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={user && user._id ? <Homepage setLoginUser={setLoginUser} /> : <Login setLoginUser={setLoginUser} />} />
            <Route path='/login' element={<Login setLoginUser={setLoginUser} />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
