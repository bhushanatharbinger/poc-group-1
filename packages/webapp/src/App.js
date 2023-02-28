import "./App.css";
// import Footer from "./pages/Footer/Footer";
// import Header from "./pages/Header/Header";
import { Route, Routes } from "react-router-dom";
import AddUser from "./pages/AddUser/AddUser";
import EditUser from "./pages/EditUser/EditUser";
import Home from "./pages/Home/Home";
import User from "./pages/User/User";
import "./styles.css";

function App() {
  return (
    <div className="App">
      {/* <Header /> */}
      {/* <Home message="My content"/> */}
      <Routes>
        <Route path="/landing-page" element={<Home />} />
        <Route exact path="/adduser" element={<AddUser />} />
        <Route exact path="/edituser/:id" element={<EditUser />} />
        <Route exact path="/user/:id" element={<User />} />
      </Routes>
      {/* <Footer note="Harbinger Group" /> */}
    </div>
  );
}

export default App;
