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
          <div key={product._id} className="col-xs-6 col-md-4 col-lg-3 product-box">
            <div className="product cover">
              <a href={`/product/${product._id}`} rel="canonical">
                {/* <span className="promotion-title">الأكثر مبيعاً</span> */}
                <span className="img-cont">
                  <img
                    src={product.img || "https://via.placeholder.com/150"}
                    alt={product.name}
                    className="lazyloaded"
                  />
                </span>
               
              </a>
              <h4 className="product-title">{product.name}</h4>
              <div className="product-footer">
                <p className="product-price">
                  <span>{new Intl.NumberFormat("ar-EG", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(product.price || 0)} ر.س</span>
                </p>
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default CategoryProducts;
