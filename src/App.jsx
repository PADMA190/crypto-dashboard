import React from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import Highlights from './pages/Highlights';

function App(){
  return(
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/highlights' element={<Highlights/>}/>
      </Routes>
    </Router>
  )
}
export default App;