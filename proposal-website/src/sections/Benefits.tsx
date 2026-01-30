import { motion } from 'framer-motion';
import { 
  Layers, Clock, TrendingUp, Shield, 
  CheckCircle2, Settings, BarChart3, Users 
} from 'lucide-react';
import './Benefits.css';

const benefits = [
  {
    icon: Layers,
    title: 'Chuẩn hóa & hợp nhất',
    description: 'Hợp nhất luồng dữ liệu y tế (HL7 v2/FHIR/DICOM/CCD) thay vì point-to-point.',
    color: 'primary',
  },
  {
    icon: Clock,
    title: 'Giảm thời gian triển khai',
    description: 'Xây dựng interface nhanh nhờ mapping/transform và routing linh hoạt có sẵn.',
    color: 'accent',
  },
  {
    icon: TrendingUp,
    title: 'Mở rộng dễ dàng',
    description: 'Thêm hệ thống mới (HIS, LIS/RIS/PACS, app, đối tác) chỉ cần tạo channel.',
    color: 'success',
  },
  {
    icon: BarChart3,
    title: 'Giám sát realtime',
    description: 'Theo dõi luồng dữ liệu theo thời gian thực, dễ truy vết và xử lý lỗi.',
    color: 'primary',
  },
];

const values = [
  {
    icon: CheckCircle2,
    title: 'Đồng bộ xuyên suốt',
    description: 'Dữ liệu bệnh nhân thống nhất qua CIS/CRM/ERM/HRM/Portal/HIS.',
  },
  {
    icon: Users,
    title: 'Trải nghiệm bệnh nhân',
    description: 'Cập nhật kết quả và tương tác trên app/portal nhanh hơn.',
  },
  {
    icon: BarChart3,
    title: 'Phân tích & điều hành',
    description: 'Datalake tập trung phục vụ BI, báo cáo và ra quyết định.',
  },
  {
    icon: Settings,
    title: 'Giảm chi phí dài hạn',
    description: 'Giảm tích hợp lặp lại, tăng khả năng mở rộng theo SOA.',
  },
];

const operations = [
  'Xây dựng channel cho từng luồng (ADT, ORM/ORU, FHIR API, DICOM routing)',
  'Mỗi channel theo chuỗi: receive → validate → transform → route → log',
  'Quản trị trên dashboard: restart, xử lý lỗi, cảnh báo queue/latency',
  'Version hóa channel config, backup/restore định kỳ qua CI/CD',
];

export default function Benefits() {
  return (
    <section id="benefits" className="section benefits-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Lợi ích & Giá trị</h2>
          <p className="section-subtitle">
            Mirth Connect mang lại lợi ích vượt trội cho việc tích hợp và quản lý dữ liệu y tế
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-4 benefits-grid">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              className="card benefit-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className={`icon-box icon-box-${benefit.color}`}>
                <benefit.icon size={28} />
              </div>
              <h3 className="benefit-title">{benefit.title}</h3>
              <p className="benefit-desc">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Values and Operations */}
        <div className="benefits-details">
          <motion.div
            className="values-section"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="subsection-title">
              <Shield size={24} />
              Giá trị mang lại
            </h3>
            <div className="values-list">
              {values.map((value) => (
                <div key={value.title} className="value-item">
                  <div className="value-icon">
                    <value.icon size={20} />
                  </div>
                  <div className="value-content">
                    <h4>{value.title}</h4>
                    <p>{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="operations-section"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="subsection-title">
              <Settings size={24} />
              Cách thức vận hành
            </h3>
            <div className="operations-list">
              {operations.map((op, index) => (
                <div key={index} className="operation-item">
                  <span className="operation-number">{index + 1}</span>
                  <span className="operation-text">{op}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
