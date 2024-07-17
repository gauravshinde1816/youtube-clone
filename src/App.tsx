
import { Routes, Route, useNavigate , useLocation } from 'react-router-dom';
import HomePage from './components/HomePage';
import VideoPage from './components/VideoPage';
import Header from './components/Header';
import "./App.css"
import { Fragment, useEffect } from 'react';
import SignUp from './components/SignUp';
import Login from './components/Login';
import OtpPage from './components/OtpPage';
import VideoUpload from './components/VideoUpload';


function App() {

  const navigate = useNavigate();
  const location = useLocation();
  const authPage = location.pathname === '/signup' || location.pathname === '/login' || location.pathname === "/otp"; 


  // useEffect(() => {
  //   const token = localStorage.getItem('authToken'); 
  //   if (token) {
  //     navigate('/'); 
  //   } else {
  //     navigate('/login'); 
  //   }
  // }, []); 

  return (
    <Fragment>
        {!authPage && <Header/>}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/watch" element={<VideoPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path='/upload' element={<VideoUpload/>}/>
      </Routes>
    </Fragment>
  );
}
export default App
