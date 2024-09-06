import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Login from './views/Auth/Login/Index.jsx'
function App() {
 

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
