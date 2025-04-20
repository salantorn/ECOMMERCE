
/**
 * ฟังก์ชันช่วยในการรวมสินค้าในตะกร้า
 * @param {Array} cart - ตะกร้าปัจจุบัน
 * @param {Object} product - สินค้าที่จะเพิ่ม
 * @param {Number} quantity - จำนวนที่จะเพิ่ม
 */
export const addProductToCart = (cart, product, quantity) => {
  const existingItem = cart.find(item => item.id === product.id);
  
  if (existingItem) {
    return cart.map(item => 
      item.id === product.id 
        ? { ...item, quantity: item.quantity + quantity } 
        : item
    );
  } else {
    return [...cart, { ...product, quantity }];
  }
};

/**
 * ฟังก์ชันคำนวณราคารวมของสินค้าในตะกร้า
 * @param {Array} cart - ตะกร้าปัจจุบัน
 */
export const calculateTotal = (cart) => {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

/**
 * ฟังก์ชันกรองสินค้าตามหมวดหมู่
 * @param {Array} products - สินค้าทั้งหมด
 * @param {String} category - หมวดหมู่ที่ต้องการกรอง
 */
export const filterProductsByCategory = (products, category) => {
  if (category === 'all') return products;
  return products.filter(product => product.category === category);
};

/**
 * ฟังก์ชันค้นหาสินค้าตามคำค้นหา
 * @param {Array} products - สินค้าทั้งหมด
 * @param {String} query - คำค้นหา
 */
export const searchProducts = (products, query) => {
  if (!query) return products;
  
  const searchText = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(searchText) || 
    product.description.toLowerCase().includes(searchText)
  );
};

/**
 * ฟังก์ชันจัดรูปแบบราคา
 * @param {Number} price - ราคาสินค้า
 * @param {String} currency - สกุลเงิน (ค่าเริ่มต้น: ฿)
 */
export const formatPrice = (price, currency = '฿') => {
  return `${currency}${price.toFixed(2)}`;
};

/**
 * ฟังก์ชันสร้าง URL ที่ปลอดภัย
 * @param {String} text - ข้อความที่ต้องการแปลง
 */
export const createSlug = (text) => {
  const a = 'àáäâèéëêìíïîòóöôùúüûñçขาคดีทีเดธนยบลฟฟฟ'
  const b = 'aaaaeeeeiiiioooouuuunccdttnnyblppp'
  const p = new RegExp(a.split('').join('|'), 'g')

  return text.toString().toLowerCase()
    .replace(/\s+/g, '-') // แทนที่ช่องว่างด้วยเครื่องหมายยัติภังค์
    .replace(p, c => b.charAt(a.indexOf(c))) // แทนที่อักขระพิเศษ
    .replace(/&/g, '-and-') // แทนที่ & ด้วย '-and-'
    .replace(/[^\w\-]+/g, '') // ลบอักขระที่ไม่ใช่ word
    .replace(/\-\-+/g, '-') // แทนที่เครื่องหมายยัติภังค์หลายอันด้วยอันเดียว
    .replace(/^-+/, '') // ตัดเครื่องหมายยัติภังค์จากจุดเริ่มต้น
    .replace(/-+$/, ''); // ตัดเครื่องหมายยัติภังค์จากจุดสิ้นสุด
};
