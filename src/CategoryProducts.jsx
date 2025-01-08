import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "./axiosConfig/instance";
import { Container, Card } from "react-bootstrap";

const CategoryProducts = ({ setActiveCategory }) => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setActiveCategory(categoryId);
        const res = await axiosInstance.get(
          categoryId === "all"
            ? "products/products"
            : `products/products/${categoryId}`
        );
        setProducts(res.data.data || []);
      } catch (error) {
        console.error("Error fetching category products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId, setActiveCategory]);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    
    <Container className="my-4">
       <br/>
    <br/>
    <br/>
    <br/>
    
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

export default CategoryProducts;
