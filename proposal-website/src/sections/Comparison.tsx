import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import './Comparison.css';

const comparisonData = [
  {
    criteria: 'Kiểu tích hợp',
    asIs: 'Point-to-point, phụ thuộc từng hệ thống',
    toBe: 'ESB chuẩn hóa, mở rộng theo channel',
    improved: true,
  },
  {
    criteria: 'Chuẩn dữ liệu',
    asIs: 'Nhiều chuẩn khác nhau, khó đồng nhất',
    toBe: 'HL7/FHIR/DICOM/CCD chuẩn hóa tại ESB',
    improved: true,
  },
  {
    criteria: 'Đồng bộ dữ liệu',
    asIs: 'Không đồng nhất, độ trễ cao',
    toBe: 'Đồng bộ gần realtime, có tracking',
    improved: true,
  },
  {
    criteria: 'Mở rộng đối tác',
    asIs: 'Tốn thời gian, phải tích hợp riêng',
    toBe: 'Thêm channel/connector nhanh',
    improved: true,
  },
  {
    criteria: 'Phân tích dữ liệu',
    asIs: 'BE tự thu thập, thiếu chuẩn hóa',
    toBe: 'Datalake ingest từ ESB, dữ liệu chuẩn',
    improved: true,
  },
  {
    criteria: 'Quản trị vận hành',
    asIs: 'Khó theo dõi toàn cục',
    toBe: 'Dashboard, log, audit tập trung',
    improved: true,
  },
];

export default function Comparison() {
  return (
    <section id="comparison" className="section comparison-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">So sánh As-Is vs To-Be</h2>
          <p className="section-subtitle">
            So sánh hiện trạng và kiến trúc đề xuất để thấy rõ giá trị cải thiện
          </p>
        </motion.div>

        <motion.div
          className="comparison-wrapper"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="comparison-header">
            <div className="comparison-col comparison-col-criteria">Tiêu chí</div>
            <div className="comparison-col comparison-col-asis">
              <XCircle size={20} />
              As-Is (Hiện tại)
            </div>
            <div className="comparison-col comparison-col-arrow"></div>
            <div className="comparison-col comparison-col-tobe">
              <CheckCircle2 size={20} />
              To-Be (Đề xuất)
            </div>
          </div>

          {comparisonData.map((row, index) => (
            <motion.div
              key={row.criteria}
              className="comparison-row"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="comparison-col comparison-col-criteria">
                {row.criteria}
              </div>
              <div className="comparison-col comparison-col-asis">
                {row.asIs}
              </div>
              <div className="comparison-col comparison-col-arrow">
                <ArrowRight size={24} className="arrow-icon" />
              </div>
              <div className="comparison-col comparison-col-tobe">
                {row.toBe}
                {row.improved && <span className="improved-badge">Cải thiện</span>}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
