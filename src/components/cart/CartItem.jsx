
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useContext(CartContext);
  
  // ปรับจำนวนสินค้า
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(item.id, newQuantity);
    }
  };
  
  // ลบสินค้าออกจากตะกร้า
  const handleRemove = () => {
    removeFromCart(item.id);
  };
  
  return (
    <div className="cart-item neumorph-inner p-3 mb-3">
      <div className="row align-items-center">
        {/* รูปภาพสินค้า */}
        <div className="col-3 col-md-2">
          <Link to={`/product/${item.id}`}>
            <div className="cart-item-image rounded overflow-hidden">
              <img src={item.image} alt={item.name} className="img-fluid" />
            </div>
          </Link>
        </div>
        
        {/* รายละเอียดสินค้า */}
        <div className="col-9 col-md-5 col-lg-6">
          <div className="cart-item-details">
            <Link to={`/product/${item.id}`} className="text-decoration-none">
              <h6 className="mb-1">{item.name}</h6>
            </Link>
            
            <div className="d-flex flex-wrap align-items-center text-muted small">
              <span className="me-3">รหัส: {item.id}</span>
              {item.color && <span className="me-3">สี: {item.color}</span>}
              {item.size && <span>ขนาด: {item.size}</span>}
            </div>
          </div>
        </div>
        
        {/* ส่วนปรับจำนวนสินค้า */}
        <div className="col-6 col-md-2 mt-3 mt-md-0">
          <div className="quantity-selector neumorph-card d-inline-flex align-items-center p-1">
            <button 
              className="neumorph-btn quantity-btn" 
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              <i className="bi bi-dash"></i>
            </button>
            <span className="quantity-display px-2">{item.quantity}</span>
            <button 
              className="neumorph-btn quantity-btn" 
              onClick={() => handleQuantityChange(item.quantity + 1)}
            >
              <i className="bi bi-plus"></i>
            </button>
          </div>
        </div>
        
        {/* ราคาสินค้า */}
        <div className="col-4 col-md-2 text-end mt-3 mt-md-0">
          <div className="cart-item-price">
            <div className="fw-bold">฿{(item.price * item.quantity).toFixed(2)}</div>
            {item.quantity > 1 && (
              <small className="text-muted">@฿{item.price.toFixed(2)}</small>
            )}
          </div>
        </div>
        
        {/* ปุ่มลบสินค้า */}
        <div className="col-2 col-md-1 text-end mt-3 mt-md-0">
          <button 
            className="neumorph-btn-text remove-btn" 
            onClick={handleRemove}
            aria-label="ลบสินค้า"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
