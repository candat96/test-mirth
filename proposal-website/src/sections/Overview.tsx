import { Target, Zap, Globe, Database } from 'lucide-react';
import { motion } from 'framer-motion';
import './Overview.css';

const objectives = [
  {
    icon: Target,
    title: 'Mục tiêu chính',
    description: 'Xây dựng nền tảng tích hợp trung tâm (ESB) kết nối toàn bộ CIS, CRM, ERM, HRM, PRM, app/portal và HIS bên ngoài.',
    color: 'primary',
  },
  {
    icon: Zap,
    title: 'Chuẩn hóa dữ liệu',
    description: 'Trao đổi dữ liệu đa chuẩn: HL7 FHIR, DICOM, CCD, JSON, XML đảm bảo tính thống nhất.',
    color: 'accent',
  },
  {
    icon: Database,
    title: 'Datalake cấp viện',
    description: 'Dựng Datalake phục vụ BI, AI/ML, báo cáo điều hành và đối soát vận hành.',
    color: 'success',
  },
  {
    icon: Globe,
    title: 'Tích hợp mở rộng',
    description: 'Hỗ trợ ADT, API mở cho đối tác, kiến trúc SOA linh hoạt và mở rộng dễ dàng.',
    color: 'primary',
  },
];

const currentSystems = [
  { name: 'CIS', desc: 'Clinical Information System' },
  { name: 'LIS', desc: 'Laboratory Information System' },
  { name: 'RIS', desc: 'Radiology Information System' },
  { name: 'PACS', desc: 'Picture Archiving System' },
  { name: 'CRM', desc: 'Customer Relationship Management' },
  { name: 'ERM', desc: 'Enterprise Resource Management' },
  { name: 'HRM', desc: 'Human Resource Management' },
  { name: 'PRM', desc: 'Patient Relationship Management' },
];

export default function Overview() {
  return (
    <section id="overview" className="section overview-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Tổng quan & Mục tiêu</h2>
          <p className="section-subtitle">
            Giải pháp ESB + Datalake giúp dữ liệu bệnh nhân xuyên suốt toàn hệ thống, 
            từ nội bộ đến các đối tác bên ngoài.
          </p>
        </motion.div>

        <div className="grid grid-4 objectives-grid">
          {objectives.map((item, index) => (
            <motion.div
              key={item.title}
              className="card objective-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className={`icon-box icon-box-${item.color}`}>
                <item.icon size={28} />
              </div>
              <h3 className="objective-title">{item.title}</h3>
              <p className="objective-desc">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="current-systems"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="subsection-title">Hệ thống hiện có</h3>
          <div className="systems-grid">
            {currentSystems.map((system) => (
              <div key={system.name} className="system-tag">
                <span className="system-name">{system.name}</span>
                <span className="system-desc">{system.desc}</span>
              </div>
            ))}
          </div>
          <p className="systems-note">
            <strong>Hạ tầng:</strong> Cloud K8s (Linode) • <strong>Database:</strong> MySQL • 
            <strong> Datawarehouse:</strong> 1 Service BE + 1 DB
          </p>
        </motion.div>
      </div>
    </section>
  );
}
