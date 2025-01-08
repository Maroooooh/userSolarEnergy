import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Navbar";
import Footer from './footer';
import Home from "./Home/home";
import ProductDetails from "./details/details";
import CategoryProducts from "./CategoryProducts";
import { FaWhatsapp } from "react-icons/fa"; 
const App = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        {/* Navbar */}
        <Navbar activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

        {/* Main Content */}
        <div className="flex-grow-1">
        <Routes>
        {/* Home Route */}
        <Route
          path="/"
          element={<Home activeCategory={activeCategory} />}
        />

        {/* Category-Specific Products */}
        <Route
          path="/category/:categoryId"
          element={<CategoryProducts setActiveCategory={setActiveCategory} />}
        />

        {/* Product Details */}
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
        </div>
        <a
        href="https://wa.me/966560269161"  // Replace with your phone number
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-icon"
      >
        <FaWhatsapp size={50} color="white" />
      </a>
        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
