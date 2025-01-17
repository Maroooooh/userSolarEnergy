import { useEffect, useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./axiosConfig/instance";

const NavbarComponent = ({ activeCategory, setActiveCategory }) => {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);  // For collapsible menu
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

  // Handle category click and navigate accordingly
  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    if (categoryId === "all") {
      navigate("/"); // Navigate to Home page showing all products
    } else {
      navigate(`/category/${categoryId}`); // Navigate to category-specific products
    }
    setOpen(false); // Close the collapsible menu after category click
  };

  return (
    <Navbar className="navbar-container p-2 h4 bg-white shadow-sm fixed-top" expand="lg">
      <Navbar.Brand
        onClick={() => handleCategoryClick("all")}
        style={{ cursor: "pointer" }}
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
      </Navbar.Brand>

      {/* Toggle Button for Mobile View */}
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        onClick={() => setOpen(!open)} // Toggle collapse on click
      />
      
      {/* Collapsible Navbar */}
      <Navbar.Collapse id="basic-navbar-nav" in={open}>
        {/* Categories with the Collapse behavior */}
        <Nav className="ml-auto">
          {categories.map((category) => (
            <Nav.Item key={category._id}>
              <Nav.Link
                className={`nav-link ${activeCategory === category._id ? 'active' : ''}`}
                onClick={() => handleCategoryClick(category._id)}
              >
                {category.name}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
