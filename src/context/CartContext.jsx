
import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // ดึงข้อมูลตะกร้าจาก localStorage (ถ้ามี)
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการอ่านข้อมูลตะกร้า:', error);
      return [];
    }
  });

  // บันทึกข้อมูลตะกร้าลง localStorage เมื่อมีการเปลี่ยนแปลง
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // เพิ่มสินค้าลงตะกร้า
  const addToCart = (product, quantity) => {
    setCart(prevCart => {
      // ตรวจสอบว่าสินค้าอยู่ในตะกร้าแล้วหรือไม่
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        // ถ้ามีสินค้าอยู่แล้ว เพิ่มจำนวน
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        // ถ้ายังไม่มีสินค้า เพิ่มสินค้าใหม่ลงตะกร้า
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  // ลบสินค้าออกจากตะกร้า
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // ปรับเปลี่ยนจำนวนสินค้า
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === productId 
          ? { ...item, quantity: newQuantity } 
          : item
      )
    );
  };

  // ล้างตะกร้าทั้งหมด
  const clearCart = () => {
    setCart([]);
  };

  // คำนวณราคารวมทั้งหมดในตะกร้า
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      getTotalPrice 
    }}>
      {children}
    </CartContext.Provider>
  );
};
