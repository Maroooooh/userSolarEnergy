import { useEffect, useState } from "react";
import axiosInstance from "../axiosConfig/instance";
import { Container, Card } from "react-bootstrap";

const Home = ({ activeCategory, setActiveCategory }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        if (activeCategory === "all") {
          // Fetch all products when activeCategory is "all"
          const res = await axiosInstance.get("products/products");
          setProducts(res.data.data || []);
        } else {
          // Fetch products for the selected category
          const res = await axiosInstance.get(
            `products/products/${activeCategory}`
          );
          setProducts(res.data.data || []);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeCategory]); // Refetch whenever activeCategory changes

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <Container className="my-4">
      <br />
      <br />
      <br />
      <br />

      <div className="products-grid">
        {products.map((product) => (
          <div
            key={product._id}
            className="product-card"
            onClick={() => window.open(`/product/${product._id}`, "_self")}
          >
            <Card className="bg-white rounded-lg shadow-lg">
              <Card.Img
                variant="top"
                src={product.img || "https://via.placeholder.com/150"}
                alt={product.name}
                style={{
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text className="text-success font-weight-bold h5">
                  {new Intl.NumberFormat("ar-EG", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(product.price || 0)}
                  ر.س
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Home;
