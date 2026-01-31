#!/bin/bash
# Test script cho luồng CIS -> Mirth -> Datalake -> App

SERVER="207.180.206.229"
# Thay bằng IP server của bạn nếu khác

echo "=========================================="
echo "1. CIS tạo bệnh nhân mới -> Mirth -> Datalake"
echo "=========================================="

# Bệnh nhân 1 - Viện A
curl -X POST "http://${SERVER}:8080/api/cis" \
  -H "Content-Type: application/json" \
  -d '{
    "tenantId": "HOSPITAL_A",
    "patientId": "PAT001",
    "fullName": "Nguyen Van A",
    "birthDate": "1985-03-15",
    "gender": "male",
    "phone": "0901234567",
    "address": "123 Le Loi, Quan 1, TP.HCM"
  }'

echo -e "\n"

# Bệnh nhân 2 - Viện A
curl -X POST "http://${SERVER}:8080/api/cis" \
  -H "Content-Type: application/json" \
  -d '{
    "tenantId": "HOSPITAL_A",
    "patientId": "PAT002",
    "fullName": "Tran Thi B",
    "birthDate": "1990-07-20",
    "gender": "female",
    "phone": "0912345678",
    "address": "456 Nguyen Hue, Quan 1, TP.HCM"
  }'

echo -e "\n"

# Bệnh nhân 3 - Viện B (tenant khác)
curl -X POST "http://${SERVER}:8080/api/cis" \
  -H "Content-Type: application/json" \
  -d '{
    "tenantId": "HOSPITAL_B",
    "patientId": "PAT001",
    "fullName": "Le Van C",
    "birthDate": "1978-12-01",
    "gender": "male",
    "phone": "0923456789",
    "address": "789 Hai Ba Trung, Quan 3, TP.HCM"
  }'

echo -e "\n"
echo "=========================================="
echo "2. App đọc dữ liệu từ Datalake"
echo "=========================================="

sleep 2  # Chờ Mirth xử lý

curl -X GET "http://${SERVER}:8080/api/app/patients" \
  -H "Accept: application/json" | jq .

echo -e "\n"
echo "=========================================="
echo "3. Kiểm tra trực tiếp trong database"
echo "=========================================="
