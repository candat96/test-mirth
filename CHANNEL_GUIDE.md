# Hướng dẫn tạo Channel Mirth Connect

## Tổng quan kiến trúc

```
┌─────────┐   POST :8081    ┌─────────────┐   POST :3000    ┌────────────┐   INSERT    ┌───────────┐
│   CIS   │ ──────────────▶ │ Mirth ESB   │ ──────────────▶ │ Service BE │ ──────────▶ │ Datalake  │
│ (Viện)  │                 │ Channel 1   │                 │ (Node.js)  │             │ (Postgres)│
└─────────┘                 └─────────────┘                 └────────────┘             └───────────┘
                                                                   │
┌─────────┐   GET :8082     ┌─────────────┐   GET :3000     ┌──────┴─────┐
│   App   │ ◀────────────── │ Mirth ESB   │ ◀────────────── │ Service BE │
│ (Portal)│                 │ Channel 2   │                 └────────────┘
└─────────┘                 └─────────────┘
```

---

## Bước 0: Khởi động Service BE

```bash
cd service-be
docker-compose up -d --build

# Kiểm tra
curl http://207.180.206.229:3000/health
```

---

## Channel 1: CIS_Patient_to_BE

**Mục đích:** Nhận bệnh nhân từ CIS → chuyển đến Service BE → lưu Datalake

### Tạo Channel

1. Mở **Mirth Administrator** → https://207.180.206.229:8443
2. **Channels** → **New Channel**

### Tab Summary

| Field | Value |
|-------|-------|
| Name | `CIS_Patient_to_BE` |
| Description | `Nhận bệnh nhân từ CIS, gửi đến Service BE` |
| Data Types → Inbound | `Raw` |
| Data Types → Outbound | `Raw` |

### Tab Source

| Field | Value |
|-------|-------|
| Connector Type | `HTTP Listener` |
| Host | `0.0.0.0` |
| Port | `8081` |
| Context Path | `/api/cis/patient` |
| Message Content | `Body` |
| Response Content Type | `application/json` |

### Tab Destinations

| Field | Value |
|-------|-------|
| Name | `Forward_to_BE` |
| Connector Type | `HTTP Sender` |
| URL | `http://service-be:3000/api/v1/patients` |
| Method | `POST` |
| Content Type | `application/json` |
| Content | `${message.rawData}` |

### Save & Deploy

1. Click **Save Changes** (Ctrl+S)
2. Vào **Dashboard** → chọn channel → **Deploy**
3. Đảm bảo Status = **Started** (màu xanh)

---

## Channel 2: App_Read_Patients

**Mục đích:** App đọc danh sách bệnh nhân từ Datalake

### Tab Summary

| Field | Value |
|-------|-------|
| Name | `App_Read_Patients` |
| Description | `API cho App đọc bệnh nhân từ Datalake` |
| Data Types → Inbound | `Raw` |
| Data Types → Outbound | `Raw` |

### Tab Source

| Field | Value |
|-------|-------|
| Connector Type | `HTTP Listener` |
| Host | `0.0.0.0` |
| Port | `8082` |
| Context Path | `/api/app/patients` |
| Response Content Type | `application/json` |

### Tab Destinations

| Field | Value |
|-------|-------|
| Name | `Query_BE` |
| Connector Type | `HTTP Sender` |
| URL | `http://service-be:3000/api/v1/patients` |
| Method | `GET` |
| Content Type | `application/json` |

---

## Channel 3: CIS_Encounter_to_BE

**Mục đích:** Nhận lượt khám từ CIS → lưu Datalake

### Tab Summary

| Field | Value |
|-------|-------|
| Name | `CIS_Encounter_to_BE` |
| Description | `Nhận lượt khám từ CIS` |
| Data Types | Inbound: `Raw`, Outbound: `Raw` |

### Tab Source

| Field | Value |
|-------|-------|
| Connector Type | `HTTP Listener` |
| Port | `8083` |
| Context Path | `/api/cis/encounter` |
| Message Content | `Body` |
| Response Content Type | `application/json` |

### Tab Destinations

| Field | Value |
|-------|-------|
| Name | `Forward_to_BE` |
| Connector Type | `HTTP Sender` |
| URL | `http://service-be:3000/api/v1/encounters` |
| Method | `POST` |
| Content Type | `application/json` |
| Content | `${message.rawData}` |

---

## Channel 4: LIS_LabResult_to_BE

**Mục đích:** Nhận kết quả xét nghiệm từ LIS → lưu Datalake

### Tab Summary

| Field | Value |
|-------|-------|
| Name | `LIS_LabResult_to_BE` |
| Description | `Nhận kết quả xét nghiệm từ LIS` |
| Data Types | Inbound: `Raw`, Outbound: `Raw` |

### Tab Source

| Field | Value |
|-------|-------|
| Connector Type | `HTTP Listener` |
| Port | `8084` |
| Context Path | `/api/lis/lab-result` |
| Message Content | `Body` |
| Response Content Type | `application/json` |

### Tab Destinations

| Field | Value |
|-------|-------|
| Name | `Forward_to_BE` |
| Connector Type | `HTTP Sender` |
| URL | `http://service-be:3000/api/v1/lab-results` |
| Method | `POST` |
| Content Type | `application/json` |
| Content | `${message.rawData}` |

---

## Tổng hợp Ports

| Port | Channel | Method | Endpoint |
|------|---------|--------|----------|
| 8081 | CIS_Patient_to_BE | POST | `/api/cis/patient` |
| 8082 | App_Read_Patients | GET | `/api/app/patients` |
| 8083 | CIS_Encounter_to_BE | POST | `/api/cis/encounter` |
| 8084 | LIS_LabResult_to_BE | POST | `/api/lis/lab-result` |
| 3000 | Service BE (direct) | ALL | `/api/v1/*` |

---

## Test Commands

### 1. Tạo bệnh nhân

```bash
curl -X POST "http://207.180.206.229:8081/api/cis/patient" \
  -H "Content-Type: application/json" \
  -d '{
    "tenantId": "HOSPITAL_A",
    "patientId": "PAT001",
    "fullName": "Nguyen Van A",
    "birthDate": "1985-03-15",
    "gender": "male",
    "phone": "0901234567",
    "address": "123 Le Loi, Q1, HCM"
  }'
```

### 2. Tạo lượt khám

```bash
curl -X POST "http://207.180.206.229:8083/api/cis/encounter" \
  -H "Content-Type: application/json" \
  -d '{
    "tenantId": "HOSPITAL_A",
    "encounterId": "ENC001",
    "patientId": "PAT001",
    "encounterType": "outpatient",
    "status": "in-progress",
    "diagnosis": "Khám tổng quát"
  }'
```

### 3. Gửi kết quả xét nghiệm

```bash
curl -X POST "http://207.180.206.229:8084/api/lis/lab-result" \
  -H "Content-Type: application/json" \
  -d '{
    "tenantId": "HOSPITAL_A",
    "resultId": "LAB001",
    "patientId": "PAT001",
    "testCode": "WBC",
    "testName": "White Blood Cell",
    "resultValue": "7.5",
    "unit": "10*3/uL",
    "status": "final"
  }'
```

### 4. Đọc danh sách bệnh nhân (qua Mirth)

```bash
curl "http://207.180.206.229:8082/api/app/patients"
```

### 5. Đọc trực tiếp từ BE

```bash
curl "http://207.180.206.229:3000/api/v1/patients"
```

### 6. Xem lịch sử bệnh nhân

```bash
curl "http://207.180.206.229:3000/api/v1/patients/PAT001/history"
```

---

## Chạy Test Script

```bash
./test_all.sh
```

---

## Kiểm tra Database

```bash
docker exec -it datalake-postgres psql -U datalake_user -d datalake -c "SELECT * FROM datalake.patients;"
```

---

## Troubleshooting

### Lỗi "Address already in use"
- Port đã bị chiếm, đổi sang port khác (8081, 8082, ...)

### Lỗi "Missing required fields"
- Kiểm tra **Content** trong Destination phải là `${message.rawData}`
- Kiểm tra **Message Content** trong Source phải là `Body`

### Lỗi "Connection refused to service-be"
- Kiểm tra Service BE đã chạy: `docker ps | grep service-be`
- Kiểm tra network: `docker network ls`
