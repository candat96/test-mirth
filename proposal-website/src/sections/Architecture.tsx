import { motion } from 'framer-motion';
import {
  Server, Database, Smartphone, Building2, ArrowRight, ArrowLeftRight,
  Workflow, FileJson, Radio, HardDrive, Users, Activity,
  GitBranch, Lock, Eye, Cpu, Cloud, UserCheck,
  HardDriveDownload, ArchiveRestore,
  HeartPulse, Search, FileText
} from 'lucide-react';
import './Architecture.css';

const components = [
  {
    id: 'esb',
    name: 'Mirth Connect ESB',
    desc: 'Nhận, lọc, biến đổi, định tuyến và ghi log các message y tế',
    icon: Server,
    color: 'primary',
  },
  {
    id: 'api',
    name: 'API Gateway',
    desc: 'Cung cấp API FHIR/REST cho app, portal, đối tác',
    icon: ArrowLeftRight,
    color: 'accent',
  },
  {
    id: 'datalake',
    name: 'Datalake',
    desc: 'Lưu trữ dữ liệu thô (raw) và chuẩn hóa (curated)',
    icon: Database,
    color: 'success',
  },
  {
    id: 'apps',
    name: 'Patient App/Portal',
    desc: 'Ứng dụng di động và cổng thông tin bệnh nhân',
    icon: Smartphone,
    color: 'primary',
  },
  {
    id: 'his',
    name: 'External HIS',
    desc: 'Kết nối liên thông với các hệ thống y tế đối tác',
    icon: Building2,
    color: 'accent',
  },
];

const internalSystems = [
  { name: 'Viện A', full: 'Tenant Viện A (CIS/CRM/HRM/EMR)', icon: Building2 },
  { name: 'Viện B', full: 'Tenant Viện B (CIS/CRM/HRM/EMR)', icon: Building2 },
  { name: 'Viện C', full: 'Tenant Viện C (CIS/CRM/HRM/EMR)', icon: Building2 },
  { name: 'HIS External', full: 'Tenant HIS External', icon: Building2 },
  { name: 'LIS', full: 'Laboratory Information System', icon: FileJson },
  { name: 'RIS', full: 'Radiology Information System', icon: Radio },
  { name: 'PACS', full: 'Picture Archiving System', icon: HardDrive },
];

const esbFeatures = [
  { icon: Workflow, title: 'Channel-based', desc: 'Mỗi luồng tích hợp là một channel độc lập' },
  { icon: GitBranch, title: 'Transform & Route', desc: 'Biến đổi dữ liệu và định tuyến linh hoạt' },
  { icon: FileJson, title: 'Multi-protocol', desc: 'HL7 v2, FHIR, DICOM, CCD, JSON, XML' },
  { icon: Eye, title: 'Monitoring', desc: 'Dashboard giám sát realtime, log tập trung' },
];

const k8sComponents = [
  { icon: Cloud, title: 'K8s Linode', desc: 'Hạ tầng cloud native, auto-scaling' },
  { icon: Cpu, title: 'StatefulSet', desc: 'Mirth Connect chạy dạng stateful với PV/PVC' },
  { icon: Database, title: 'PostgreSQL', desc: 'Database riêng cho ESB, HA primary/standby' },
  { icon: Lock, title: 'Security', desc: 'TLS, mTLS, RBAC, audit log' },
];

const protocols = [
  { name: 'HL7 v2', desc: 'ADT, ORM, ORU messages' },
  { name: 'HL7 FHIR', desc: 'Patient, Encounter, Observation, DiagnosticReport' },
  { name: 'DICOM', desc: 'Ảnh chẩn đoán, DICOMweb' },
  { name: 'CCD/C-CDA', desc: 'Tóm tắt hồ sơ bệnh án' },
  { name: 'JSON/XML', desc: 'REST API, custom format' },
];

const dataFlows = [
  { from: 'External HIS', to: 'ESB', message: 'HL7 ADT^A01', desc: 'Nhập viện/chuyển viện' },
  { from: 'LIS', to: 'ESB', message: 'HL7 ORU', desc: 'Kết quả xét nghiệm' },
  { from: 'RIS/PACS', to: 'ESB', message: 'DICOM/DICOMweb', desc: 'Ảnh chẩn đoán' },
  { from: 'ESB', to: 'CIS', message: 'FHIR/JSON', desc: 'Cập nhật hồ sơ' },
  { from: 'ESB', to: 'App/Portal', message: 'REST API', desc: 'Thông báo kết quả' },
  { from: 'ESB', to: 'Datalake', message: 'JSON/Parquet', desc: 'Lưu trữ phân tích' },
];

const dataStorages = [
  {
    name: 'Tenant DBs',
    icon: Database,
    type: 'Operational DB',
    desc: 'Mỗi tenant có bộ DB riêng cho CIS, CRM, HRM, EMR... hoàn toàn độc lập',
    data: ['CIS data', 'CRM data', 'HRM data', 'EMR data'],
    color: 'primary',
  },
  {
    name: 'PostgreSQL (ESB)',
    icon: Server,
    type: 'Integration DB',
    desc: 'Lưu trữ cấu hình channel, message log, audit trail',
    data: ['Channel configs', 'Message logs', 'Error queues', 'Audit trails'],
    color: 'accent',
  },
  {
    name: 'Datalake',
    icon: HardDriveDownload,
    type: 'Unified Storage',
    desc: 'Dữ liệu tổng hợp xuyên tenant, App/Portal đọc khi cần dữ liệu toàn hệ thống',
    data: ['Cross-tenant data', 'All services unified', 'Patient history', 'Analytics ready'],
    color: 'success',
  },
  {
    name: 'Datawarehouse',
    icon: ArchiveRestore,
    type: 'Reporting DB',
    desc: 'Service BE + DB hiện có, nhận dữ liệu chuẩn hóa từ ESB',
    data: ['KPI metrics', 'BI reports', 'Historical data', 'Aggregations'],
    color: 'warning',
  },
];

export default function Architecture() {
  return (
    <section id="architecture" className="section architecture-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Kiến trúc đề xuất</h2>
          <p className="section-subtitle">
            Mô hình ESB trung tâm kết nối tất cả hệ thống nội bộ và đối tác,
            đảm bảo dữ liệu xuyên suốt và chuẩn hóa.
          </p>
        </motion.div>

        {/* NEW: Patient Data Flow Diagram */}
        <motion.div
          className="patient-data-flow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="arch-detail-title">
            <UserCheck size={24} />
            Luồng dữ liệu bệnh nhân xuyên suốt hệ thống
          </h3>

          <div className="patient-flow-diagram">
            {/* Data Sources */}
            <div className="flow-column flow-sources">
              <h4 className="flow-column-title">Nguồn dữ liệu</h4>
              <div className="flow-items">
                <div className="flow-item flow-item-cis">
                  <Activity size={20} />
                  <span>CIS</span>
                  <small>Hồ sơ bệnh án</small>
                </div>
                <div className="flow-item flow-item-lis">
                  <FileJson size={20} />
                  <span>LIS</span>
                  <small>Xét nghiệm</small>
                </div>
                <div className="flow-item flow-item-ris">
                  <Radio size={20} />
                  <span>RIS/PACS</span>
                  <small>Chẩn đoán hình ảnh</small>
                </div>
                <div className="flow-item flow-item-prm">
                  <Users size={20} />
                  <span>PRM</span>
                  <small>Lịch hẹn & CS</small>
                </div>
                <div className="flow-item flow-item-erm">
                  <Activity size={20} />
                  <span>ERM</span>
                  <small>Thanh toán</small>
                </div>
                <div className="flow-item flow-item-his">
                  <Building2 size={20} />
                  <span>External HIS</span>
                  <small>Liên thông</small>
                </div>
              </div>
            </div>

            {/* ESB Hub */}
            <div className="flow-column flow-esb-hub">
              <div className="esb-hub-box">
                <div className="esb-hub-icon">
                  <Server size={40} />
                </div>
                <h4 style={{ color: '#FFF' }}>Mirth Connect ESB</h4>
                <div className="esb-hub-actions">
                  <span>Validate</span>
                  <span>Transform</span>
                  <span>Route</span>
                  <span>Log</span>
                </div>
                <div className="esb-hub-protocols">
                  <span>HL7</span>
                  <span>FHIR</span>
                  <span>DICOM</span>
                </div>
              </div>
              <div className="flow-arrows-vertical">
                <ArrowRight size={24} className="arrow-animated" />
                <ArrowRight size={24} className="arrow-animated" />
                <ArrowRight size={24} className="arrow-animated" />
              </div>
            </div>

            {/* API Layer */}
            <div className="flow-column flow-api">
              <h4 className="flow-column-title">API Layer</h4>
              <div className="api-layer-box">
                <ArrowLeftRight size={28} />
                <span>API Gateway</span>
                <div className="api-features">
                  <span>REST</span>
                  <span>FHIR</span>
                  <span>Auth</span>
                </div>
              </div>
              <div className="flow-arrows-vertical">
                <ArrowRight size={24} className="arrow-animated" />
              </div>
            </div>

            {/* Consumer Services */}
            <div className="flow-column flow-consumers">
              <h4 className="flow-column-title">Ứng dụng & Người dùng</h4>
              <div className="flow-items consumer-items">
                <div className="flow-item flow-item-app">
                  <Smartphone size={20} />
                  <span>Patient App</span>
                  <small>Bệnh nhân</small>
                </div>
                <div className="flow-item flow-item-doctor">
                  <Users size={20} />
                  <span>Doctor Portal</span>
                  <small>Bác sĩ</small>
                </div>
                <div className="flow-item flow-item-crm">
                  <Users size={20} />
                  <span>CRM/PRM</span>
                  <small>Chăm sóc KH</small>
                </div>
                <div className="flow-item flow-item-datalake">
                  <Database size={20} />
                  <span>Datalake</span>
                  <small>Phân tích</small>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* NEW: Data Storage Section - Nổi bật */}
        <motion.div
          className="data-storage-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="storage-title">
            <Database size={28} />
            Dữ liệu được lưu ở đâu?
          </h3>
          <p className="storage-subtitle">
            Kiến trúc phân tầng lưu trữ đảm bảo dữ liệu bệnh nhân được quản lý hiệu quả,
            an toàn và phục vụ đa mục đích.
          </p>

          <div className="storage-grid">
            {dataStorages.map((storage, index) => (
              <motion.div
                key={storage.name}
                className={`storage-card storage-card-${storage.color}`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={`storage-icon storage-icon-${storage.color}`}>
                  <storage.icon size={32} />
                </div>
                <div className="storage-type">{storage.type}</div>
                <h4 style={{ color: '#FFF' }} className="storage-name">{storage.name}</h4>
                <p className="storage-desc">{storage.desc}</p>
                <div className="storage-data">
                  {storage.data.map((item, i) => (
                    <span key={i} className="storage-data-tag">{item}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="storage-flow">
            <div className="storage-flow-item">
              <span className="flow-label">Operational</span>
              <ArrowRight size={20} />
              <span className="flow-label">ESB</span>
              <ArrowRight size={20} />
              <span className="flow-label">Datalake</span>
              <ArrowRight size={20} />
              <span className="flow-label">Datawarehouse</span>
            </div>
            <p className="storage-flow-desc">
              Dữ liệu chảy từ hệ thống nghiệp vụ → ESB chuẩn hóa → Datalake lưu trữ → Datawarehouse phân tích
            </p>
          </div>
        </motion.div>

        {/* NEW: Real-world Examples Section */}
        <motion.div
          className="realworld-examples-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="examples-title">
            <HeartPulse size={28} />
            Ví dụ thực tế: Dữ liệu lưu ở đâu & lấy từ đâu?
          </h3>
          <p className="examples-subtitle">
            Toàn bộ hệ sinh thái (CIS, CRM, HRM, EMR...) là multi-tenant. 
            Mỗi viện chỉ thao tác với dữ liệu của mình, nhưng bệnh nhân và báo cáo tổng hợp cần dữ liệu xuyên viện.
          </p>

          {/* Example 1: Hospital staff - single tenant */}
          <div className="example-card">
            <div className="example-header">
              <div className="example-icon example-icon-tenant">
                <Activity size={24} />
              </div>
              <div className="example-title-wrap">
                <h4>Nhân viên Viện A thao tác trên hệ thống</h4>
                <span className="example-tag example-tag-tenant">Single Tenant</span>
              </div>
            </div>
            
            <div className="example-flow">
              <div className="example-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h5>Đăng nhập hệ thống</h5>
                  <p>Xác thực thuộc Viện A</p>
                  <div className="step-storage">
                    <UserCheck size={14} />
                    <span>Tenant: <strong>Viện A</strong></span>
                  </div>
                </div>
              </div>
              
              <ArrowRight size={20} className="step-arrow" />
              
              <div className="example-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h5>Thao tác CIS/CRM/HRM...</h5>
                  <p>Chỉ thấy dữ liệu của Viện A</p>
                  <div className="step-storage">
                    <Database size={14} />
                    <span>Đọc/Ghi: <strong>DB Viện A</strong></span>
                  </div>
                </div>
              </div>
              
              <ArrowRight size={20} className="step-arrow" />
              
              <div className="example-step step-mirth">
                <div className="step-number step-number-mirth">3</div>
                <div className="step-content">
                  <h5>Mirth Connect đồng bộ</h5>
                  <p>Nhận event, transform, gắn tenant_id</p>
                  <div className="step-storage step-storage-mirth">
                    <Server size={14} />
                    <span><strong>ESB xử lý & route</strong></span>
                  </div>
                </div>
              </div>
              
              <ArrowRight size={20} className="step-arrow" />
              
              <div className="example-step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h5>Lưu vào Datalake</h5>
                  <p>Dữ liệu chuẩn hóa, có tenant_id</p>
                  <div className="step-storage">
                    <Database size={14} />
                    <span>Sync: <strong>Datalake</strong></span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="example-summary">
              <div className="summary-item">
                <span className="summary-label">Góc nhìn:</span>
                <span className="summary-value">Chỉ dữ liệu Viện A</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Mirth:</span>
                <span className="summary-value summary-value-mirth">Đồng bộ realtime → Datalake</span>
              </div>
            </div>
          </div>

          {/* Example 2: Patient - cross tenant */}
          <div className="example-card example-card-highlight">
            <div className="example-header">
              <div className="example-icon example-icon-multitenant">
                <Building2 size={24} />
              </div>
              <div className="example-title-wrap">
                <h4>Bệnh nhân xem lịch sử khám tại TẤT CẢ viện trong hệ sinh thái</h4>
                <span className="example-tag example-tag-multitenant">Cross-tenant Use Case</span>
              </div>
            </div>
            
            <div className="example-flow">
              <div className="example-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h5>Bệnh nhân mở App</h5>
                  <p>Xem "Lịch sử khám bệnh"</p>
                  <div className="step-storage step-storage-read">
                    <Search size={14} />
                    <span>Cần: <strong>Tất cả viện đã khám</strong></span>
                  </div>
                </div>
              </div>
              
              <ArrowRight size={20} className="step-arrow" />
              
              <div className="example-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h5>API Gateway</h5>
                  <p>Nhận biết cần xuyên tenant</p>
                  <div className="step-storage">
                    <Server size={14} />
                    <span>Route: <strong>Datalake</strong></span>
                  </div>
                </div>
              </div>
              
              <ArrowRight size={20} className="step-arrow" />
              
              <div className="example-step step-mirth">
                <div className="step-number step-number-mirth">3</div>
                <div className="step-content">
                  <h5>Datalake (by Mirth)</h5>
                  <p>Dữ liệu đã được Mirth chuẩn hóa & tổng hợp</p>
                  <div className="step-storage step-storage-mirth">
                    <Database size={14} />
                    <span><strong>Mirth đã sync từ tất cả tenant</strong></span>
                  </div>
                </div>
              </div>
              
              <ArrowRight size={20} className="step-arrow" />
              
              <div className="example-step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h5>Kết quả</h5>
                  <p>Viện A, B, C, HIS External</p>
                  <div className="step-storage">
                    <Smartphone size={14} />
                    <span>Hiển thị: <strong>Toàn hệ sinh thái</strong></span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="example-summary">
              <div className="summary-item">
                <span className="summary-label">Góc nhìn:</span>
                <span className="summary-value">Xuyên tất cả viện</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Mirth:</span>
                <span className="summary-value summary-value-mirth">Đã chuẩn hóa & tổng hợp sẵn</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Bao gồm:</span>
                <span className="summary-value">Cả HIS External</span>
              </div>
            </div>
          </div>

          {/* Mirth Role Highlight */}
          <div className="mirth-role-section">
            <div className="mirth-role-header">
              <Server size={32} />
              <h4>Vai trò của Mirth Connect trong kiến trúc Multi-tenant</h4>
            </div>
            <div className="mirth-role-grid">
              <div className="mirth-role-item">
                <div className="mirth-role-icon">
                  <Workflow size={24} />
                </div>
                <div className="mirth-role-content">
                  <h5>Thu thập dữ liệu</h5>
                  <p>Nhận event từ tất cả tenant (Viện A, B, C, HIS External) qua các channel riêng biệt</p>
                </div>
              </div>
              <div className="mirth-role-item">
                <div className="mirth-role-icon">
                  <GitBranch size={24} />
                </div>
                <div className="mirth-role-content">
                  <h5>Chuẩn hóa & Transform</h5>
                  <p>Chuyển đổi dữ liệu về format thống nhất (FHIR/JSON), gắn tenant_id để phân biệt nguồn</p>
                </div>
              </div>
              <div className="mirth-role-item">
                <div className="mirth-role-icon">
                  <Database size={24} />
                </div>
                <div className="mirth-role-content">
                  <h5>Đồng bộ vào Datalake</h5>
                  <p>Route dữ liệu đã chuẩn hóa vào Datalake, tạo nguồn dữ liệu tổng hợp xuyên tenant</p>
                </div>
              </div>
              <div className="mirth-role-item">
                <div className="mirth-role-icon">
                  <Eye size={24} />
                </div>
                <div className="mirth-role-content">
                  <h5>Giám sát & Audit</h5>
                  <p>Log tất cả message, tracking lỗi, đảm bảo không mất dữ liệu trong quá trình đồng bộ</p>
                </div>
              </div>
            </div>
            <div className="mirth-role-note">
              <strong>Không có Mirth Connect:</strong> Phải query từng DB của từng tenant → chậm, phức tạp, khó bảo trì.
              <br />
              <strong>Có Mirth Connect:</strong> Dữ liệu đã sẵn sàng trong Datalake → query nhanh, đơn giản, realtime.
            </div>
          </div>

          {/* Data Flow Summary */}
          <div className="data-flow-summary">
            <h4><FileText size={20} /> Tóm tắt: Nguồn dữ liệu theo góc nhìn</h4>
            <div className="summary-table">
              <div className="summary-row summary-row-header">
                <span>Góc nhìn / Use case</span>
                <span>Nguồn dữ liệu</span>
                <span>Ghi chú</span>
              </div>
              <div className="summary-row">
                <span>Viện thao tác hệ thống (CIS/CRM/HRM/EMR)</span>
                <span><strong>DB riêng của tenant</strong></span>
                <span>Chỉ thấy dữ liệu viện mình</span>
              </div>
              <div className="summary-row">
                <span>Viện xem báo cáo nội bộ</span>
                <span><strong>DB riêng của tenant</strong></span>
                <span>Realtime, isolated</span>
              </div>
              <div className="summary-row summary-row-highlight">
                <span>Bệnh nhân xem lịch sử khám tất cả viện</span>
                <span><strong>Datalake</strong></span>
                <span>Xuyên tenant trong hệ sinh thái</span>
              </div>
              <div className="summary-row summary-row-highlight">
                <span>Tổng hợp dữ liệu toàn hệ sinh thái (BI/KPI)</span>
                <span><strong>Datalake → Datawarehouse</strong></span>
                <span>Báo cáo, phân tích</span>
              </div>
              <div className="summary-row summary-row-highlight">
                <span>Dữ liệu từ HIS External</span>
                <span><strong>Datalake</strong></span>
                <span>HIS External cũng là 1 tenant</span>
              </div>
            </div>
            <div className="summary-note">
              <strong>Nguyên tắc:</strong> Viện chỉ thao tác với DB riêng của mình. 
              Khi cần dữ liệu xuyên viện (bệnh nhân xem lịch sử, báo cáo tổng hợp), 
              hệ thống đọc từ <strong>Datalake</strong> - nơi ESB đã đồng bộ và gắn tenant_id.
            </div>
          </div>
        </motion.div>

        {/* Main Architecture Diagram */}
        <motion.div
          className="architecture-diagram"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Internal Systems */}
          <div className="arch-internal">
            <h4 className="arch-group-title">Tenants & Hệ thống</h4>
            <div className="arch-systems">
              {internalSystems.map((sys) => (
                <div key={sys.name} className="arch-system-box" title={sys.full}>
                  <sys.icon size={16} />
                  <span className="arch-system-name">{sys.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Arrows to ESB */}
          <div className="arch-arrows">
            <ArrowRight size={32} className="arch-arrow" />
            <ArrowRight size={32} className="arch-arrow" />
          </div>

          {/* ESB Central */}
          <div className="arch-esb">
            <Server size={48} />
            <span className="arch-esb-title">Mirth Connect</span>
            <span className="arch-esb-subtitle">ESB / Integration Engine</span>
            <div className="arch-esb-features">
              <span className="esb-feature-tag">HL7</span>
              <span className="esb-feature-tag">FHIR</span>
              <span className="esb-feature-tag">DICOM</span>
            </div>
          </div>

          {/* Arrows from ESB */}
          <div className="arch-arrows">
            <ArrowRight size={32} className="arch-arrow" />
            <ArrowRight size={32} className="arch-arrow" />
          </div>

          {/* Outputs */}
          <div className="arch-outputs">
            <div className="arch-output-box arch-output-api">
              <ArrowLeftRight size={24} />
              <span>API Gateway</span>
            </div>
            <div className="arch-output-box arch-output-datalake">
              <Database size={24} />
              <span>Datalake</span>
            </div>
            <div className="arch-output-box arch-output-his">
              <Building2 size={24} />
              <span>External HIS</span>
            </div>
          </div>
        </motion.div>

        {/* ESB Features */}
        <motion.div
          className="arch-detail-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="arch-detail-title">
            <Server size={24} />
            Tính năng Mirth Connect ESB
          </h3>
          <div className="grid grid-4 esb-features-grid">
            {esbFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="esb-feature-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="esb-feature-icon">
                  <feature.icon size={24} />
                </div>
                <h4>{feature.title}</h4>
                <p>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Protocols */}
        <motion.div
          className="arch-detail-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="arch-detail-title">
            <FileJson size={24} />
            Chuẩn & Giao thức hỗ trợ
          </h3>
          <div className="protocols-grid">
            {protocols.map((protocol) => (
              <div key={protocol.name} className="protocol-card">
                <span className="protocol-name">{protocol.name}</span>
                <span className="protocol-desc">{protocol.desc}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Data Flows */}
        <motion.div
          className="arch-detail-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="arch-detail-title">
            <Workflow size={24} />
            Luồng dữ liệu chính
          </h3>
          <div className="data-flows-table">
            <div className="flow-header">
              <span>Nguồn</span>
              <span></span>
              <span>Đích</span>
              <span>Message</span>
              <span>Mô tả</span>
            </div>
            {dataFlows.map((flow, index) => (
              <motion.div
                key={index}
                className="flow-row"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <span className="flow-from">{flow.from}</span>
                <span className="flow-arrow"><ArrowRight size={16} /></span>
                <span className="flow-to">{flow.to}</span>
                <span className="flow-message">{flow.message}</span>
                <span className="flow-desc">{flow.desc}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* K8s Deployment */}
        <motion.div
          className="arch-detail-section k8s-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="arch-detail-title">
            <Cloud size={24} />
            Triển khai trên K8s Linode
          </h3>
          <div className="grid grid-4 k8s-grid">
            {k8sComponents.map((comp, index) => (
              <motion.div
                key={comp.title}
                className="k8s-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="k8s-icon">
                  <comp.icon size={28} />
                </div>
                <h4 style={{ color: '#FFF' }}>{comp.title}</h4>
                <p>{comp.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="k8s-specs">
            <div className="k8s-spec-item">
              <strong>Mirth Connect:</strong> 2-4 vCPU, 4-8GB RAM, JVM heap 2-4GB
            </div>
            <div className="k8s-spec-item">
              <strong>PostgreSQL:</strong> 2-4 vCPU, 8-16GB RAM, backup hằng ngày
            </div>
            <div className="k8s-spec-item">
              <strong>HA/DR:</strong> 2 replica + DB primary/standby + snapshot object storage
            </div>
          </div>
        </motion.div>

        {/* Components Description */}
        <div className="grid grid-3 components-grid">
          {components.map((comp, index) => (
            <motion.div
              key={comp.id}
              className="card component-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className={`icon-box icon-box-${comp.color}`}>
                <comp.icon size={24} />
              </div>
              <h4 className="component-name">{comp.name}</h4>
              <p className="component-desc">{comp.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
