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
import Search from "./Pages/search";
import UpdatePlan from "./Pages/UpdatePlan";
import Advanced from "./Pages/Advanced";
import Bitacora from "./Pages/Bitacora";

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
          <Route path="/advanced/:username" element={<Advanced />} />
          <Route path='/addprofile/:username' element={<AddProfile />} />
          <Route path='/home/:username/:profile' element={<Home />} />
          <Route path="/home/search/:username/:profile" element={<Search />}></Route>
          <Route path="/Bitacora/:username" element={<Bitacora />}></Route>
          <Route path="/updateplan/:username" element={<UpdatePlan />} />
          <Route path="*" element={<ErrorPage />} />

          {/*Esta debe de ser la ultima ruta siempre */}
        </Routes>
      </div>
    </Router>
  );
}
export default App;
