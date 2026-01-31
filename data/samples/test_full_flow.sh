#!/bin/bash
# =====================================================
# Test Script: CIS -> Mirth ESB -> Service BE -> Datalake
# =====================================================

# Cấu hình
MIRTH_HOST="${MIRTH_HOST:-207.180.206.229}"
MIRTH_PORT="8080"
BE_HOST="${BE_HOST:-207.180.206.229}"
BE_PORT="3000"

echo "=========================================="
echo "  DEMO: CIS -> Mirth -> BE -> Datalake"
echo "=========================================="
echo "  Mirth: http://${MIRTH_HOST}:${MIRTH_PORT}"
echo "  BE:    http://${BE_HOST}:${BE_PORT}"
echo "=========================================="
echo ""

# =====================================================
# Test 1: Health Check
# =====================================================
echo "🔍 Health Check..."
echo "-------------------------------------------"
echo "Service BE:"
curl -s "http://${BE_HOST}:${BE_PORT}/health" | jq .
echo ""

# =====================================================
# Test 2: CIS gửi bệnh nhân qua Mirth -> BE -> Datalake
# =====================================================
echo ""
echo "📝 STEP 1: CIS tạo bệnh nhân -> Mirth -> BE -> Datalake"
echo "-------------------------------------------"

echo "➡️  Bệnh nhân PAT001 (Viện A)..."
curl -s -X POST "http://${MIRTH_HOST}:${MIRTH_PORT}/api/cis/patient" \
  -H "Content-Type: application/json" \
  -d '{
    "tenantId": "HOSPITAL_A",
    "patientId": "PAT001",
    "fullName": "Nguyen Van A",
    "birthDate": "1985-03-15",
    "gender": "male",
    "phone": "0901234567",
    "address": "123 Le Loi, Quan 1, TP.HCM"
  }' | jq .

echo ""
echo "➡️  Bệnh nhân PAT002 (Viện A)..."
curl -s -X POST "http://${MIRTH_HOST}:${MIRTH_PORT}/api/cis/patient" \
  -H "Content-Type: application/json" \
  -d '{
    "tenantId": "HOSPITAL_A",
    "patientId": "PAT002",
    "fullName": "Tran Thi B",
    "birthDate": "1990-07-20",
    "gender": "female",
    "phone": "0912345678",
    "address": "456 Nguyen Hue, Quan 1, TP.HCM"
  }' | jq .

echo ""
echo "➡️  Bệnh nhân PAT003 (Viện B - tenant khác)..."
curl -s -X POST "http://${MIRTH_HOST}:${MIRTH_PORT}/api/cis/patient" \
  -H "Content-Type: application/json" \
  -d '{
    "tenantId": "HOSPITAL_B",
    "patientId": "PAT003",
    "fullName": "Le Van C",
    "birthDate": "1978-12-01",
    "gender": "male",
    "phone": "0923456789",
    "address": "789 Hai Ba Trung, Quan 3, TP.HCM"
  }' | jq .

echo ""
echo "➡️  Bệnh nhân PAT004 (HIS External)..."
curl -s -X POST "http://${MIRTH_HOST}:${MIRTH_PORT}/api/cis/patient" \
  -H "Content-Type: application/json" \
  -d '{
    "tenantId": "HIS_EXTERNAL",
    "patientId": "PAT004",
    "fullName": "Pham Thi D",
    "birthDate": "1995-05-10",
    "gender": "female",
    "phone": "0934567890",
    "address": "321 CMT8, Quan 10, TP.HCM"
  }' | jq .

sleep 2

# =====================================================
# Test 3: App đọc dữ liệu qua Mirth -> BE -> Datalake
# =====================================================
echo ""
echo "📱 STEP 2: App đọc danh sách bệnh nhân (qua Mirth)"
echo "-------------------------------------------"
curl -s "http://${MIRTH_HOST}:${MIRTH_PORT}/api/app/patients" | jq .

# =====================================================
# Test 4: App đọc trực tiếp từ BE (bypass Mirth)
# =====================================================
echo ""
echo "📱 STEP 3: App đọc trực tiếp từ BE API"
echo "-------------------------------------------"
curl -s "http://${BE_HOST}:${BE_PORT}/api/v1/patients" | jq .

# =====================================================
# Test 5: Lọc theo tenant
# =====================================================
echo ""
echo "🔍 STEP 4: Lọc bệnh nhân theo tenant (HOSPITAL_A)"
echo "-------------------------------------------"
curl -s "http://${BE_HOST}:${BE_PORT}/api/v1/patients?tenantId=HOSPITAL_A" | jq .

# =====================================================
# Test 6: Xem lịch sử bệnh nhân xuyên tenant
# =====================================================
echo ""
echo "📊 STEP 5: Xem lịch sử bệnh nhân PAT001 (xuyên tenant)"
echo "-------------------------------------------"
curl -s "http://${BE_HOST}:${BE_PORT}/api/v1/patients/PAT001/history" | jq .

echo ""
echo "=========================================="
echo "✅ Demo hoàn tất!"
echo "=========================================="
echo ""
echo "📊 Kiểm tra thêm:"
echo "   - Mirth Dashboard: https://${MIRTH_HOST}:8443"
echo "   - Service BE API: http://${BE_HOST}:3000/api/v1/patients"
echo "   - Database: docker exec -it datalake-postgres psql -U datalake_user -d datalake"
echo ""
