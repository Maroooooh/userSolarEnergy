import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="p-2 h4">
      <Nav variant="underline">
      <Nav.Item>
          <NavLink
            to="/"
            className="nav-link"
           
          >
            <img
              src="logo.png" // Replace with your image URL or path
              alt="Home Icon"
              style={{ height: "30px", marginRight: "8px" }} // Adjust size and spacing
            />
          </NavLink>
        </Nav.Item>
        {/* Home */}
        <Nav.Item>
          <NavLink
            to="/home"
            className="nav-link d-flex align-items-center"
            style={({ isActive }) => ({
              color: isActive ? "orange" : "black",
            })}
          >
           
            الصفحة الرئيسية
          </NavLink>
        </Nav.Item>

        {/* Services */}
        <Nav.Item>
          <NavLink
            to="/services"
            className="nav-link"
            style={({ isActive }) => ({
              color: isActive ? "orange" : "black",
            })}
          >
            الخدمات
          </NavLink>
        </Nav.Item>

        {/* Contact Us */}
        <Nav.Item>
          <NavLink
            to="/callus"
            className="nav-link"
            style={({ isActive }) => ({
              color: isActive ? "orange" : "black",
            })}
          >
            تواصل معنا
          </NavLink>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default Navbar;
