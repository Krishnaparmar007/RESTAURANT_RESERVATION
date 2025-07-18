import React, { useState, useEffect } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './Pages/Home/Home';
import NotFound from './Pages/NotFound/NotFound';
import Dishes from './Pages/Dishes/Dishes';
import Success from './Pages/Success/Success';
// import Admin from './Pages/Admin/Admin';
import './App.css'

const App = () => {
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleRouteChange = () => {
      setError(null);
    };
    window.addEventListener('routeChange', handleRouteChange);
    return () => {
      window.removeEventListener('routeChange', handleRouteChange);
    };
  }, []);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setShowError(true);
      }, 10000); // 10 seconds
    }
  }, [error]);

  return (
    <>
      <Router>
        <Toaster position="center-top" />
        {error ? (
          <div>
            <h1>Error: {error.message}</h1>
            <p>{error.stack}</p>
          </div>
        ) : (
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/dishes' element={<Dishes/>}/>
            <Route path='/success' element={<Success/>}/>
            <Route path='*' element={<NotFound/>}/>
            {/* <Route path='/admin' element={<Admin/>}/> */}
          </Routes>
        )}
      </Router>
    </>
  )
}

export default App