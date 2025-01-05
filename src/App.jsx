import { BrowserRouter, Routes , Route } from "react-router-dom";
import "./App.css";
import Footer from "./footer";
import Home from "./Home/home";
import Navbar from "./Navbar";
import Services from "./Services/Services";
import Callus from "./Callus/callus";
import Notfound from "./Notfound/notfound";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/callus" element={<Callus />} />
          <Route path = "*" element={<Notfound/>}/> 
        </Routes>
       
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
