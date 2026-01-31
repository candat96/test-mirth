-- Init script for Datalake database
-- This runs when the datalake-postgres container starts

-- Create schema
CREATE SCHEMA IF NOT EXISTS datalake;

-- Patients table
CREATE TABLE IF NOT EXISTS datalake.patients (
    id SERIAL PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL,
    patient_id VARCHAR(100) NOT NULL,
    full_name VARCHAR(255),
    birth_date DATE,
    gender VARCHAR(10),
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    raw_data JSONB,
    UNIQUE(tenant_id, patient_id)
);

-- Encounters table
CREATE TABLE IF NOT EXISTS datalake.encounters (
    id SERIAL PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL,
    encounter_id VARCHAR(100) NOT NULL,
    patient_id VARCHAR(100) NOT NULL,
    encounter_type VARCHAR(50),
    status VARCHAR(50),
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    diagnosis TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    raw_data JSONB,
    UNIQUE(tenant_id, encounter_id)
);

-- Lab Results table
CREATE TABLE IF NOT EXISTS datalake.lab_results (
    id SERIAL PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL,
    result_id VARCHAR(100) NOT NULL,
    patient_id VARCHAR(100) NOT NULL,
    encounter_id VARCHAR(100),
    test_code VARCHAR(50),
    test_name VARCHAR(255),
    result_value VARCHAR(100),
    unit VARCHAR(50),
    reference_range VARCHAR(100),
    status VARCHAR(20),
    result_time TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    raw_data JSONB,
    UNIQUE(tenant_id, result_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_patients_tenant ON datalake.patients(tenant_id);
CREATE INDEX IF NOT EXISTS idx_patients_patient_id ON datalake.patients(patient_id);
CREATE INDEX IF NOT EXISTS idx_encounters_patient ON datalake.encounters(patient_id);
CREATE INDEX IF NOT EXISTS idx_encounters_tenant ON datalake.encounters(tenant_id);
CREATE INDEX IF NOT EXISTS idx_lab_results_patient ON datalake.lab_results(patient_id);
CREATE INDEX IF NOT EXISTS idx_lab_results_tenant ON datalake.lab_results(tenant_id);

-- Grant permissions
GRANT ALL PRIVILEGES ON SCHEMA datalake TO datalake_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA datalake TO datalake_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA datalake TO datalake_user;
