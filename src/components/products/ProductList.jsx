
import React, { useState, useEffect, useContext } from 'react';
import ProductCard from './ProductCard';
import { ProductContext } from '../../context/ProductContext';
import "../../../public/product.json"

const ProductList = () => {
  const { products, loading, error } = useContext(ProductContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // ดึงหมวดหมู่ที่ไม่ซ้ำกันจากสินค้าทั้งหมด
  const categories = ['all', ...new Set(products.map(p => p.category))];
  
  // กรองสินค้าเมื่อมีการเปลี่ยนแปลงหมวดหมู่หรือคำค้นหา
  useEffect(() => {
    let result = [...products];
    
    // กรองตามหมวดหมู่
    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }
    
    // กรองตามคำค้นหา
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredProducts(result);
  }, [products, activeCategory, searchQuery]);
  
  // แสดงตัวโหลดถ้ากำลังโหลดข้อมูล
  if (loading) return (
    <div className="neumorph-loader-container text-center py-5">
      <div className="neumorph-loader mb-3"></div>
      <p>กำลังโหลดสินค้า...</p>
    </div>
  );
  
  // แสดงข้อความผิดพลาดถ้าเกิดปัญหา
  if (error) return (
    <div className="neumorph-error p-4 text-center">
      <i className="bi bi-exclamation-triangle fs-1 mb-3"></i>
      <p>{error}</p>
      <button className="neumorph-btn mt-3" onClick={() => window.location.reload()}>
        ลองใหม่อีกครั้ง
      </button>
    </div>
  );
  
  return (
    <div className="product-list-container">
      {/* ค้นหาและกรองสินค้า */}
      <div className="neumorph-card mb-4 p-3">
        <div className="row g-3">
          <div className="col-12">
            <div className="neumorph-input-group">
              <i className="bi bi-search input-icon"></i>
              <input
                type="search"
                className="neumorph-input form-control"
                placeholder="ค้นหาสินค้า..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="col-12">
            <div className="category-filters d-flex overflow-auto py-2">
              {categories.map(category => (
                <button
                  key={category}
                  className={`neumorph-pill me-2 ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category === 'all' ? 'ทั้งหมด' : category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* แสดงสินค้าเป็นกริด */}
      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <div className="neumorph-card p-4">
              <i className="bi bi-search display-4"></i>
              <h3 className="mt-3">ไม่พบสินค้า</h3>
              <p className="text-muted">
                ลองปรับเปลี่ยนคำค้นหาหรือหมวดหมู่
              </p>
            </div>
          </div>
        )}
      </div>
      
      {/* ปุ่มโหลดเพิ่ม (ถ้าจำเป็น) */}
      {filteredProducts.length > 0 && filteredProducts.length % 12 === 0 && (
        <div className="text-center mt-4">
          <button className="neumorph-btn px-4 py-2">
            โหลดเพิ่มเติม
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
