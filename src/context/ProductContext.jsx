
import React, { createContext, useState, useEffect } from 'react';
import '../../public/product.json';
export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // จำลองการดึงข้อมูลสินค้าจาก API
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // ในโปรเจคจริงจะดึงข้อมูลจาก API
        // แต่ในที่นี้จะใช้ไฟล์ JSON จำลอง
        const response = await fetch('../../public/product.json');
        
        if (!response.ok) {
          throw new Error('ไม่สามารถดึงข้อมูลสินค้าได้');
        }
        
        const data = await response.json();
        setProducts(data);
        setError(null);
      } catch (err) {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า:', err);
        setError('ไม่สามารถโหลดข้อมูลสินค้าได้ กรุณาลองใหม่อีกครั้ง');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ฟังก์ชันค้นหาสินค้าตาม ID
  const getProductById = (id) => {
    return products.find(product => product.id === parseInt(id) || product.id === id);
  };

  return (
    <ProductContext.Provider value={{ 
      products, 
      loading, 
      error, 
      getProductById 
    }}>
      {children}
    </ProductContext.Provider>
  );
};
