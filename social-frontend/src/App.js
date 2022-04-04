import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";
import Search from "./pages/search/Search";

function App() {

  const {user} = useContext(AuthContext)

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Register />}/>
          
        <Route path="/login" element={ user ? <Navigate to="/" /> : <Login />} />
          
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
        
        <Route path="/messenger" element={!user ? <Navigate to="/" /> : <Messenger />} />

        <Route path="/profile/:username" element={!user ? <Navigate to="/" /> : <Profile />}/>
          
        <Route path="/search" element={!user ? <Navigate to="/" /> : <Search /> } />

      </Routes>
    </Router>
  );
}

export default App;
