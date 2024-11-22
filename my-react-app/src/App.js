import React from 'react'
import Home from './pages/Home';
import Create from './pages/Create';
import Update from './pages/Update';
import {Routes,Route} from 'react-router-dom'
function App() {
  
  return (
    <div className="App">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/api/todo/create' element={<Create />} />
          <Route path="/api/todo/update/:slug" element={<Update />} />
        </Routes>
    </div>
  );
}

export default App;