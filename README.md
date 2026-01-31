# Mirth Connect Docker Setup

## Cấu trúc thư mục

```
mirth-connect/
├── docker-compose.yml          # Docker Compose chính
├── .env.example                 # Template biến môi trường
├── .env                         # Biến môi trường (tạo từ .env.example)
├── secrets/
│   ├── mirth.properties         # Cấu hình bảo mật Mirth
│   ├── postgres_user.txt        # Username PostgreSQL
│   └── postgres_password.txt    # Password PostgreSQL
└── data/
    ├── appdata/                 # Dữ liệu Mirth (keystore, etc.)
    ├── custom-extensions/       # Extensions tùy chỉnh (FHIR, SSL, etc.)
    ├── custom-lib/              # Thư viện JAR tùy chỉnh
    └── postgres/                # Dữ liệu PostgreSQL
```

## Hướng dẫn cài đặt

### 1. Chuẩn bị môi trường

```bash
# Clone hoặc tải về thư mục dự án
cd mirth-connect

# Tạo file .env từ template
cp .env.example .env

# Chỉnh sửa file .env theo nhu cầu
nano .env
```

### 2. Cấu hình bảo mật (BẮT BUỘC thay đổi trong production)

Chỉnh sửa các file trong thư mục `secrets/`:

**secrets/mirth.properties:**
```properties
database.username=your_db_user
database.password=your_strong_password
keystore.storepass=your_keystore_password
keystore.keypass=your_key_password
```

**secrets/postgres_user.txt:**
```
your_db_user
```

**secrets/postgres_password.txt:**
```
your_strong_password
```

> ⚠️ **QUAN TRỌNG**: Đảm bảo `database.username` và `postgres_user.txt` giống nhau, `database.password` và `postgres_password.txt` giống nhau.

### 3. Khởi động hệ thống

```bash
# Khởi động tất cả services
docker-compose up -d

# Xem logs
docker-compose logs -f

# Xem logs của Mirth Connect
docker-compose logs -f mirth-connect
```

### 4. Truy cập Mirth Connect

- **Web Dashboard**: https://localhost:8443
- **Đăng nhập mặc định**: 
  - Username: `admin`
  - Password: `admin`

> ⚠️ **Thay đổi mật khẩu admin ngay sau khi đăng nhập lần đầu!**

### 5. Cài đặt Mirth Connect Administrator Client

Tải Mirth Connect Administrator từ:
- Truy cập https://localhost:8443
- Nhấn "Download Administrator Launcher"
- Cài đặt và kết nối đến: `https://localhost:8443`

## Quản lý hệ thống

### Các lệnh thường dùng

```bash
# Khởi động
docker-compose up -d

# Dừng
docker-compose down

# Dừng và xóa volumes (MẤT DỮ LIỆU!)
docker-compose down -v

# Khởi động lại
docker-compose restart

# Xem trạng thái
docker-compose ps

# Xem logs realtime
docker-compose logs -f

# Vào shell của Mirth Connect container
docker exec -it mirth-connect bash

# Xem cấu hình mirth.properties
docker exec -it mirth-connect cat conf/mirth.properties
```

### Cập nhật Mirth Connect

```bash
# Pull image mới nhất
docker-compose pull

# Khởi động lại với image mới
docker-compose up -d
```

## Cấu hình nâng cao

### Thêm ports cho channels

Chỉnh sửa `docker-compose.yml`, thêm ports trong phần `mirth-connect`:

```yaml
ports:
  - "8443:8443"   # Web Dashboard
  - "8080:8080"   # HTTP Listener
  - "6661:6661"   # HL7 Channel 1
  - "6662:6662"   # HL7 Channel 2
  - "2575:2575"   # MLLP
  # Thêm ports khác theo nhu cầu
```

### Cài đặt Extensions

1. Tải extension (ví dụ: FHIR, SSL Manager)
2. Đặt file `.zip` vào thư mục `data/custom-extensions/`
3. Khởi động lại:
   ```bash
   docker-compose restart mirth-connect
   ```

### Cấu hình VM Options

Chỉnh sửa biến `VMOPTIONS` trong `docker-compose.yml`:

```yaml
environment:
  - VMOPTIONS=-Xmx2048m,-Xms512m
```

### Kết nối với database khác

**MySQL:**
```yaml
environment:
  - DATABASE=mysql
  - DATABASE_URL=jdbc:mysql://mysql-host:3306/mirthdb
```

**Oracle:**
```yaml
environment:
  - DATABASE=oracle
  - DATABASE_URL=jdbc:oracle:thin:@oracle-host:1521:mirthdb
```

**SQL Server:**
```yaml
environment:
  - DATABASE=sqlserver
  - DATABASE_URL=jdbc:sqlserver://sqlserver-host:1433;databaseName=mirthdb
```

### Cấu hình cho Production

1. **Sử dụng external database** thay vì container PostgreSQL
2. **Cấu hình reverse proxy** (Nginx/Traefik) với SSL certificate
3. **Backup thường xuyên** thư mục `data/`
4. **Giới hạn resources:**

```yaml
services:
  mirth-connect:
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 2G
        reservations:
          cpus: '1'
          memory: 1G
```

## Tích hợp vào hệ thống hiện có

### Kết nối với external PostgreSQL

1. Xóa service `postgres` trong `docker-compose.yml`
2. Cập nhật cấu hình:

```yaml
services:
  mirth-connect:
    environment:
      - DATABASE=postgres
      - DATABASE_URL=jdbc:postgresql://your-postgres-host:5432/mirthdb
    # Xóa depends_on: postgres
```

3. Cập nhật `secrets/mirth.properties` với credentials database

### Sử dụng với Docker Swarm

```bash
# Deploy stack
docker stack deploy -c docker-compose.yml mirth

# Xem services
docker service ls

# Scale Mirth Connect (chỉ khi dùng external database)
docker service scale mirth_mirth-connect=2
```

### Sử dụng với Kubernetes

Xem thêm: https://github.com/nextgenhealthcare/connect-docker

## Troubleshooting

### Mirth không khởi động được

```bash
# Kiểm tra logs
docker-compose logs mirth-connect

# Kiểm tra database connection
docker exec -it mirth-connect cat conf/mirth.properties
```

### Database connection failed

1. Đảm bảo PostgreSQL đã khởi động trước Mirth
2. Kiểm tra credentials trong `secrets/` khớp nhau
3. Kiểm tra network connectivity

### Port đã được sử dụng

```bash
# Kiểm tra port
lsof -i :8443

# Đổi port trong docker-compose.yml
ports:
  - "9443:8443"  # Sử dụng port 9443 thay vì 8443
```

## Tham khảo

- [NextGen Connect Docker Hub](https://hub.docker.com/r/nextgenhealthcare/connect)
- [Connect Docker GitHub](https://github.com/nextgenhealthcare/connect-docker)
- [NextGen Connect User Guide](https://www.nextgen.com/-/media/Files/nextgen-connect/nextgen-connect-39-user-guide.pdf)
- [Mirth Community Forums](https://forums.mirthproject.io/)
