
import React, { useState } from 'react';

const UserProfile = () => {
  // ข้อมูลผู้ใช้จำลอง
  const [user, setUser] = useState({
    name: 'คุณสมชาย รักการช้อป',
    email: 'somchai@example.com',
    phone: '089-123-4567',
    address: '123/45 หมู่ 6 ตำบลสุขุมวิท อำเภอคลองเตย กรุงเทพฯ 10110',
    birthdate: '1990-05-15',
    memberSince: '2023-01-10',
    profileImage: null // ไม่มีรูปโปรไฟล์
  });
  
  // ข้อมูลคำสั่งซื้อจำลอง
  const orders = [
    {
      id: 'ORD2023001',
      date: '2023-10-25',
      total: 2590.00,
      status: 'delivered',
      items: 3
    },
    {
      id: 'ORD2023002',
      date: '2023-09-18',
      total: 1250.00,
      status: 'shipped',
      items: 2
    },
    {
      id: 'ORD2023003',
      date: '2023-08-05',
      total: 3740.00,
      status: 'processing',
      items: 4
    }
  ];
  
  // ข้อมูลสินค้าโปรด
  const wishlist = [
    {
      id: 101,
      name: 'หูฟังไร้สาย Bluetooth 5.0',
      price: 1290.00,
      image: 'https://via.placeholder.com/150x150'
    },
    {
      id: 102,
      name: 'กระเป๋าเป้ลายสก๊อต',
      price: 890.00,
      image: 'https://via.placeholder.com/150x150'
    }
  ];
  
  // สถานะแท็บที่เลือก
  const [activeTab, setActiveTab] = useState('profile');
  
  // ฟังก์ชันแสดงสถานะคำสั่งซื้อ
  const getStatusText = (status) => {
    switch (status) {
      case 'processing':
        return 'กำลังจัดการ';
      case 'shipped':
        return 'จัดส่งแล้ว';
      case 'delivered':
        return 'จัดส่งเรียบร้อย';
      default:
        return status;
    }
  };
  
  // ฟังก์ชันแสดงสีตามสถานะ
  const getStatusColor = (status) => {
    switch (status) {
      case 'processing':
        return 'text-primary';
      case 'shipped':
        return 'text-info';
      case 'delivered':
        return 'text-success';
      default:
        return '';
    }
  };
  
  return (
    <div className="user-profile-container">
      <h1 className="mb-4">โปรไฟล์ของฉัน</h1>
      
      <div className="row">
        {/* ข้อมูลส่วนตัว */}
        <div className="col-lg-4 mb-4 mb-lg-0">
          <div className="neumorph-card profile-card p-4 text-center">
            {/* รูปโปรไฟล์ */}
            <div className="profile-image-container mx-auto mb-3">
              {user.profileImage ? (
                <img src={user.profileImage} alt={user.name} className="profile-image" />
              ) : (
                <div className="profile-image-placeholder">
                  <i className="bi bi-person"></i>
                </div>
              )}
            </div>
            
            <h3 className="mb-1">{user.name}</h3>
            <p className="text-muted mb-3">
              สมาชิกตั้งแต่: {new Date(user.memberSince).toLocaleDateString('th-TH')}
            </p>
            
            <div className="profile-contact neumorph-inner p-3 text-start mb-3">
              <div className="d-flex align-items-center mb-2">
                <i className="bi bi-envelope me-2"></i>
                <span>{user.email}</span>
              </div>
              <div className="d-flex align-items-center mb-2">
                <i className="bi bi-telephone me-2"></i>
                <span>{user.phone}</span>
              </div>
              <div className="d-flex align-items-start">
                <i className="bi bi-geo-alt me-2 mt-1"></i>
                <span>{user.address}</span>
              </div>
            </div>
            
            <button className="neumorph-btn w-100">
              <i className="bi bi-pencil me-2"></i>
              แก้ไขโปรไฟล์
            </button>
          </div>
        </div>
        
        {/* แท็บและรายละเอียด */}
        <div className="col-lg-8">
          <div className="neumorph-card p-4">
            {/* แท็บนำทาง */}
            <ul className="nav nav-tabs neumorph-tabs mb-4">
              <li className="nav-item">
                <button 
                  className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`}
                  onClick={() => setActiveTab('profile')}
                >
                  <i className="bi bi-person me-2"></i>
                  ข้อมูลส่วนตัว
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link ${activeTab === 'orders' ? 'active' : ''}`}
                  onClick={() => setActiveTab('orders')}
                >
                  <i className="bi bi-bag me-2"></i>
                  ประวัติคำสั่งซื้อ
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link ${activeTab === 'wishlist' ? 'active' : ''}`}
                  onClick={() => setActiveTab('wishlist')}
                >
                  <i className="bi bi-heart me-2"></i>
                  สินค้าโปรด
                </button>
              </li>
            </ul>
            
            {/* เนื้อหาตามแท็บที่เลือก */}
            <div className="tab-content">
              {/* ข้อมูลส่วนตัว */}
              {activeTab === 'profile' && (
                <div className="profile-form">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">ชื่อ-นามสกุล</label>
                      <input type="text" className="neumorph-input form-control" value={user.name} readOnly />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">วันเกิด</label>
                      <input type="date" className="neumorph-input form-control" value={user.birthdate} readOnly />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">อีเมล</label>
                      <input type="email" className="neumorph-input form-control" value={user.email} readOnly />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">เบอร์โทรศัพท์</label>
                      <input type="tel" className="neumorph-input form-control" value={user.phone} readOnly />
                    </div>
                    <div className="col-12">
                      <label className="form-label">ที่อยู่</label>
                      <textarea className="neumorph-input form-control" rows="2" value={user.address} readOnly></textarea>
                    </div>
                    
                    <div className="col-12 mt-4">
                      <div className="d-flex justify-content-end">
                        <button className="neumorph-btn-primary px-4 py-2">
                          <i className="bi bi-pencil me-2"></i>
                          แก้ไขข้อมูล
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* ประวัติคำสั่งซื้อ */}
              {activeTab === 'orders' && (
                <div className="orders-history">
                  {orders.length > 0 ? (
                    <div className="neumorph-inner p-3">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>รหัสคำสั่งซื้อ</th>
                            <th>วันที่</th>
                            <th>จำนวนสินค้า</th>
                            <th>ราคารวม</th>
                            <th>สถานะ</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map(order => (
                            <tr key={order.id}>
                              <td><strong>{order.id}</strong></td>
                              <td>{new Date(order.date).toLocaleDateString('th-TH')}</td>
                              <td>{order.items} รายการ</td>
                              <td>฿{order.total.toFixed(2)}</td>
                              <td>
                                <span className={getStatusColor(order.status)}>
                                  {getStatusText(order.status)}
                                </span>
                              </td>
                              <td>
                                <button className="neumorph-btn-sm">ดูรายละเอียด</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-5">
                      <i className="bi bi-bag-x display-4 mb-3"></i>
                      <h4>ยังไม่มีประวัติการสั่งซื้อ</h4>
                      <p className="text-muted">เริ่มช้อปปิ้งเพื่อดูประวัติคำสั่งซื้อของคุณที่นี่</p>
                      <button className="neumorph-btn mt-2">เริ่มช้อปเลย</button>
                    </div>
                  )}
                </div>
              )}
              
              {/* สินค้าโปรด */}
              {activeTab === 'wishlist' && (
                <div className="wishlist-items">
                  {wishlist.length > 0 ? (
                    <div className="row">
                      {wishlist.map(item => (
                        <div key={item.id} className="col-md-6 mb-3">
                          <div className="neumorph-inner p-3">
                            <div className="d-flex">
                              <div className="wishlist-item-image me-3">
                                <img src={item.image} alt={item.name} className="img-fluid rounded" />
                              </div>
                              <div className="wishlist-item-details flex-grow-1">
                                <h6 className="mb-1">{item.name}</h6>
                                <div className="price mb-2">฿{item.price.toFixed(2)}</div>
                                <div className="d-flex gap-2">
                                  <button className="neumorph-btn-sm flex-grow-1">
                                    <i className="bi bi-cart-plus me-1"></i>
                                    เพิ่มลงตะกร้า
                                  </button>
                                  <button className="neumorph-btn-danger-sm">
                                    <i className="bi bi-trash"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-5">
                      <i className="bi bi-heart display-4 mb-3"></i>
                      <h4>ยังไม่มีสินค้าโปรด</h4>
                      <p className="text-muted">กดปุ่มหัวใจที่สินค้าเพื่อเพิ่มในรายการโปรด</p>
                      <button className="neumorph-btn mt-2">ค้นหาสินค้า</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
