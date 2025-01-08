
import { Container, Row, Col } from "react-bootstrap";
import { FaWhatsapp, FaFacebook, FaInstagram, FaSnapchat } from "react-icons/fa"; // Import specific icons from react-icons


const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          {/* First Column: "من نحن" */}
          <Col xs={12} md={4} className="footer-section">
            <h5>من نحن</h5>
            <p>
              نحن شركة رائدة في بيع المنتجات عبر الإنترنت، نقدم لك أفضل
              المنتجات ذات الجودة العالية بأسعار تنافسية.
            </p>
          </Col>

          {/* Second Column: "تواصل معنا" */}
          <Col xs={12} md={4} className="footer-section">
  <h5>تواصل معنا</h5>
  <ul className="contact-icons">
    <li>
      <a href="https://wa.me/966560269161" target="_blank" rel="noopener noreferrer">
        <FaWhatsapp size={30} />
      </a>
    </li>
    <li>
      <a href="https://www.facebook.com/your-page" target="_blank" rel="noopener noreferrer">
        <FaFacebook size={30} />
      </a>
    </li>
    <li>
      <a href="https://www.instagram.com/your-page" target="_blank" rel="noopener noreferrer">
        <FaInstagram size={30} />
      </a>
    </li>
    <li>
      <a href="https://www.snapchat.com/add/your-snap" target="_blank" rel="noopener noreferrer">
        <FaSnapchat size={30} />
      </a>
    </li>
  </ul>
</Col>

          {/* Third Column: Additional section if needed */}
          <Col xs={12} md={4} className="footer-section">
            <h5>روابط مهمة</h5>
            <ul>
              <li><a href="/">الرئيسية</a></li>
             
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
