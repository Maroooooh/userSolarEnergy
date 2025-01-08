import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import axiosInstance from "../axiosConfig/instance";
import "./ProductDetails.css"; // Import custom CSS for additional styles

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`products/product/${id}`);
        setProduct(res.data.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center mt-5">Product not found</div>;
  }

  return (
    <Container className="product-details-container">
      <br /> <br /> <br /> <br />
      {/* Product Title */}
      <h1 className="product-title">{product.name}</h1>

      {/* Product Image */}
      <img
        src={product.img || "https://via.placeholder.com/400"}
        alt={product.name}
        className="product-image"
      />

      {/* Product Description */}
      <p className="product-description">{product.description}</p>

      {/* Product Price */}
      <p className="product-price text-success font-weight-bold h4">
        {new Intl.NumberFormat("ar-EG", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(product.price || 0)} ر.س
      </p>

      {/* WhatsApp Button */}
      <Button
        className="whatsapp-button"
        variant="success"
        onClick={() => {
          const message = `مرحبا، انا مهتم بهذا المنتج: ${product.name}، وسعره ${product.price.toFixed(
            2
          )} ر.س. هل يمكنك اخباري بالمزيد؟`;
          const encodedMessage = encodeURIComponent(message);
          const whatsappURL = `https://wa.me/966560269161?text=${encodedMessage}`;
          window.open(whatsappURL, "_blank");
        }}
      >
        تواصل عبر الواتساب
      </Button>
    </Container>
  );
};

export default ProductDetails;
