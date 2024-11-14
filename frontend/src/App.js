import './App.css';
import Home from "./pages/home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

// Router
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

//components 
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// Pages
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
       <div className="container">
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
       </div>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}
export default App;