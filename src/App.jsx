import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import './App.css'
import MyFooter from './components/MyFooter'
import { AuthContext } from './contexts/AuthProvider'
import LoadingSpinner from './components/LoadingSpinner'

function App() {
  const { loading } = useContext(AuthContext);

  return (
    <div className="bg-prigmayBG">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <Header />
          <Outlet />
          <MyFooter />
        </div>
      )}

    </div>
  );
}

export default App