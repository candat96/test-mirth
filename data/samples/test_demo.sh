#!/bin/bash
# =====================================================
# Test Script: CIS -> Mirth ESB -> Datalake -> App
# =====================================================

# Cấu hình - THAY ĐỔI IP NẾU CẦN
SERVER="207.180.206.229"
PORT="8080"

echo "=========================================="
echo "  DEMO: CIS -> Mirth -> Datalake -> App"
echo "=========================================="
echo ""

# =====================================================
# STEP 1: CIS tạo bệnh nhân mới
# =====================================================
echo "📝 STEP 1: CIS tạo bệnh nhân -> Mirth -> Datalake"
echo "------------------------------------------"

echo "➡️  Tạo bệnh nhân PAT001 (Viện A)..."
curl -s -X POST "http://${SERVER}:${PORT}/api/cis/patient" \
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
echo "➡️  Tạo bệnh nhân PAT002 (Viện A)..."
curl -s -X POST "http://${SERVER}:${PORT}/api/cis/patient" \
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
echo "➡️  Tạo bệnh nhân PAT003 (Viện B - tenant khác)..."
curl -s -X POST "http://${SERVER}:${PORT}/api/cis/patient" \
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
echo "➡️  Tạo bệnh nhân PAT004 (HIS External)..."
curl -s -X POST "http://${SERVER}:${PORT}/api/cis/patient" \
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

echo ""
echo "⏳ Chờ 2 giây để Mirth xử lý..."
sleep 2

# =====================================================
# STEP 2: App đọc dữ liệu từ Datalake
# =====================================================
echo ""
echo "📱 STEP 2: App đọc danh sách bệnh nhân từ Datalake"
echo "------------------------------------------"

curl -s -X GET "http://${SERVER}:${PORT}/api/app/patients" \
  -H "Accept: application/json" | jq .

echo ""
echo "=========================================="
echo "✅ Demo hoàn tất!"
echo "=========================================="
echo ""
echo "📊 Kiểm tra thêm trong Mirth Administrator:"
echo "   - Dashboard: xem message đã xử lý"
echo "   - Channel Messages: xem chi tiết từng message"
echo ""
