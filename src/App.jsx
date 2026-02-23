import { useState } from 'react'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Purchase from './pages/Purchase'
import Home from './pages/Home'
import Report from './pages/Report'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
    
      {isLoggedIn && <Navbar />}
      
      <Routes>
      
        <Route 
          path="/" 
          element={isLoggedIn ? <Navigate to="/home" /> : <Login onLogin={() => setIsLoggedIn(true)} />} 
        />
        
        
        <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
        <Route path="/entry" element={isLoggedIn ? <Purchase /> : <Navigate to="/login" />} />
        <Route path="/report" element={isLoggedIn ? <Report /> : <Navigate to="/login" />} />
        
       
        <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} />} />
      </Routes>
    </Router>
  )
}

export default App;