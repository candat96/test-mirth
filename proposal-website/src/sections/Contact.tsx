import { motion } from 'framer-motion';
import { Mail, ExternalLink, User } from 'lucide-react';
import './Contact.css';

const references = [
  {
    title: 'Mirth Connect Integration Engine',
    url: 'https://www.nextgen.com/solutions/interoperability/mirth-integration-engine',
  },
  {
    title: 'Mirth Family Insights',
    url: 'https://www.nextgen.com/insight/interop/demo/mirth-family-insights',
  },
  {
    title: 'GitHub - Mirth Connect',
    url: 'https://github.com/nextgenhealthcare/connect',
  },
  {
    title: 'Mirth Connect Wiki',
    url: 'https://github.com/nextgenhealthcare/connect/wiki',
  },
];

export default function Contact() {
  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Tài liệu tham chiếu</h2>
          <p className="section-subtitle">
            Tìm hiểu thêm về Mirth Connect và các tài liệu liên quan
          </p>
        </motion.div>

        <div className="contact-grid contact-grid-single">
          {/* References */}
          <motion.div
            className="references"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3>Nguồn tham khảo</h3>
            <div className="references-list">
              {references.map((ref) => (
                <a
                  key={ref.title}
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="reference-item"
                >
                  <span>{ref.title}</span>
                  <ExternalLink size={16} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Author Info */}
        <motion.div
          className="author-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="author-card">
            <div className="author-icon">
              <User size={24} />
            </div>
            <div className="author-info">
              <span className="author-label">Người tạo tài liệu</span>
              <a href="mailto:datcv@deepcare.vn" className="author-email">
                <Mail size={16} />
                datcv@deepcare.vn
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
