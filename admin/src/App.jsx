import React, { useContext } from 'react'
import Login from './pages/login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/adminContext';
import NavBar from './components/NavBar';

const App = () => {
  const {aToken} = useContext(AdminContext);

  return aToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <NavBar/>
    </div>
  ): (
    <div>
      <Login/>
      <ToastContainer position="top-right" autoClose={2000}/>
    </div>
  ) 
}

export default App;
