import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/utils/api';

/**
 * Auth helpers
 * - getAuthToken: returns token or null (doesn't throw)
 * - getAuthHeaders: returns headers object or null when token missing
 */
const getAuthToken = () => {
  try {
    const token = localStorage.getItem('jwt');
    return token || null;
  } catch (e) {
    // localStorage may throw on some environments (SSR / strict privacy modes)
    console.error('Unable to read localStorage for jwt token', e);
    return null;
  }
};

const getAuthHeaders = () => {
  const token = getAuthToken();
  if (!token) return null;
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

/**
 * Utility to extract a friendly error message from axios/error objects
 */
const extractError = (err) => {
  if (!err) return 'Unknown error';
  if (err.response?.data?.message) return err.response.data.message;
  if (err.response?.data) return JSON.stringify(err.response.data);
  if (err.message) return err.message;
  return String(err);
};

/* -------------------------
   Start Shift
   ------------------------- */
export const startShift = createAsyncThunk(
  'shiftReport/start',
  async (payload, { rejectWithValue }) => {
    const { branchId, cashierId } = payload;

    try {
      if (!branchId) {
        return rejectWithValue('branchId is required to start a shift');
      }

      console.log('🔄 Starting shift...', { branchId, cashierId });

      const headers = getAuthHeaders();
      if (!headers) return rejectWithValue('No JWT token found');

      const res = await api.post(
        `/api/shift-reports/start?branchId=${encodeURIComponent(branchId)}`,
        { cashierId }, // Send cashierId in the request body
        { headers }
      );

      const data = res?.data ?? null;
      console.log('✅ Shift started successfully:', {
        shiftId: data?.id,
        cashierId: data?.cashierId,
        branchId: data?.branchId,
        startTime: data?.startTime,
        response: data,
      });

      return data;
    } catch (err) {
      const message = extractError(err);
      console.error('❌ Failed to start shift:', {
        branchId: branchId,
        cashierId: cashierId,
        error: err?.response?.data ?? err?.message ?? err,
        message,
        status: err?.response?.status,
        statusText: err?.response?.statusText,
      });
      return rejectWithValue(message || 'Failed to start shift');
    }
  }
);

/* -------------------------
   End Shift
   ------------------------- */
export const endShift = createAsyncThunk(
  'shiftReport/end',
  async (_, { rejectWithValue }) => {
    try {
      console.log('🔄 Ending shift...');

      const headers = getAuthHeaders();
      if (!headers) return rejectWithValue('No JWT token found');

      const res = await api.patch('/api/shift-reports/end', {}, { headers });
      const data = res?.data ?? null;

      console.log('✅ Shift ended successfully:', {
        shiftId: data?.id,
        endTime: data?.endTime,
        totalSales: data?.totalSales,
        totalOrders: data?.totalOrders,
        response: data,
      });

      return data;
    } catch (err) {
      const message = extractError(err);
      console.error('❌ Failed to end shift:', {
        error: err?.response?.data ?? err?.message ?? err,
        message,
        status: err?.response?.status,
        statusText: err?.response?.statusText,
      });
      return rejectWithValue(message || 'Failed to end shift');
    }
  }
);

/* -------------------------
   Get Current Shift Progress
   ------------------------- */
export const getCurrentShiftProgress = createAsyncThunk(
  'shiftReport/getCurrentProgress',
  async (_, { rejectWithValue }) => {
    try {
      console.log('🔄 Fetching current shift progress...');
      const headers = getAuthHeaders();
      if (!headers) return rejectWithValue('No JWT token found');

      const res = await api.get('/api/shift-reports/current', { headers });
      console.log('✅ Current shift progress fetched:', res.data);
      return res.data;
    } catch (err) {
      const message = extractError(err);
      console.error('❌ Failed to fetch current shift progress:', { message });
      return rejectWithValue(message);
    }
  }
);

/* -------------------------
   Get Shift Report by Date
   ------------------------- */
export const getShiftReportByDate = createAsyncThunk(
  'shiftReport/getByDate',
  async ({ branchId, date }, { rejectWithValue }) => {
    try {
      console.log('🔄 Fetching shift report by date...', { branchId, date });
      const headers = getAuthHeaders();
      if (!headers) return rejectWithValue('No JWT token found');

      const res = await api.get(`/api/shift-reports/branch/${branchId}/date/${date}`, { headers });
      console.log('✅ Shift report fetched by date:', res.data);
      return res.data;
    } catch (err) {
      const message = extractError(err);
      console.error('❌ Failed to fetch shift report by date:', { message });
      return rejectWithValue(message);
    }
  }
);

/* -------------------------
   Get Shifts by Cashier
   ------------------------- */
export const getShiftsByCashier = createAsyncThunk(
  'shiftReport/getByCashier',
  async (cashierId, { rejectWithValue }) => {
    try {
      console.log('🔄 Fetching shifts by cashier...', { cashierId });
      const headers = getAuthHeaders();
      if (!headers) return rejectWithValue('No JWT token found');

      const res = await api.get(`/api/shift-reports/cashier/${cashierId}`, { headers });
      console.log('✅ Shifts fetched by cashier:', res.data);
      return res.data;
    } catch (err) {
      const message = extractError(err);
      console.error('❌ Failed to fetch shifts by cashier:', { message });
      return rejectWithValue(message);
    }
  }
);

/* -------------------------
   Get Shifts by Branch
   ------------------------- */
export const getShiftsByBranch = createAsyncThunk(
  'shiftReport/getByBranch',
  async (branchId, { rejectWithValue }) => {
    try {
      console.log('🔄 Fetching shifts by branch...', { branchId });
      const headers = getAuthHeaders();
      if (!headers) return rejectWithValue('No JWT token found');

      const res = await api.get(`/api/shift-reports/branch/${branchId}`, { headers });
      console.log('✅ Shifts fetched by branch:', res.data);
      return res.data;
    } catch (err) {
      const message = extractError(err);
      console.error('❌ Failed to fetch shifts by branch:', { message });
      return rejectWithValue(message);
    }
  }
);

/* -------------------------
   Get All Shifts (for Super Admin)
   ------------------------- */
export const getAllShifts = createAsyncThunk(
  'shiftReport/getAll',
  async (_, { rejectWithValue }) => {
    try {
      console.log('🔄 Fetching all shifts...');
      const headers = getAuthHeaders();
      if (!headers) return rejectWithValue('No JWT token found');

      const res = await api.get('/api/shift-reports', { headers });
      console.log('✅ All shifts fetched:', res.data);
      return res.data;
    } catch (err) {
      const message = extractError(err);
      console.error('❌ Failed to fetch all shifts:', { message });
      return rejectWithValue(message);
    }
  }
);

/* -------------------------
   Get Shift by ID
   ------------------------- */
export const getShiftById = createAsyncThunk(
  'shiftReport/getById',
  async (shiftId, { rejectWithValue }) => {
    try {
      console.log('🔄 Fetching shift by ID...', { shiftId });
      const headers = getAuthHeaders();
      if (!headers) return rejectWithValue('No JWT token found');

      const res = await api.get(`/api/shift-reports/${shiftId}`, { headers });
      console.log('✅ Shift fetched by ID:', res.data);
      return res.data;
    } catch (err) {
      const message = extractError(err);
      console.error('❌ Failed to fetch shift by ID:', { message });
      return rejectWithValue(message);
    }
  }
);

/* -------------------------
   Delete Shift
   ------------------------- */
export const deleteShift = createAsyncThunk(
  'shiftReport/delete',
  async (shiftId, { rejectWithValue }) => {
    try {
      console.log('🔄 Deleting shift...', { shiftId });
      const headers = getAuthHeaders();
      if (!headers) return rejectWithValue('No JWT token found');

      await api.delete(`/api/shift-reports/${shiftId}`, { headers });
      console.log('✅ Shift deleted successfully:', { shiftId });
      return shiftId; // Return the ID to identify which shift was deleted
    } catch (err) {
      const message = extractError(err);
      console.error('❌ Failed to delete shift:', { message });
      return rejectWithValue(message);
    }
  }
);
