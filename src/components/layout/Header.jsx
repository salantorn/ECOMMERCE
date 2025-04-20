
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useContext(CartContext);
  
  // นับจำนวนสินค้าในตะกร้า
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  
  // สลับสถานะเมนู (เปิด/ปิด)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="neumorph-header sticky-top">
      <div className="container py-3">
        <div className="d-flex justify-content-between align-items-center">
          {/* โลโก้ */}
          <Link to="/" className="logo text-decoration-none">
            <h1 className="m-0">NeuShop</h1>
          </Link>
          
          {/* ปุ่มและไอคอนต่างๆ สำหรับมือถือ */}
          <div className="d-flex align-items-center">
            {/* ไอคอนตะกร้าสินค้า */}
            <Link to="/cart" className="neumorph-btn me-3 position-relative">
              <i className="bi bi-bag"></i>
              {cartItemCount > 0 && (
                <span className="cart-badge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-accent">
                  {cartItemCount}
                </span>
              )}
            </Link>
            
            {/* ปุ่มแฮมเบอร์เกอร์เมนู */}
            <button 
              className={`neumorph-btn hamburger ${isMenuOpen ? 'active' : ''}`}
              onClick={toggleMenu}
              aria-label="สลับเมนูนำทาง"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
        
        {/* เมนูสำหรับมือถือ */}
        <nav className={`neumorph-nav mt-3 ${isMenuOpen ? 'show' : ''}`}>
          <ul className="list-unstyled p-0 m-0">
            <li><Link to="/" className="neumorph-link" onClick={toggleMenu}>หน้าหลัก</Link></li>
            <li><Link to="/products" className="neumorph-link" onClick={toggleMenu}>สินค้า</Link></li>
            <li><Link to="/profile" className="neumorph-link" onClick={toggleMenu}>โปรไฟล์</Link></li>
            <li><Link to="/cart" className="neumorph-link" onClick={toggleMenu}>ตะกร้าสินค้า</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
