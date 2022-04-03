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
import Details from "./pages/Details/Details";

function App() {

  const {user} = useContext(AuthContext)

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Register />}/>
          
        {/* </Route> */}
        <Route path="/login" element={ user ? <Navigate to="/" /> : <Login />} />
          
        {/* </Route> */}
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
        
        {/* <Route path="/messenger" element={!user ? <Navigate to="/" /> : <Messenger />} /> */}
        <Route path="/messenger" element={!user ? <Navigate to="/" /> : <Messenger />} />

        {/* </Route> */}
        <Route path="/profile/:username" element={!user ? <Navigate to="/" /> : <Profile />}/>
          
        {/* </Route> */}
        <Route path="/search" element={!user ? <Navigate to="/" /> : <Search /> } />

        {/* <Route path="/details" element={user ? <Details /> : <Navigate to="/register" />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
