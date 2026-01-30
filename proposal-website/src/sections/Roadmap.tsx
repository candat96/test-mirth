import { motion } from 'framer-motion';
import { 
  Server, Link, Database, BarChart3, CheckCircle2, 
  ClipboardList, Settings, TestTube, Rocket,
  GitBranch, FileJson, Bell, ArrowRight
} from 'lucide-react';
import './Roadmap.css';

const phases = [
  {
    phase: 'Giai đoạn 1',
    title: 'ESB & Tích hợp nội bộ',
    icon: Server,
    color: 'primary',
    tasks: [
      'Dựng ESB (Mirth Connect)',
      'Tạo channel core (ADT, scheduling, lab result)',
      'Kết nối CIS/CRM/PRM/Portal',
    ],
    duration: '2-3 tháng',
  },
  {
    phase: 'Giai đoạn 2',
    title: 'Tích hợp HIS & CLS',
    icon: Link,
    color: 'accent',
    tasks: [
      'Hoàn thiện kết nối HIS ngoài',
      'Đồng bộ LIS/RIS/PACS vào ESB',
      'Ingest dữ liệu vào Datalake',
    ],
    duration: '2-3 tháng',
  },
  {
    phase: 'Giai đoạn 3',
    title: 'Datalake & Analytics',
    icon: Database,
    color: 'success',
    tasks: [
      'Xây pipeline dữ liệu vào Datalake',
      'Dashboard, BI, KPI y tế và vận hành',
      'Chuẩn bị dữ liệu cho AI/ML',
    ],
    duration: '2-4 tháng',
  },
];

const integrationSteps = [
  {
    step: 1,
    title: 'Khảo sát & Phân tích',
    icon: ClipboardList,
    tasks: [
      'Xác định danh mục interface ưu tiên (ADT, lab result, appointment)',
      'Phân tích schema DB hiện tại của từng tenant',
      'Xác định event/trigger cần đồng bộ',
      'Định nghĩa Master Patient ID xuyên tenant',
    ],
    output: 'Interface Catalog & Data Mapping',
  },
  {
    step: 2,
    title: 'Thiết kế Mapping & Channel',
    icon: GitBranch,
    tasks: [
      'Thiết kế mapping chuẩn HL7/FHIR theo schema nội bộ',
      'Định nghĩa format message chuẩn (JSON/FHIR)',
      'Thiết kế channel trên Mirth cho từng luồng',
      'Xác định tenant_id strategy và routing rules',
    ],
    output: 'Channel Design & Mapping Rules',
  },
  {
    step: 3,
    title: 'Cấu hình Services',
    icon: Settings,
    tasks: [
      'CIS/CRM/HRM/EMR: Bổ sung hook/queue push event',
      'LIS/RIS/PACS: Cấu hình gửi HL7 ORU/ORM, DICOM',
      'Chuẩn hóa mã danh mục (code set) xuyên tenant',
      'App/Portal: Chuyển API xuyên tenant qua Datalake',
    ],
    output: 'Services configured',
  },
  {
    step: 4,
    title: 'Build & Deploy Channel',
    icon: Server,
    tasks: [
      'Xây dựng channel trên Mirth Connect',
      'Cấu hình transformer, filter, destination',
      'Kết nối với Datalake (ingest pipeline)',
      'Setup monitoring & alerting',
    ],
    output: 'Mirth Channels deployed',
  },
  {
    step: 5,
    title: 'Test & Đối soát',
    icon: TestTube,
    tasks: [
      'Unit test từng channel',
      'End-to-end test luồng dữ liệu',
      'Đối soát dữ liệu source vs Datalake',
      'Performance test với volume thực tế',
    ],
    output: 'Test Report & Sign-off',
  },
  {
    step: 6,
    title: 'Go-live & Vận hành',
    icon: Rocket,
    tasks: [
      'Go-live theo từng nhóm interface',
      'Theo dõi lỗi và tối ưu',
      'Training team vận hành',
      'Handover tài liệu và runbook',
    ],
    output: 'Production ready',
  },
];

const serviceChanges = [
  {
    service: 'CIS/CRM/HRM/EMR',
    icon: FileJson,
    changes: [
      'Chuẩn hóa API/DB mapping (patient, encounter, appointment)',
      'Bổ sung hook hoặc message queue push event khi có thay đổi',
      'Đồng bộ Master Patient ID xuyên tenant',
    ],
  },
  {
    service: 'LIS/RIS/PACS',
    icon: Settings,
    changes: [
      'Cấu hình gửi HL7 ORU/ORM sang Mirth',
      'Setup DICOM/DICOMweb cho ảnh chẩn đoán',
      'Chuẩn hóa mã danh mục (LOINC, SNOMED)',
    ],
  },
  {
    service: 'App/Portal',
    icon: Bell,
    changes: [
      'API đọc dữ liệu xuyên tenant → query Datalake',
      'API đọc/ghi 1 tenant → query DB trực tiếp',
      'Chuẩn hóa notify kết quả khám, nhắc lịch',
    ],
  },
  {
    service: 'Datalake/DW',
    icon: Database,
    changes: [
      'Định nghĩa contract dữ liệu đầu vào từ ESB',
      'Cập nhật pipeline ingest theo chuẩn FHIR/JSON',
      'Bổ sung bảng mapping và đối soát dữ liệu',
    ],
  },
];

const kpis = [
  { label: 'Tỷ lệ đồng bộ thành công', value: '> 99%' },
  { label: 'Độ trễ đồng bộ', value: '< 5 phút' },
  { label: 'Tỷ lệ lỗi interface', value: '< 1%/ngày' },
  { label: 'Độ đầy đủ dữ liệu bệnh nhân', value: '> 98%' },
];

export default function Roadmap() {
  return (
    <section id="roadmap" className="section roadmap-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Lộ trình triển khai</h2>
          <p className="section-subtitle">
            Triển khai theo từng giai đoạn, đảm bảo kiểm soát rủi ro và giá trị tích lũy
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="roadmap-timeline">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.phase}
              className={`roadmap-phase roadmap-phase-${phase.color}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="phase-header">
                <div className={`phase-icon phase-icon-${phase.color}`}>
                  <phase.icon size={28} />
                </div>
                <div className="phase-info">
                  <span className="phase-label">{phase.phase}</span>
                  <h3 className="phase-title">{phase.title}</h3>
                  <span className="phase-duration">{phase.duration}</span>
                </div>
              </div>
              <ul className="phase-tasks">
                {phase.tasks.map((task, i) => (
                  <li key={i}>
                    <CheckCircle2 size={16} />
                    {task}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Integration Steps */}
        <motion.div
          className="integration-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="integration-title">
            <Settings size={28} />
            Các bước triển khai tích hợp vào hệ thống đã có
          </h3>
          <p className="integration-subtitle">
            Quy trình chi tiết để tích hợp Mirth Connect ESB vào hệ sinh thái multi-tenant hiện tại
          </p>

          <div className="integration-steps">
            {integrationSteps.map((item, index) => (
              <motion.div
                key={item.step}
                className="integration-step"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="step-header">
                  <div className="step-number-box">
                    <item.icon size={24} />
                    <span className="step-num">{item.step}</span>
                  </div>
                  <div className="step-title-wrap">
                    <h4>{item.title}</h4>
                    <span className="step-output">Output: {item.output}</span>
                  </div>
                </div>
                <ul className="step-tasks">
                  {item.tasks.map((task, i) => (
                    <li key={i}>
                      <CheckCircle2 size={14} />
                      {task}
                    </li>
                  ))}
                </ul>
                {index < integrationSteps.length - 1 && (
                  <div className="step-arrow">
                    <ArrowRight size={20} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Service Changes */}
        <motion.div
          className="service-changes-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="service-changes-title">
            <GitBranch size={24} />
            Thay đổi cần thực hiện trên các service
          </h3>
          <div className="service-changes-grid">
            {serviceChanges.map((item, index) => (
              <motion.div
                key={item.service}
                className="service-change-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="service-change-header">
                  <item.icon size={24} />
                  <h4>{item.service}</h4>
                </div>
                <ul>
                  {item.changes.map((change, i) => (
                    <li key={i}>
                      <CheckCircle2 size={14} />
                      {change}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* KPIs */}
        <motion.div
          className="kpi-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="kpi-title" style={{ color: '#FFF' }}>
            <BarChart3 size={24} />
            KPI / Chỉ số thành công
          </h3>
          <div className="kpi-grid">
            {kpis.map((kpi) => (
              <div key={kpi.label} className="kpi-card">
                <span className="kpi-value">{kpi.value}</span>
                <span className="kpi-label">{kpi.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
