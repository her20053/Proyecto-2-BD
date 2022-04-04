import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Register from './Pages/Register';
import Login from './Pages/Login';
import LoginAdmin from './Pages/LoginAdmin';
import Profile from './Pages/Profile';
import Administrator from './Pages/Administrator';
import AddProfile from './Pages/AddProfile';
import Planes from './Pages/Planes';
import Home from './Pages/Home';
import ErrorPage from './Pages/ErrorPage';

const App = () => {
  return (
    <Router>
      <div className='container'>
        <Routes>
          <Route exact path="/" element={<Register />} />
          <Route path="/plan/:username" element={<Planes />} />
          <Route path="/login" element={<Login />} />
          <Route path="/loginadmin" element={<LoginAdmin />} />
          <Route path='/profile/:username' element={<Profile />} />
          <Route path='/administrator/:username' element={<Administrator />} />
          <Route path='/addprofile/:username' element={<AddProfile />} />
          <Route path='/home/:username/:profile' element={<Home />} />
          <Route path="*" element={<ErrorPage />} />
          {/*Esta debe de ser la ultima ruta siempre */}
        </Routes>
      </div>
    </Router>
  );
}
export default App;
