import { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./axiosConfig/instance";

const Navbar = ({ activeCategory, setActiveCategory }) => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryRes = await axiosInstance.get("products/categories");
        const fetchedCategories = categoryRes.data.data || [];
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Function to handle category click and navigate accordingly
  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);

    if (categoryId === "all") {
      navigate("/"); // Navigate to Home page showing all products
    } else {
      navigate(`/category/${categoryId}`); // Navigate to category-specific products
    }
  };

  return (
    <div className="navbar-container p-2 h4 bg-white shadow-sm fixed-top">
      <Nav variant="underline" className="justify-content-center">
        {/* Logo */}
        <Nav.Item>
          <Nav.Link
            className="nav-link"
            onClick={() => handleCategoryClick("all")} // Navigate to all products on logo click
          >
            <img
              src="logo.png" // Replace with your image URL
              alt="Logo"
              style={{
                height: "30px",
                marginRight: "8px",
                cursor: "pointer",
              }}
            />
          </Nav.Link>
        </Nav.Item>

        {/* Dynamic Categories */}
        {categories.map((category) => (
          <Nav.Item key={category._id}>
            <Nav.Link
              className="nav-link"
              onClick={() => handleCategoryClick(category._id)} // Navigate to specific category products
              style={{
                color: activeCategory === category._id ? "orange" : "black",
                cursor: "pointer",
              }}
            >
              {category.name}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </div>
  );
};

export default Navbar;
