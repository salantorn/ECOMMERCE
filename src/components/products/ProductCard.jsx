
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import "../../../public/product.json"

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  
  // ฟังก์ชันเพิ่มสินค้าลงตะกร้า
  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1);
    
    // แสดงแอนิเมชันเมื่อกดปุ่ม
    const button = e.currentTarget;
    button.classList.add('added');
    setTimeout(() => {
      button.classList.remove('added');
    }, 1000);
  };
  
  return (
    <div className="col-6 col-md-4 mb-4">
      <div className="product-card neumorph-card h-100">
        <Link to={`/product/${product.id}`} className="text-decoration-none">
          <div className="product-image-container">
            <img 
              src={product.image} 
              alt={product.name}
              className="product-image img-fluid"
              loading="lazy"
            />
            {product.discount > 0 && (
              <div className="product-badge">-{product.discount}%</div>
            )}
          </div>
          
          <div className="product-info p-3">
            <h3 className="product-name">{product.name}</h3>
            <div className="d-flex justify-content-between align-items-center mt-2">
              <span className="product-price">
                {product.discount > 0 && (
                  <small className="text-muted text-decoration-line-through me-2">
                    ฿{product.originalPrice?.toFixed(2) || (product.price * (1 + product.discount/100)).toFixed(2)}
                  </small>
                )}
                ฿{product.price.toFixed(2)}
              </span>
              
              <div className="product-rating">
                <i className="bi bi-star-fill text-warning"></i>
                <span className="ms-1">{product.rating}</span>
              </div>
            </div>
            
            <p className="product-description text-muted mt-2">
              {product.description.substring(0, 60)}...
            </p>
          </div>
        </Link>
        
        <div className="product-actions p-3 pt-0">
          <button 
            className="neumorph-btn-add w-100" 
            onClick={handleAddToCart}
            aria-label={`เพิ่ม ${product.name} ลงในตะกร้า`}
          >
            <i className="bi bi-plus-lg me-2"></i>
            เพิ่มลงตะกร้า
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
