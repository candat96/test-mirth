import { ArrowRight, Database, Server, Smartphone, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="hero-bg-pattern"></div>
      </div>
      
      <div className="container hero-container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="hero-badge">
            <Shield size={16} />
            Healthcare Interoperability
          </span>
          
          <h1 className="hero-title">
            Phương án ESB + Datalake
            <span className="hero-title-accent"> cho Hệ thống Y tế</span>
          </h1>
          
          <p className="hero-description">
            Xây dựng nền tảng tích hợp trung tâm với Mirth Connect, chuẩn hóa dữ liệu HL7/FHIR/DICOM, 
            đảm bảo dữ liệu bệnh nhân xuyên suốt toàn hệ thống CIS, LIS/RIS/PACS, CRM và External HIS.
          </p>
          
          <div className="hero-actions">
            <a href="#architecture" className="btn btn-primary">
              Xem kiến trúc
              <ArrowRight size={20} />
            </a>
            <a href="#benefits" className="btn btn-outline hero-btn-outline">
              Lợi ích
            </a>
          </div>
        </motion.div>
        
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="hero-icons">
            <div className="hero-icon hero-icon-1">
              <Database size={32} />
              <span>Datalake</span>
            </div>
            <div className="hero-icon hero-icon-2">
              <Server size={32} />
              <span>ESB</span>
            </div>
            <div className="hero-icon hero-icon-3">
              <Smartphone size={32} />
              <span>App</span>
            </div>
          </div>
          
          <div className="hero-connections">
            <svg viewBox="0 0 400 300" className="hero-svg">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0d7a8c" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#0d7a8c" stopOpacity="1" />
                  <stop offset="100%" stopColor="#0d7a8c" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              <path
                d="M50 150 Q200 50 350 150"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                fill="none"
                className="hero-path"
              />
              <path
                d="M50 150 Q200 250 350 150"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                fill="none"
                className="hero-path hero-path-delay"
              />
            </svg>
          </div>
        </motion.div>
      </div>
      
      <div className="hero-stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">HL7/FHIR</span>
              <span className="stat-label">Chuẩn tích hợp</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">K8s</span>
              <span className="stat-label">Cloud Native</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">99%+</span>
              <span className="stat-label">Uptime SLA</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">Real-time</span>
              <span className="stat-label">Đồng bộ dữ liệu</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
