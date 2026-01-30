import { useState, useEffect } from 'react';
import { Menu, X, Activity } from 'lucide-react';
import './Header.css';

const navLinks = [
  { href: '#overview', label: 'Tổng quan' },
  { href: '#architecture', label: 'Kiến trúc' },
  { href: '#benefits', label: 'Lợi ích' },
  { href: '#comparison', label: 'So sánh' },
  { href: '#roadmap', label: 'Lộ trình' },
  { href: '#contact', label: 'Liên hệ' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="container header-container">
        <a href="#" className="logo">
          <Activity size={32} />
          <span>Mirth ESB</span>
        </a>

        <nav className={`nav ${isMobileMenuOpen ? 'nav-open' : ''}`}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}
