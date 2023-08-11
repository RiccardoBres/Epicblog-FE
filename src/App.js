import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import LoginPage from './Pages/LoginPage';
import Errorpage from './Pages/Errorpage';
import ProtectedRoutes from './Middlewares/ProtectedRoutes';
import CreatePost from './Components/Facilities/CreatePost';
import Success from './Pages/Success';




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/success" element={<Success />} />
        <Route path="*" element={<Errorpage />} />
        <Route element = {<ProtectedRoutes />}/>
          <Route path="/CreatePost" element={<CreatePost/>} />
        <Route/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
