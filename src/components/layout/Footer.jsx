
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="neumorph-footer mt-5">
      <div className="container py-4">
        <div className="row gy-4">
          {/* หัวข้อและรายละเอียดร้าน */}
          <div className="col-12 col-md-4">
            <h3 className="mb-3">นิวมอร์ฟช็อป</h3>
            <p className="text-muted">
              ร้านค้าออนไลน์ที่นำเสนอสินค้าคุณภาพดีในดีไซน์ที่ทันสมัย 
              มอบประสบการณ์การช้อปปิ้งที่เรียบง่ายและสะดวกสบาย
            </p>
            <div className="social-icons d-flex mt-3">
              <a href="https://www.facebook.com/salantron.ketpru.3?locale=th_TH" className="neumorph-social-icon me-2" aria-label="เฟซบุ๊ก">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="neumorph-social-icon me-2" aria-label="เบอร์โทรศัพท์">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="neumorph-social-icon me-2" aria-label="ทวิตเตอร์">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="neumorph-social-icon" aria-label="ไลน์">
                <i className="bi bi-line"></i>
              </a>
            </div>
          </div>
          
          {/* ลิงก์ด่วน */}
          <div className="col-6 col-md-4">
            <h5 className="mb-3">ลิงก์ด่วน</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="footer-link">หน้าหลัก</Link>
              </li>
              <li className="mb-2">
                <Link to="/products" className="footer-link">สินค้าทั้งหมด</Link>
              </li>
              <li className="mb-2">
                <Link to="/cart" className="footer-link">ตะกร้าสินค้า</Link>
              </li>
              <li className="mb-2">
                <Link to="/profile" className="footer-link">บัญชีของฉัน</Link>
              </li>
            </ul>
          </div>
          
          {/* ข้อมูลติดต่อ */}
          <div className="col-6 col-md-4">
            <h5 className="mb-3">ติดต่อเรา</h5>
            <ul className="list-unstyled">
              <li className="mb-2 d-flex">
                <i className="bi bi-geo-alt me-2"></i>
                <span>123 ถนนสุขุมวิท กรุงเทพฯ 10110</span>
              </li>
              <li className="mb-2 d-flex">
                <i className="bi bi-telephone me-2"></i>
                <span>02-345-6789</span>
              </li>
              <li className="mb-2 d-flex">
                <i className="bi bi-envelope me-2"></i>
                <span>contact@neumorph.co.th</span>
              </li>
              <li className="mb-2 d-flex">
                <i className="bi bi-clock me-2"></i>
                <span>เปิดทุกวัน 09:00 - 18:00 น.</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* ลิขสิทธิ์ */}
        <div className="border-top mt-4 pt-4 text-center">
          <p className="small text-muted mb-0">
            &copy; {currentYear} NeuShop. สงวนลิขสิทธิ์ทั้งหมด.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;