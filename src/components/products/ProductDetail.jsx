
import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductContext } from '../../context/ProductContext';
import { CartContext } from '../../context/CartContext';
import '../../../public/product.json'
const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, products } = useContext(ProductContext); // เพิ่ม products
  const { addToCart } = useContext(CartContext);
  
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]); // เพิ่มสถานะสำหรับสินค้าแนะนำ
  
  // ดึงข้อมูลสินค้าตาม ID
  useEffect(() => {
    const fetchedProduct = getProductById(id);
    if (fetchedProduct) {
      setProduct(fetchedProduct);
      // ตั้งค่ารูปภาพเริ่มต้น
      setSelectedImage(0);
      
      // ค้นหาสินค้าที่เกี่ยวข้อง (จากหมวดหมู่เดียวกัน หรือสุ่ม)
      const getRelatedProducts = () => {
        // กรองสินค้าในหมวดหมู่เดียวกันแต่ไม่ใช่สินค้าปัจจุบัน
        let categoryProducts = products.filter(p => 
          p.category === fetchedProduct.category && p.id !== fetchedProduct.id
        );
        
        // ถ้าไม่มีสินค้าในหมวดหมู่เดียวกันพอ ให้เลือกสินค้าอื่นเพิ่มเติม
        if (categoryProducts.length < 4) {
          const otherProducts = products.filter(p => 
            p.id !== fetchedProduct.id && !categoryProducts.includes(p)
          );
          
          // สุ่มเลือกสินค้าเพิ่มเติม
          const shuffled = [...otherProducts].sort(() => 0.5 - Math.random());
          const additional = shuffled.slice(0, 4 - categoryProducts.length);
          
          categoryProducts = [...categoryProducts, ...additional];
        }
        
        // หากมีมากกว่า 4 รายการ สุ่มเลือกเพียง 4 รายการ
        if (categoryProducts.length > 4) {
          const shuffled = [...categoryProducts].sort(() => 0.5 - Math.random());
          return shuffled.slice(0, 4);
        }
        
        return categoryProducts;
      };
      
      setRelatedProducts(getRelatedProducts());
    } else {
      // ถ้าไม่พบสินค้า กลับไปหน้าสินค้าทั้งหมด
      navigate('/products');
    }
  }, [id, getProductById, navigate, products]);
  
  // โค้ดส่วนอื่นๆ ที่มีอยู่แล้ว...
  
  // ปรับเปลี่ยนจำนวนสินค้า
  const handleQuantityChange = (amount) => {
    const newQuantity = quantity + amount;
    if (newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };
  
  // เพิ่มสินค้าลงตะกร้า
  const handleAddToCart = () => {
    if (!product) return;
    
    setIsAddingToCart(true);
    addToCart(product, quantity);
    
    // แสดงแอนิเมชันแล้วรีเซ็ตหลังจากเพิ่มสินค้า
    setTimeout(() => {
      setIsAddingToCart(false);
      setQuantity(1);
    }, 1000);
  };
  
  if (!product) {
    return (
      <div className="neumorph-loader-container text-center py-5">
        <div className="neumorph-loader mb-3"></div>
        <p>กำลังโหลดข้อมูลสินค้า...</p>
      </div>
    );
  }
  
  // สร้างอาร์เรย์รูปภาพ
  const images = [
    product.image,
    product.image2 || product.image,
    product.image3 || product.image
  ];
  
  return (
    <div className="product-detail-container">
      {/* โค้ดส่วนอื่นๆ เหมือนเดิม... */}
      <div className="neumorph-card p-3 p-md-4 mb-4">
        <div className="row g-4">
          {/* รูปภาพสินค้า */}
          <div className="col-12 col-md-6">
            <div className="product-detail-image-container neumorph-inner mb-3">
              <img 
                src={images[selectedImage]} 
                alt={product.name} 
                className="img-fluid main-product-image"
              />
            </div>
            
            {/* แกลเลอรีรูปย่อย */}
            <div className="product-thumbnails d-flex justify-content-center mt-3">
              {images.map((image, index) => (
                <div 
                  key={index}
                  className={`neumorph-thumbnail mx-2 ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image} alt={`${product.name} - ภาพที่ ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
          
          {/* รายละเอียดสินค้า */}
          <div className="col-12 col-md-6">
            <div className="product-detail-info">
              <h1 className="product-detail-title mb-2">{product.name}</h1>
              
              <div className="d-flex align-items-center mb-3">
                <div className="product-rating me-3">
                  <i className="bi bi-star-fill text-warning me-1"></i>
                  <span>{product.rating}</span>
                </div>
                <span className="text-muted small">รหัสสินค้า: {product.id}</span>
              </div>
              
              <div className="product-detail-price mb-3">
                {product.discount > 0 && (
                  <span className="original-price text-muted text-decoration-line-through me-2">
                    ฿{product.originalPrice?.toFixed(2) || (product.price * (1 + product.discount/100)).toFixed(2)}
                  </span>
                )}
                <span className="current-price">฿{product.price.toFixed(2)}</span>
                
                {product.discount > 0 && (
                  <span className="discount-badge ms-2">-{product.discount}%</span>
                )}
              </div>
              
              <p className="product-detail-description mb-4">
                {product.description}
              </p>
              
              {/* ส่วนจำนวนสินค้า */}
              <div className="quantity-selector neumorph-card d-inline-flex align-items-center mb-4 p-1">
                <button 
                  className="neumorph-btn quantity-btn" 
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <i className="bi bi-dash"></i>
                </button>
                <span className="quantity-display px-4">{quantity}</span>
                <button 
                  className="neumorph-btn quantity-btn" 
                  onClick={() => handleQuantityChange(1)}
                >
                  <i className="bi bi-plus"></i>
                </button>
              </div>
              
              {/* ปุ่มซื้อสินค้า */}
              <div className="product-detail-actions d-flex flex-wrap gap-2">
                <button 
                  className={`neumorph-btn-primary flex-grow-1 py-3 ${isAddingToCart ? 'added' : ''}`}
                  onClick={handleAddToCart}
                >
                  <i className="bi bi-cart-plus me-2"></i>
                  เพิ่มลงตะกร้า
                </button>
                
                <button className="neumorph-btn-secondary flex-grow-1 py-3">
                  <i className="bi bi-heart me-2"></i>
                  เพิ่มในรายการโปรด
                </button>
              </div>
              
              {/* ข้อมูลเพิ่มเติม */}
              <div className="product-meta mt-4">
                <div className="neumorph-card p-3 mb-3">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-truck me-3 fs-4"></i>
                    <div>
                      <h6 className="mb-1">จัดส่งฟรี</h6>
                      <p className="text-muted small mb-0">สำหรับคำสั่งซื้อ ฿1,000 ขึ้นไป</p>
                    </div>
                  </div>
                </div>
                
                <div className="neumorph-card p-3">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-arrow-return-left me-3 fs-4"></i>
                    <div>
                      <h6 className="mb-1">คืนสินค้าได้ใน 30 วัน</h6>
                      <p className="text-muted small mb-0">หากไม่พอใจสินค้า</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* รีวิวสินค้า */}
      <div className="neumorph-card p-4 mb-4">
        <h3 className="mb-4">รีวิวจากผู้ซื้อ</h3>
        
        {/* แสดงตัวอย่างรีวิว */}
        <div className="review-list">
          <div className="neumorph-inner p-3 mb-3">
            <div className="d-flex justify-content-between mb-2">
              <div className="d-flex align-items-center">
                <div className="neumorph-avatar me-2">
                  <i className="bi bi-person"></i>
                </div>
                <strong>คุณนภา</strong>
              </div>
              <div className="review-rating">
                <i className="bi bi-star-fill text-warning"></i>
                <i className="bi bi-star-fill text-warning"></i>
                <i className="bi bi-star-fill text-warning"></i>
                <i className="bi bi-star-fill text-warning"></i>
                <i className="bi bi-star text-warning"></i>
              </div>
            </div>
            <p className="mb-0">สินค้าคุณภาพดีมาก ส่งเร็ว แนะนำ</p>
          </div>
          
          <div className="neumorph-inner p-3">
            <div className="d-flex justify-content-between mb-2">
              <div className="d-flex align-items-center">
                <div className="neumorph-avatar me-2">
                  <i className="bi bi-person"></i>
                </div>
                <strong>คุณสมชาย</strong>
              </div>
              <div className="review-rating">
                <i className="bi bi-star-fill text-warning"></i>
                <i className="bi bi-star-fill text-warning"></i>
                <i className="bi bi-star-fill text-warning"></i>
                <i className="bi bi-star-fill text-warning"></i>
                <i className="bi bi-star-fill text-warning"></i>
              </div>
            </div>
            <p className="mb-0">ใช้งานได้ดีมาก คุ้มค่ากับราคา แนะนำให้ซื้อเลยครับ</p>
          </div>
        </div>
      </div>
      
      {/* สินค้าแนะนำ - แก้ไขส่วนนี้ให้ใช้ข้อมูลจริง */}
      <h3 className="mb-3">สินค้าที่คุณอาจสนใจ</h3>
      <div className="related-products">
        {/* แสดงสินค้าแนะนำจากข้อมูลจริง */}
        <div className="row">
          {relatedProducts.map(relatedProduct => (
            <div key={relatedProduct.id} className="col-6 col-md-3 mb-3">
              <div className="neumorph-card h-100 p-2">
                <a href={`/product/${relatedProduct.id}`} className="text-decoration-none">
                  <div className="neumorph-inner p-2 mb-2">
                    <div 
                      className="bg-light" 
                      style={{
                        height: '120px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        backgroundImage: `url(${relatedProduct.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      {!relatedProduct.image && (
                        <i className="bi bi-image text-muted" style={{fontSize: '2rem'}}></i>
                      )}
                    </div>
                  </div>
                  <div className="p-2">
                    <h6 className="mb-1">{relatedProduct.name}</h6>
                    <div className="d-flex align-items-center">
                      <p className="text-accent mb-0">฿{relatedProduct.price.toFixed(2)}</p>
                      {relatedProduct.discount > 0 && (
                        <span className="ms-2 small text-danger">-{relatedProduct.discount}%</span>
                      )}
                    </div>
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;