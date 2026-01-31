#!/bin/bash
# =====================================================
# Test Script: Mirth ESB -> Service BE -> Datalake
# =====================================================

SERVER="${SERVER:-207.180.206.229}"

echo "=========================================="
echo "  TEST: Mirth ESB Integration"
echo "  Server: $SERVER"
echo "=========================================="

# =====================================================
# 0. Health Check
# =====================================================
echo ""
echo "🔍 0. Health Check Service BE..."
curl -s "http://${SERVER}:3000/health" | jq .

# =====================================================
# 1. Test CIS tạo bệnh nhân
# =====================================================
echo ""
echo "📝 1. CIS tạo bệnh nhân (POST :8081/api/cis/patient)"
echo "-------------------------------------------"

echo "➡️  Bệnh nhân PAT001 - Viện A"
curl -s -X POST "http://${SERVER}:8081/api/cis/patient" \
  -H "Content-Type: application/json" \
  -d '{
    "tenantId": "HOSPITAL_A",
    "patientId": "PAT001",
    "fullName": "Nguyen Van A",
    "birthDate": "1985-03-15",
    "gender": "male",
    "phone": "0901234567",
    "address": "123 Le Loi, Q1, HCM"
  }' | jq .

echo ""
echo "➡️  Bệnh nhân PAT002 - Viện A"
curl -s -X POST "http://${SERVER}:8081/api/cis/patient" \
  -H "Content-Type: application/json" \
  -d '{
    "tenantId": "HOSPITAL_A",
    "patientId": "PAT002",
    "fullName": "Tran Thi B",
    "birthDate": "1990-07-20",
    "gender": "female",
    "phone": "0912345678",
    "address": "456 Nguyen Hue, Q1, HCM"
  }' | jq .

echo ""
echo "➡️  Bệnh nhân PAT003 - Viện B (tenant khác)"
curl -s -X POST "http://${SERVER}:8081/api/cis/patient" \
  -H "Content-Type: application/json" \
  -d '{
    "tenantId": "HOSPITAL_B",
    "patientId": "PAT003",
    "fullName": "Le Van C",
    "birthDate": "1978-12-01",
    "gender": "male",
    "phone": "0923456789",
    "address": "789 Hai Ba Trung, Q3, HCM"
  }' | jq .

echo ""
echo "➡️  Bệnh nhân PAT004 - HIS External"
curl -s -X POST "http://${SERVER}:8081/api/cis/patient" \
  -H "Content-Type: application/json" \
  -d '{
    "tenantId": "HIS_EXTERNAL",
    "patientId": "PAT004",
    "fullName": "Pham Thi D",
    "birthDate": "1995-05-10",
    "gender": "female",
    "phone": "0934567890",
    "address": "321 CMT8, Q10, HCM"
  }' | jq .

sleep 1

# =====================================================
# 2. Test CIS tạo lượt khám
# =====================================================
echo ""
echo "🏥 2. CIS tạo lượt khám (POST :8083/api/cis/encounter)"
echo "-------------------------------------------"

echo "➡️  Lượt khám ENC001 cho PAT001"
curl -s -X POST "http://${SERVER}:8083/api/cis/encounter" \
  -H "Content-Type: application/json" \
  -d '{
    "tenantId": "HOSPITAL_A",
    "encounterId": "ENC001",
    "patientId": "PAT001",
    "encounterType": "outpatient",
    "status": "in-progress",
    "startTime": "2026-01-31T08:00:00Z",
    "diagnosis": "Khám tổng quát"
  }' | jq .

echo ""
echo "➡️  Lượt khám ENC002 cho PAT002"
curl -s -X POST "http://${SERVER}:8083/api/cis/encounter" \
  -H "Content-Type: application/json" \
  -d '{
    "tenantId": "HOSPITAL_A",
    "encounterId": "ENC002",
    "patientId": "PAT002",
    "encounterType": "outpatient",
    "status": "finished",
    "startTime": "2026-01-31T09:00:00Z",
    "diagnosis": "Viêm họng cấp"
  }' | jq .

sleep 1

# =====================================================
# 3. Test LIS gửi kết quả xét nghiệm
# =====================================================
echo ""
echo "🧪 3. LIS gửi kết quả xét nghiệm (POST :8084/api/lis/lab-result)"
echo "-------------------------------------------"

echo "➡️  Kết quả WBC cho PAT001"
curl -s -X POST "http://${SERVER}:8084/api/lis/lab-result" \
  -H "Content-Type: application/json" \
  -d '{
    "tenantId": "HOSPITAL_A",
    "resultId": "LAB001",
    "patientId": "PAT001",
    "encounterId": "ENC001",
    "testCode": "WBC",
    "testName": "White Blood Cell Count",
    "resultValue": "7.5",
    "unit": "10*3/uL",
    "referenceRange": "4.5-11.0",
    "status": "final"
  }' | jq .

echo ""
echo "➡️  Kết quả HGB cho PAT001"
curl -s -X POST "http://${SERVER}:8084/api/lis/lab-result" \
  -H "Content-Type: application/json" \
  -d '{
    "tenantId": "HOSPITAL_A",
    "resultId": "LAB002",
    "patientId": "PAT001",
    "encounterId": "ENC001",
    "testCode": "HGB",
    "testName": "Hemoglobin",
    "resultValue": "14.2",
    "unit": "g/dL",
    "referenceRange": "12.0-16.0",
    "status": "final"
  }' | jq .

sleep 1

# =====================================================
# 4. App đọc danh sách bệnh nhân (qua Mirth)
# =====================================================
echo ""
echo "📱 4. App đọc danh sách bệnh nhân (GET :8082/api/app/patients)"
echo "-------------------------------------------"
curl -s "http://${SERVER}:8082/api/app/patients" | jq .

# =====================================================
# 5. App đọc trực tiếp từ BE (bypass Mirth)
# =====================================================
echo ""
echo "📱 5. App đọc trực tiếp từ BE (GET :3000/api/v1/patients)"
echo "-------------------------------------------"
curl -s "http://${SERVER}:3000/api/v1/patients" | jq .

# =====================================================
# 6. Lọc theo tenant
# =====================================================
echo ""
echo "🔍 6. Lọc bệnh nhân theo tenant HOSPITAL_A"
echo "-------------------------------------------"
curl -s "http://${SERVER}:3000/api/v1/patients?tenantId=HOSPITAL_A" | jq .

# =====================================================
# 7. Xem lịch sử bệnh nhân (xuyên tenant)
# =====================================================
echo ""
echo "📊 7. Xem lịch sử bệnh nhân PAT001 (xuyên tenant)"
echo "-------------------------------------------"
curl -s "http://${SERVER}:3000/api/v1/patients/PAT001/history" | jq .

# =====================================================
# Done
# =====================================================
echo ""
echo "=========================================="
echo "✅ Test hoàn tất!"
echo "=========================================="
echo ""
echo "📊 Kiểm tra thêm:"
echo "   - Mirth Dashboard: https://${SERVER}:8443"
echo "   - Mirth Messages: Dashboard → Channel → View Messages"
echo "   - Service BE: http://${SERVER}:3000/api/v1/patients"
echo "   - Database: docker exec -it datalake-postgres psql -U datalake_user -d datalake -c 'SELECT * FROM datalake.patients;'"
echo ""
