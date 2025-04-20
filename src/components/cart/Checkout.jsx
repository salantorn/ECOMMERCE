
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';

const Checkout = () => {
  const { cart, getTotalPrice, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  
  // ตรวจสอบว่าตะกร้าว่างหรือไม่ ถ้าว่างให้กลับไปหน้าตะกร้า
  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }
  
  // ค่าส่ง
  const shippingCost = getTotalPrice() >= 1000 ? 0 : 50;
  
  // ยอดรวมทั้งหมด
  const totalAmount = getTotalPrice() + shippingCost;
  
  // สถานะฟอร์ม
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    subdistrict: '',
    district: '',
    province: '',
    postalCode: '',
    paymentMethod: 'creditCard'
  });
  
  // สถานะข้อผิดพลาด
  const [errors, setErrors] = useState({});
  
  // อัปเดตข้อมูลฟอร์ม
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // ล้างข้อผิดพลาดเมื่อมีการแก้ไขฟอร์ม
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  // ตรวจสอบความถูกต้องของฟอร์ม
  const validateForm = () => {
    const newErrors = {};
    
    // ตรวจสอบชื่อ
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'กรุณากรอกชื่อ';
    }
    
    // ตรวจสอบนามสกุล
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'กรุณากรอกนามสกุล';
    }
    
    // ตรวจสอบอีเมล
    if (!formData.email.trim()) {
      newErrors.email = 'กรุณากรอกอีเมล';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'รูปแบบอีเมลไม่ถูกต้อง';
    }
    
    // ตรวจสอบเบอร์โทรศัพท์
    if (!formData.phone.trim()) {
      newErrors.phone = 'กรุณากรอกเบอร์โทรศัพท์';
    } else if (!/^\d{9,10}$/.test(formData.phone.replace(/[- ]/g, ''))) {
      newErrors.phone = 'รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง';
    }
    
    // ตรวจสอบที่อยู่
    if (!formData.address.trim()) {
      newErrors.address = 'กรุณากรอกที่อยู่';
    }
    
    // ตรวจสอบตำบล/แขวง
    if (!formData.subdistrict.trim()) {
      newErrors.subdistrict = 'กรุณากรอกตำบล/แขวง';
    }
    
    // ตรวจสอบอำเภอ/เขต
    if (!formData.district.trim()) {
      newErrors.district = 'กรุณากรอกอำเภอ/เขต';
    }
    
    // ตรวจสอบจังหวัด
    if (!formData.province.trim()) {
      newErrors.province = 'กรุณากรอกจังหวัด';
    }
    
    // ตรวจสอบรหัสไปรษณีย์
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'กรุณากรอกรหัสไปรษณีย์';
    } else if (!/^\d{5}$/.test(formData.postalCode)) {
      newErrors.postalCode = 'รหัสไปรษณีย์ไม่ถูกต้อง';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // ส่งฟอร์ม
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // จำลองการส่งข้อมูลไปยังเซิร์ฟเวอร์
      setTimeout(() => {
        alert('สั่งซื้อสำเร็จ! ขอบคุณสำหรับการสั่งซื้อ');
        clearCart();
        navigate('/');
      }, 1500);
    }
  };
  
  return (
    <div className="checkout-container">
      <h1 className="mb-4">ชำระเงิน</h1>
      
      <div className="row">
        {/* ฟอร์มการชำระเงิน */}
        <div className="col-lg-8 mb-4 mb-lg-0">
          <form onSubmit={handleSubmit}>
            {/* ข้อมูลการจัดส่ง */}
            <div className="neumorph-card p-4 mb-4">
              <h4 className="mb-3">ข้อมูลการจัดส่ง</h4>
              
              <div className="row g-3">
                {/* ชื่อ */}
                <div className="col-md-6">
                  <label htmlFor="firstName" className="form-label">ชื่อ *</label>
                  <input 
                    type="text" 
                    className={`neumorph-input form-control ${errors.firstName ? 'is-invalid' : ''}`}
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                </div>
                
                {/* นามสกุล */}
                <div className="col-md-6">
                  <label htmlFor="lastName" className="form-label">นามสกุล *</label>
                  <input 
                    type="text" 
                    className={`neumorph-input form-control ${errors.lastName ? 'is-invalid' : ''}`}
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                  {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                </div>
                
                {/* อีเมล */}
                <div className="col-md-6">
                  <label htmlFor="email" className="form-label">อีเมล *</label>
                  <input 
                    type="email" 
                    className={`neumorph-input form-control ${errors.email ? 'is-invalid' : ''}`}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                
                {/* เบอร์โทรศัพท์ */}
                <div className="col-md-6">
                  <label htmlFor="phone" className="form-label">เบอร์โทรศัพท์ *</label>
                  <input 
                    type="tel" 
                    className={`neumorph-input form-control ${errors.phone ? 'is-invalid' : ''}`}
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                </div>
                
                {/* ที่อยู่ */}
                <div className="col-12">
                  <label htmlFor="address" className="form-label">ที่อยู่ *</label>
                  <textarea 
                    className={`neumorph-input form-control ${errors.address ? 'is-invalid' : ''}`}
                    id="address"
                    name="address"
                    rows="2"
                    value={formData.address}
                    onChange={handleChange}
                  ></textarea>
                  {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                </div>
                
                {/* ตำบล/แขวง */}
                <div className="col-md-6 col-lg-3">
                  <label htmlFor="subdistrict" className="form-label">ตำบล/แขวง *</label>
                  <input 
                    type="text" 
                    className={`neumorph-input form-control ${errors.subdistrict ? 'is-invalid' : ''}`}
                    id="subdistrict"
                    name="subdistrict"
                    value={formData.subdistrict}
                    onChange={handleChange}
                  />
                  {errors.subdistrict && <div className="invalid-feedback">{errors.subdistrict}</div>}
                </div>
                
                {/* อำเภอ/เขต */}
                <div className="col-md-6 col-lg-3">
                  <label htmlFor="district" className="form-label">อำเภอ/เขต *</label>
                  <input 
                    type="text" 
                    className={`neumorph-input form-control ${errors.district ? 'is-invalid' : ''}`}
                    id="district"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                  />
                  {errors.district && <div className="invalid-feedback">{errors.district}</div>}
                </div>
                
                {/* จังหวัด */}
                <div className="col-md-6 col-lg-3">
                  <label htmlFor="province" className="form-label">จังหวัด *</label>
                  <input 
                    type="text" 
                    className={`neumorph-input form-control ${errors.province ? 'is-invalid' : ''}`}
                    id="province"
                    name="province"
                    value={formData.province}
                    onChange={handleChange}
                  />
                  {errors.province && <div className="invalid-feedback">{errors.province}</div>}
                </div>
                
                {/* รหัสไปรษณีย์ */}
                <div className="col-md-6 col-lg-3">
                  <label htmlFor="postalCode" className="form-label">รหัสไปรษณีย์ *</label>
                  <input 
                    type="text" 
                    className={`neumorph-input form-control ${errors.postalCode ? 'is-invalid' : ''}`}
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                  />
                  {errors.postalCode && <div className="invalid-feedback">{errors.postalCode}</div>}
                </div>
              </div>
            </div>
            
            {/* วิธีการชำระเงิน */}
            <div className="neumorph-card p-4 mb-4">
              <h4 className="mb-3">วิธีการชำระเงิน</h4>
              
              <div className="payment-methods">
                {/* บัตรเครดิต */}
                <div className="neumorph-radio-card mb-3">
                  <input 
                    type="radio" 
                    className="btn-check" 
                    name="paymentMethod" 
                    id="creditCard" 
                    value="creditCard"
                    checked={formData.paymentMethod === 'creditCard'}
                    onChange={handleChange}
                  />
                  <label className="neumorph-radio-label" htmlFor="creditCard">
                    <i className="bi bi-credit-card me-2"></i>
                    บัตรเครดิต / บัตรเดบิต
                  </label>
                </div>
                
                {/* โอนเงิน */}
                <div className="neumorph-radio-card mb-3">
                  <input 
                    type="radio" 
                    className="btn-check" 
                    name="paymentMethod" 
                    id="bankTransfer" 
                    value="bankTransfer"
                    checked={formData.paymentMethod === 'bankTransfer'}
                    onChange={handleChange}
                  />
                  <label className="neumorph-radio-label" htmlFor="bankTransfer">
                    <i className="bi bi-bank me-2"></i>
                    โอนเงินผ่านธนาคาร
                  </label>
                </div>
                
                {/* พร้อมเพย์ */}
                <div className="neumorph-radio-card mb-3">
                  <input 
                    type="radio" 
                    className="btn-check" 
                    name="paymentMethod" 
                    id="promptPay" 
                    value="promptPay"
                    checked={formData.paymentMethod === 'promptPay'}
                    onChange={handleChange}
                  />
                  <label className="neumorph-radio-label" htmlFor="promptPay">
                    <i className="bi bi-qr-code me-2"></i>
                    พร้อมเพย์
                  </label>
                </div>
                
                {/* เก็บเงินปลายทาง */}
                <div className="neumorph-radio-card">
                  <input 
                    type="radio" 
                    className="btn-check" 
                    name="paymentMethod" 
                    id="cod" 
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleChange}
                  />
                  <label className="neumorph-radio-label" htmlFor="cod">
                    <i className="bi bi-cash me-2"></i>
                    เก็บเงินปลายทาง (มีค่าธรรมเนียมเพิ่ม 20 บาท)
                  </label>
                </div>
              </div>
            </div>
            
            {/* ปุ่มส่งฟอร์ม */}
            <div className="d-flex justify-content-between">
              <Link to="/cart" className="neumorph-btn py-2 px-4">
                <i className="bi bi-arrow-left me-2"></i>
                กลับไปตะกร้าสินค้า
              </Link>
              
              <button type="submit" className="neumorph-btn-primary py-2 px-4">
                สั่งซื้อและชำระเงิน
              </button>
            </div>
          </form>
        </div>
        
        {/* สรุปคำสั่งซื้อ */}
        <div className="col-lg-4">
          <div className="neumorph-card p-3 p-md-4 cart-summary sticky-lg-top" style={{top: '85px'}}>
            <h4 className="mb-3">สรุปคำสั่งซื้อ</h4>
            
            {/* รายการสินค้าโดยย่อ */}
            <div className="order-summary-items mb-3">
              {cart.map(item => (
                <div key={item.id} className="d-flex justify-content-between align-items-center mb-2">
                  <div className="d-flex align-items-center">
                    <div className="order-item-quantity me-2">{item.quantity}x</div>
                    <div className="order-item-name">{item.name}</div>
                  </div>
                  <div className="order-item-price">฿{(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>
            
            <hr className="my-3" />
            
            {/* รายละเอียดราคา */}
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
              
              {/* ค่าธรรมเนียมการเก็บเงินปลายทาง */}
              {formData.paymentMethod === 'cod' && (
                <div className="d-flex justify-content-between mb-2">
                  <span>ค่าธรรมเนียมเก็บเงินปลายทาง</span>
                  <span>฿20.00</span>
                </div>
              )}
              
              {/* ยอดรวมสุทธิ */}
              <div className="neumorph-inner p-3 my-3">
                <div className="d-flex justify-content-between align-items-center">
                  <span><strong>ยอดรวมทั้งสิ้น</strong></span>
                  <span className="total-price">
                    ฿{(totalAmount + (formData.paymentMethod === 'cod' ? 20 : 0)).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
