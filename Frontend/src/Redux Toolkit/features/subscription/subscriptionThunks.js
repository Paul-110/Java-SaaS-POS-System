import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/utils/api';

// Helper function to get JWT token
const getAuthToken = () => {
  const token = localStorage.getItem('jwt');
  if (!token) {
    throw new Error('No JWT token found');
  }
  return token;
};

// Helper function to set auth headers
const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

// 🆕 Store subscribes to a plan (TRIAL or NEW)
export const subscribeToPlan = createAsyncThunk(
  'subscription/subscribe',
  async ({ storeId, planId, gateway = 'RAZORPAY', transactionId }, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      const params = { storeId, planId, gateway };
      if (transactionId) params.transactionId = transactionId;
      const search = new URLSearchParams(params).toString();
      const res = await api.post(`/api/subscriptions/subscribe?${search}`, {}, { headers });
      console.log('✅ Subscribed to plan:', res.data);
      return res.data;
    } catch (err) {
      console.error('❌ Failed to subscribe to plan:', err.response?.data || err.message);
      return rejectWithValue(err.response?.data?.message || 'Failed to subscribe to plan');
    }
  }
);

// 🔁 Store upgrades to a new plan (ACTIVE)
export const upgradeSubscription = createAsyncThunk(
  'subscription/upgrade',
  async ({ storeId, planId, gateway = 'RAZORPAY', transactionId }, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      const params = { storeId, planId, gateway };
      if (transactionId) params.transactionId = transactionId;
      const search = new URLSearchParams(params).toString();
      const res = await api.post(`/api/subscriptions/upgrade?${search}`, {}, { headers });
      console.log('✅ Upgraded subscription:', res.data);
      return res.data;
    } catch (err) {
      console.error('❌ Failed to upgrade subscription:', err.response?.data || err.message);
      return rejectWithValue(err.response?.data?.message || 'Failed to upgrade subscription');
    }
  }
);

// ✅ Admin activates a subscription
export const activateSubscription = createAsyncThunk(
  'subscription/activate',
  async (subscriptionId, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      const res = await api.put(`/api/subscriptions/${subscriptionId}/activate`, {}, { headers });
      console.log('✅ Activated subscription:', res.data);
      return res.data;
    } catch (err) {
      console.error('❌ Failed to activate subscription:', err.response?.data || err.message);
      return rejectWithValue(err.response?.data?.message || 'Failed to activate subscription');
    }
  }
);

// ❌ Admin cancels a subscription
export const cancelSubscription = createAsyncThunk(
  'subscription/cancel',
  async (subscriptionId, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      const res = await api.put(`/api/subscriptions/${subscriptionId}/cancel`, {}, { headers });
      console.log('✅ Cancelled subscription:', res.data);
      return res.data;
    } catch (err) {
      console.error('❌ Failed to cancel subscription:', err.response?.data || err.message);
      return rejectWithValue(err.response?.data?.message || 'Failed to cancel subscription');
    }
  }
);

// 💳 Update payment status manually
export const updatePaymentStatus = createAsyncThunk(
  'subscription/updatePaymentStatus',
  async ({ subscriptionId, status }, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      const res = await api.put(`/api/subscriptions/${subscriptionId}/payment-status?status=${status}`, {}, { headers });
      console.log('✅ Updated payment status:', res.data);
      return res.data;
    } catch (err) {
      console.error('❌ Failed to update payment status:', err.response?.data || err.message);
      return rejectWithValue(err.response?.data?.message || 'Failed to update payment status');
    }
  }
);

// 📦 Store: Get all subscriptions (or by status)
export const getStoreSubscriptions = createAsyncThunk(
  'subscription/getStoreSubscriptions',
  async ({ storeId, status }, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      let url = `/api/subscriptions/store/${storeId}`;
      if (status) url += `?status=${status}`;
      const res = await api.get(url, { headers });
      console.log('✅ fetch  Store subscriptions:', res.data);
      return res.data;
    } catch (err) {
      console.error('❌ Failed to fetch store subscriptions:', err.response?.data || err.message);
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch store subscriptions');
    }
  }
);

// 🗂️ Admin: Get all subscriptions (optionally filter by status)
export const getAllSubscriptions = createAsyncThunk(
  'subscription/getAllSubscriptions',
  async (status, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      let url = '/api/subscriptions/admin';
      if (status) url += `?status=${status}`;
      const res = await api.get(url, { headers });
      console.log('✅ All subscriptions:', res.data);
      return res.data;
    } catch (err) {
      console.error('❌ Failed to fetch all subscriptions:', err.response?.data || err.message);
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch all subscriptions');
    }
  }
);

// ⌛ Admin: Get subscriptions expiring within X days
export const getExpiringSubscriptions = createAsyncThunk(
  'subscription/getExpiringSubscriptions',
  async (days = 7, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      const res = await api.get(`/api/subscriptions/admin/expiring?days=${days}`, { headers });
      console.log('✅ Expiring subscriptions:', res.data);
      return res.data;
    } catch (err) {
      console.error('❌ Failed to fetch expiring subscriptions:', err.response?.data || err.message);
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch expiring subscriptions');
    }
  }
);

// 📊 Count total subscriptions by status
export const countSubscriptionsByStatus = createAsyncThunk(
  'subscription/countByStatus',
  async (status, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      const res = await api.get(`/api/subscriptions/admin/count?status=${status}`, { headers });
      console.log('✅ Count by status:', res.data);
      return res.data;
    } catch (err) {
      console.error('❌ Failed to count subscriptions:', err.response?.data || err.message);
      return rejectWithValue(err.response?.data?.message || 'Failed to count subscriptions');
    }
  }
); 