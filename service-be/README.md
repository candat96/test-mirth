# Service BE - Datalake API

API Backend để nhận dữ liệu từ Mirth ESB và lưu vào Datalake.

## Kiến trúc

```
┌─────────┐     POST      ┌────────────┐     INSERT     ┌─────────────┐
│  Mirth  │ ────────────▶ │ Service BE │ ─────────────▶ │  Datalake   │
│   ESB   │               │  (Node.js) │                │ (PostgreSQL)│
└─────────┘               └────────────┘                └─────────────┘
     ▲                          │
     │         GET              │
┌─────────┐               ┌────────────┐
│   App   │ ◀──────────── │ Service BE │
└─────────┘               └────────────┘
```

## Quick Start

```bash
# Khởi động
docker-compose up -d

# Xem logs
docker-compose logs -f

# Dừng
docker-compose down
```

## API Endpoints

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/health` | Health check |
| POST | `/api/v1/patients` | Tạo/cập nhật bệnh nhân |
| GET | `/api/v1/patients` | Lấy danh sách bệnh nhân |
| GET | `/api/v1/patients?tenantId=X` | Lọc theo tenant |
| GET | `/api/v1/patients/:id/history` | Lịch sử bệnh nhân xuyên tenant |
| POST | `/api/v1/encounters` | Tạo lượt khám |
| POST | `/api/v1/lab-results` | Tạo kết quả xét nghiệm |

## Cấu hình

| Biến | Mặc định | Mô tả |
|------|----------|-------|
| `PORT` | 3000 | Port API |
| `DB_HOST` | datalake-postgres | PostgreSQL host |
| `DB_PORT` | 5432 | PostgreSQL port |
| `DB_NAME` | datalake | Database name |
| `DB_USER` | datalake_user | Database user |
| `DB_PASSWORD` | datalake_pass | Database password |

## Test

```bash
# Health check
curl http://localhost:3000/health

# Tạo bệnh nhân
curl -X POST http://localhost:3000/api/v1/patients \
  -H "Content-Type: application/json" \
  -d '{"tenantId":"HOSPITAL_A","patientId":"PAT001","fullName":"Nguyen Van A","birthDate":"1985-03-15","gender":"male"}'

# Lấy danh sách
curl http://localhost:3000/api/v1/patients

# Lọc theo tenant
curl "http://localhost:3000/api/v1/patients?tenantId=HOSPITAL_A"
```

## Kết nối với Mirth

Service BE kết nối vào network `mirth-connect_mirth-network` để Mirth có thể gọi API.

Trong Mirth Channel, cấu hình HTTP Sender:
- URL: `http://service-be:3000/api/v1/patients`
- Method: POST
- Content-Type: application/json
