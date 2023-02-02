import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import Signin from './Components/signin';
import Signup from './Components/signup';
import Todo from './Components/todopage';

function App() {
  const token =localStorage.getItem('token')
  return (
    <BrowserRouter>

      <Routes>
        <Route path='/' element={<Signin/>}/>
         <Route path='/signup' element={<Signup/>}/>

        <Route path='/todopage' element={<Todo/>}/> 

      </Routes>
    </BrowserRouter>
  );
}

export default App;
