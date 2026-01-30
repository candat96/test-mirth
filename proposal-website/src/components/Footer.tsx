import { Activity, Heart } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <Activity size={24} />
            <span>Mirth ESB Proposal</span>
          </div>
          <p className="footer-text">
            Phương án ESB + Datalake cho hệ thống y tế
          </p>
          <p className="footer-copyright">
            Made with <Heart size={14} className="heart-icon" /> for Healthcare Interoperability
          </p>
        </div>
      </div>
    </footer>
  );
}
