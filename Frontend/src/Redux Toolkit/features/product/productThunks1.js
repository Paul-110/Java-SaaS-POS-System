import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/utils/api";

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
    'Authorization': `Bearer ${token}`
  };
};

// 🔹 Create product
export const createProduct = createAsyncThunk(
  "product/create",
  async (dto, { rejectWithValue }) => {
    try {
      console.log('🔄 Creating product...', { dto });

      const formData = new FormData();
      Object.keys(dto).forEach(key => {
        if (key === 'image' && dto[key] instanceof File) {
          formData.append('imageFile', dto[key]);
        } else if (dto[key] != null) {
          formData.append(key, dto[key]);
        }
      });

      const headers = getAuthHeaders();
      const res = await api.post("/api/products", formData, { headers });
      console.log('✅ Product created successfully:', res.data);
      
      return res.data;
    } catch (err) {
      console.error('❌ Failed to create product:', {
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText,
        requestData: dto
      });
      
      return rejectWithValue({
        message: err.response?.data?.message || "Failed to create product",
        status: err.response?.status,
      });
    }
  }
);

// 🔹 Get product by ID
export const getProductById = createAsyncThunk(
  "product/getById",
  async (id, { rejectWithValue }) => {
    try {
      console.log('🔄 Fetching product by ID...', { productId: id });
      
      const headers = getAuthHeaders();
      const res = await api.get(`/api/products/${id}`, { headers });
      
      console.log('✅ Product fetched successfully:', {
        productId: res.data.id,
        name: res.data.name,
        price: res.data.price,
        response: res.data
      });
      
      return res.data;
    } catch (err) {
      console.error('❌ Failed to fetch product by ID:', {
        productId: id,
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue({
        message: err.response?.data?.message || "Product not found",
        status: err.response?.status,
      });
    }
  }
);

// 🔹 Update product
export const updateProduct = createAsyncThunk(
  "product/update",
  async ({ id, dto }, { rejectWithValue }) => {
    try {
      console.log('🔄 Updating product...', { productId: id, dto });

      const formData = new FormData();
      Object.keys(dto).forEach(key => {
        if (key === 'image' && dto[key] instanceof File) {
          formData.append('imageFile', dto[key]);
        } else if (dto[key] != null) {
          formData.append(key, dto[key]);
        }
      });

      const headers = getAuthHeaders();
      const res = await api.patch(`/api/products/${id}`, formData, { headers });
      console.log('✅ Product updated successfully:', {
        productId: res.data.id,
        name: res.data.name,
        price: res.data.price,
        response: res.data
      });
      
      return res.data;
    } catch (err) {
      console.error('❌ Failed to update product:', {
        productId: id,
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText,
        requestData: dto
      });
      
      return rejectWithValue({
        message: err.response?.data?.message || "Failed to update product",
        status: err.response?.status,
      });
    }
  }
);

// 🔹 Delete product
export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (id, { rejectWithValue }) => {
    try {
      console.log('🔄 Deleting product...', { productId: id });
      
      const headers = getAuthHeaders();
      await api.delete(`/api/products/${id}`, { headers });
      
      console.log('✅ Product deleted successfully:', { productId: id });
      
      return id;
    } catch (err) {
      console.error('❌ Failed to delete product:', {
        productId: id,
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue({
        message: err.response?.data?.message || "Failed to delete product",
        status: err.response?.status,
      });
    }
  }
);

// 🔹 Get products by store
export const getProductsByStore = createAsyncThunk(
  "product/getByStore",
  async (storeId, { rejectWithValue }) => {
    try {
      console.log('🔄 Fetching products by store...', { storeId });
      
      const headers = getAuthHeaders();
      const res = await api.get(`/api/products/store/${storeId}`, { headers });
      
      console.log('✅ Products fetched successfully:', {
        storeId,
        productCount: res.data.length,
        products: res.data.map(product => ({
          id: product.id,
          name: product.name,
          price: product.price,
          category: product.category
        }))
      });
      
      return res.data;
    } catch (err) {
      console.error('❌ Failed to fetch products by store:', {
        storeId,
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue({
        message: err.response?.data?.message || "Failed to fetch products",
        status: err.response?.status,
      });
    }
  }
);

// 🔹 Search products by keyword
export const searchProducts = createAsyncThunk(
  "product/search",
  async ({ query, storeId }, { rejectWithValue }) => {
    try {
      console.log('🔄 Searching products...', { query, storeId });
      
      const headers = getAuthHeaders();
      const res = await api.get(`/api/products/store/${storeId}/search?q=${query}`, { headers });
      
      console.log('✅ Product search completed:', {
        query,
        storeId,
        resultCount: res.data.length,
        results: res.data.map(product => ({
          id: product.id,
          name: product.name,
          price: product.price
        }))
      });
      
      return res.data;
    } catch (err) {
      console.error('❌ Product search failed:', {
        query,
        storeId,
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue({
        message: err.response?.data?.message || "Search failed",
        status: err.response?.status,
      });
    }
  }
);
