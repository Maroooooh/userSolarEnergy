import { useEffect, useState } from "react";
import axiosInstance from "../axiosConfig/instance";
import { Container, Card, Nav } from "react-bootstrap";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});
  const [allProducts, setAllProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoriesAndProducts = async () => {
      try {
        // Fetch categories
        const categoryRes = await axiosInstance.get("products/categories");
        const fetchedCategories = categoryRes.data.data || [];
        setCategories(fetchedCategories);

        // Fetch products for each category and aggregate all products
        const productsMap = {};
        const allFetchedProducts = [];
        for (const category of fetchedCategories) {
          const productRes = await axiosInstance.get(
            `products/products/${category._id}`
          );
          const products = productRes.data.data || [];
          productsMap[category._id] = products;
          allFetchedProducts.push(...products);
        }

        setProductsByCategory(productsMap);
        setAllProducts(allFetchedProducts);
      } catch (error) {
        console.error("Error fetching categories or products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesAndProducts();
  }, []);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <Container className="my-4">
      {/* Categories as Tabs */}
      <Nav
        variant="tabs"
        className="justify-content-center mb-4"
        activeKey={activeCategory}
        onSelect={(selectedKey) => setActiveCategory(selectedKey)}
      >
        <Nav.Item>
          <Nav.Link eventKey="all" className="text-uppercase">
            الكل
          </Nav.Link>
        </Nav.Item>
        {categories.map((category) => (
          <Nav.Item key={category._id}>
            <Nav.Link eventKey={category._id} className="text-uppercase">
              {category.name}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>

      {/* Products Grid */}
      <div className="products-grid">
        {(activeCategory === "all" ? allProducts : productsByCategory[activeCategory] || []).map(
          (product) => (
            <div
              key={product._id}
              className="product-card"
              onClick={() => {
                const message = `مرحبا، انا مهتم بهذا المنتج: ${product.name}، وسعره $${product.price.toFixed(
                  2
                )}. هل يمكنك اخباري بالمزيد؟`;
                const encodedMessage = encodeURIComponent(message);
                const whatsappURL = `https://wa.me/201151481114?text=${encodedMessage}`;
                window.open(whatsappURL, "_blank");
              }}
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
                  <Card.Text>{product.description}</Card.Text>
                  <Card.Text className="text-success font-weight-bold">
                    ${product.price ? product.price.toFixed(2) : "0.00"}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          )
        )}
      </div>
    </Container>
  );
};

export default Home;
