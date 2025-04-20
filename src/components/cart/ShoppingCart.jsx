
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import CartItem from './CartItem';

const ShoppingCart = () => {
  const { cart, clearCart, getTotalPrice } = useContext(CartContext);
  
  // ตรวจสอบว่าตะกร้าว่างหรือไม่
  const isCartEmpty = cart.length === 0;
  
  // คำนวณค่าส่ง
  const shippingCost = getTotalPrice() >= 1000 ? 0 : 50;
  
  // คำนวณจำนวนเงินทั้งหมด
  const totalAmount = getTotalPrice() + shippingCost;
  
  return (
    <div className="shopping-cart-container">
      <h1 className="mb-4">ตะกร้าสินค้า</h1>
      
      {isCartEmpty ? (
        <div className="neumorph-card p-5 text-center empty-cart">
          <i className="bi bi-cart-x display-1 mb-3"></i>
          <h3>ตะกร้าสินค้าของคุณว่างเปล่า</h3>
          <p className="text-muted mb-4">เพิ่มสินค้าเพื่อเริ่มการช้อปปิ้ง</p>
          <Link to="/products" className="neumorph-btn-primary px-4 py-2">
            เลือกซื้อสินค้า
          </Link>
        </div>
      ) : (
        <div className="row">
          {/* รายการสินค้าในตะกร้า */}
          <div className="col-lg-8 mb-4 mb-lg-0">
            <div className="neumorph-card p-3 p-md-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">รายการสินค้า ({cart.reduce((acc, item) => acc + item.quantity, 0)} ชิ้น)</h5>
                
                <button 
                  className="neumorph-btn-text" 
                  onClick={clearCart}
                  disabled={isCartEmpty}
                >
                  <i className="bi bi-trash me-1"></i>
                  ล้างตะกร้า
                </button>
              </div>
              
              {/* รายการสินค้า */}
              <div className="cart-items-list">
                {cart.map(item => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>
          
          {/* สรุปคำสั่งซื้อ */}
          <div className="col-lg-4">
            <div className="neumorph-card p-3 p-md-4 cart-summary sticky-lg-top" style={{top: '85px'}}>
              <h5 className="mb-3">สรุปคำสั่งซื้อ</h5>
              
              <div className="summary-details">
                <div className="d-flex justify-content-between mb-2">
                  <span>ราคาสินค้ารวม</span>
                  <span>฿{getTotalPrice().toFixed(2)}</span>
                </div>
                
                <div className="d-flex justify-content-between mb-2">
                  <span>ค่าจัดส่ง</span>
                  <span>
                    {shippingCost === 0 ? (
                      <span className="text-success">ฟรี</span>
                    ) : (
                      `฿${shippingCost.toFixed(2)}`
                    )}
                  </span>
                </div>
                
                {/* ส่วนลด (ถ้ามี) */}
                {/*
                <div className="d-flex justify-content-between mb-2">
                  <span>ส่วนลด</span>
                  <span className="text-success">-฿0.00</span>
                </div>
                */}
                
                {/* ส่วนรวมทั้งหมด */}
                <div className="neumorph-inner p-3 my-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <span><strong>ยอดรวมทั้งสิ้น</strong></span>
                    <span className="total-price">฿{totalAmount.toFixed(2)}</span>
                  </div>
                </div>
                
                {/* ส่วนการส่งเสริมการขาย */}
                <div className="neumorph-inner p-3 mb-3">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted small">
                      {getTotalPrice() < 1000 ? (
                        <>
                          ซื้อเพิ่มอีก <strong>฿{(1000 - getTotalPrice()).toFixed(2)}</strong> เพื่อรับส่วนลดค่าจัดส่งฟรี
                        </>
                      ) : (
                        <span className="text-success">คุณได้รับสิทธิ์จัดส่งฟรีแล้ว!</span>
                      )}
                    </span>
                  </div>
                  
                  {getTotalPrice() < 1000 && (
                    <div className="progress neumorph-progress">
                      <div 
                        className="progress-bar bg-accent" 
                        role="progressbar" 
                        style={{width: `${(getTotalPrice() / 1000) * 100}%`}} 
                        aria-valuenow={getTotalPrice()} 
                        aria-valuemin="0" 
                        aria-valuemax="1000">
                      </div>
                    </div>
                  )}
                </div>
                
                {/* ส่วนปุ่มดำเนินการต่อ */}
                <div className="d-grid gap-2">
                  <Link to="/checkout" className="neumorph-btn-primary py-3">
                    ดำเนินการชำระเงิน
                  </Link>
                  
                  <Link to="/products" className="neumorph-btn-text py-2">
                    <i className="bi bi-arrow-left me-2"></i>
                    เลือกซื้อสินค้าต่อ
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
