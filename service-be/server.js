const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL connection to Datalake
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'datalake',
  user: process.env.DB_USER || 'datalake_user',
  password: process.env.DB_PASSWORD || 'datalake_pass',
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ============================================
// API: Receive Patient from Mirth ESB
// ============================================
app.post('/api/v1/patients', async (req, res) => {
  console.log(`[BE] Received patient: ${JSON.stringify(req.body)}`);
  const { tenantId, patientId, fullName, birthDate, gender, phone, address } = req.body;

  console.log(`[BE] Received patient: ${patientId} from tenant: ${tenantId}`);

  // Validation
  if (!tenantId || !patientId || !fullName) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: tenantId, patientId, fullName'
    });
  }

  try {
    const query = `
      INSERT INTO datalake.patients (tenant_id, patient_id, full_name, birth_date, gender, phone, address, raw_data)
      VALUES ($1, $2, $3, $4::date, $5, $6, $7, $8::jsonb)
      ON CONFLICT (tenant_id, patient_id) 
      DO UPDATE SET 
        full_name = EXCLUDED.full_name,
        birth_date = EXCLUDED.birth_date,
        gender = EXCLUDED.gender,
        phone = EXCLUDED.phone,
        address = EXCLUDED.address,
        raw_data = EXCLUDED.raw_data,
        updated_at = CURRENT_TIMESTAMP
      RETURNING id, tenant_id, patient_id, created_at, updated_at;
    `;

    const values = [
      tenantId,
      patientId,
      fullName,
      birthDate || null,
      gender || null,
      phone || null,
      address || null,
      JSON.stringify(req.body)
    ];

    const result = await pool.query(query, values);

    console.log(`[BE] Patient saved: ${patientId}`);

    res.status(201).json({
      success: true,
      message: 'Patient saved to Datalake',
      data: result.rows[0]
    });

  } catch (error) {
    console.error('[BE] Error saving patient:', error.message);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ============================================
// API: Get Patients for App
// ============================================
app.get('/api/v1/patients', async (req, res) => {
  console.log(`[BE] Query patients - ${JSON.stringify(req.query)}`);
  const { tenantId, patientId, limit = 100 } = req.query;

  console.log(`[BE] Query patients - tenantId: ${tenantId || 'all'}, patientId: ${patientId || 'all'}`);

  try {
    let query = `
      SELECT patient_id, tenant_id, full_name, birth_date, gender, phone, address, created_at, updated_at
      FROM datalake.patients
      WHERE 1=1
    `;
    const values = [];
    let paramCount = 0;

    if (tenantId) {
      paramCount++;
      query += ` AND tenant_id = $${paramCount}`;
      values.push(tenantId);
    }

    if (patientId) {
      paramCount++;
      query += ` AND patient_id = $${paramCount}`;
      values.push(patientId);
    }

    query += ` ORDER BY updated_at DESC LIMIT $${paramCount + 1}`;
    values.push(parseInt(limit));

    const result = await pool.query(query, values);

    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });

  } catch (error) {
    console.error('[BE] Error querying patients:', error.message);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ============================================
// API: Receive Encounter from Mirth ESB
// ============================================
app.post('/api/v1/encounters', async (req, res) => {
  const { tenantId, encounterId, patientId, encounterType, status, startTime, diagnosis } = req.body;

  console.log(`[BE] Received encounter: ${encounterId} for patient: ${patientId}`);

  if (!tenantId || !encounterId || !patientId) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: tenantId, encounterId, patientId'
    });
  }

  try {
    const query = `
      INSERT INTO datalake.encounters (tenant_id, encounter_id, patient_id, encounter_type, status, start_time, diagnosis, raw_data)
      VALUES ($1, $2, $3, $4, $5, $6::timestamp, $7, $8::jsonb)
      ON CONFLICT (tenant_id, encounter_id) 
      DO UPDATE SET 
        status = EXCLUDED.status,
        diagnosis = EXCLUDED.diagnosis,
        raw_data = EXCLUDED.raw_data
      RETURNING id, encounter_id, patient_id;
    `;

    const values = [
      tenantId,
      encounterId,
      patientId,
      encounterType || null,
      status || 'active',
      startTime || new Date().toISOString(),
      diagnosis || null,
      JSON.stringify(req.body)
    ];

    const result = await pool.query(query, values);

    res.status(201).json({
      success: true,
      message: 'Encounter saved to Datalake',
      data: result.rows[0]
    });

  } catch (error) {
    console.error('[BE] Error saving encounter:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================
// API: Receive Lab Result from Mirth ESB
// ============================================
app.post('/api/v1/lab-results', async (req, res) => {
  const { tenantId, resultId, patientId, encounterId, testCode, testName, resultValue, unit, referenceRange, status } = req.body;

  console.log(`[BE] Received lab result: ${JSON.stringify(req.body)}`);

  if (!tenantId || !resultId || !patientId) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: tenantId, resultId, patientId'
    });
  }

  try {
    const query = `
      INSERT INTO datalake.lab_results (tenant_id, result_id, patient_id, encounter_id, test_code, test_name, result_value, unit, reference_range, status, result_time, raw_data)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, CURRENT_TIMESTAMP, $11::jsonb)
      ON CONFLICT (tenant_id, result_id) 
      DO UPDATE SET 
        result_value = EXCLUDED.result_value,
        status = EXCLUDED.status,
        raw_data = EXCLUDED.raw_data
      RETURNING id, result_id, patient_id;
    `;

    const values = [
      tenantId,
      resultId,
      patientId,
      encounterId || null,
      testCode || null,
      testName || null,
      resultValue || null,
      unit || null,
      referenceRange || null,
      status || 'final',
      JSON.stringify(req.body)
    ];

    const result = await pool.query(query, values);

    res.status(201).json({
      success: true,
      message: 'Lab result saved to Datalake',
      data: result.rows[0]
    });

  } catch (error) {
    console.error('[BE] Error saving lab result:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================
// API: Get Patient History (xuyên tenant cho App)
// ============================================
app.get('/api/v1/patients/:patientId/history', async (req, res) => {
  const { patientId } = req.params;

  console.log(`[BE] Query patient history: ${patientId}`);

  try {
    // Get patient info from all tenants
    const patientQuery = `
      SELECT * FROM datalake.patients WHERE patient_id = $1 ORDER BY updated_at DESC;
    `;
    const patients = await pool.query(patientQuery, [patientId]);

    // Get encounters
    const encounterQuery = `
      SELECT * FROM datalake.encounters WHERE patient_id = $1 ORDER BY start_time DESC LIMIT 50;
    `;
    const encounters = await pool.query(encounterQuery, [patientId]);

    // Get lab results
    const labQuery = `
      SELECT * FROM datalake.lab_results WHERE patient_id = $1 ORDER BY result_time DESC LIMIT 100;
    `;
    const labResults = await pool.query(labQuery, [patientId]);

    res.json({
      success: true,
      data: {
        patient: patients.rows,
        encounters: encounters.rows,
        labResults: labResults.rows
      }
    });

  } catch (error) {
    console.error('[BE] Error querying patient history:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`[BE] Datalake Service running on port ${PORT}`);
  console.log(`[BE] Endpoints:`);
  console.log(`     POST /api/v1/patients     - Receive patient from Mirth`);
  console.log(`     GET  /api/v1/patients     - Query patients for App`);
  console.log(`     POST /api/v1/encounters   - Receive encounter from Mirth`);
  console.log(`     POST /api/v1/lab-results  - Receive lab result from Mirth`);
  console.log(`     GET  /api/v1/patients/:id/history - Get patient history`);
});
