import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProducts, fetchProductsByFilter, fetchBrands,fetchCategories,fetchProductById, createProduct, updateProduct} from './productAPI';

const initialState = {
  products: [],
  brands:[],
  categories:[],
  status: 'idle',
  totalItems: 0,
  selectedProduct: null
};

export const fetchAllProductsAsync = createAsyncThunk(
  'product/fetchAllProducts',
  async () => {
    const response = await fetchAllProducts();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchProductsByFilterAsync = createAsyncThunk(
  'product/fetchProductsByFilter',
async ({filter,sort,pagination}) =>{
  const response = await fetchProductsByFilter({filter,sort,pagination});
    return response.data;
  }
);

export const fetchBrandsAsync = createAsyncThunk(
  'product/fetchBrands',
  async()=>{
    const response = await fetchBrands();
    return response.data;
  }
);

export const fetchCategoriesAsync = createAsyncThunk(
  'product/fetchCategories',
  async()=>{
    const response = await fetchCategories();
    return response.data;
  }
);


export const fetchProductByIdAsync = createAsyncThunk(
  'product/fetchProductById',
  async(id)=>{
    const response = await fetchProductById(id);
    return response.data;
  }
)
export const createProductAsync = createAsyncThunk(
  'product/create',
  async(product)=>{
    const response = await createProduct(product);
    return response.data;
  }
)
export const updateProductAsync = createAsyncThunk(
  'product/update',
  async(update)=>{
    const response = await updateProduct(update);
    return response.data;
  }
)

export const productSlice = createSlice({
  name: 'product',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null
    },
  },





  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchProductsByFilterAsync.pending,(state) =>{
        state.status = 'loading';
      })
      .addCase(fetchProductsByFilterAsync.fulfilled,(state,action) =>{
        state.status = 'idle';
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchBrandsAsync.pending,(state)=>{
        state.status = 'loading';
      })
      .addCase(fetchBrandsAsync.fulfilled,(state,action)=>{
        state.status = 'idle';
        state.brands = action.payload;
      })
      .addCase(fetchCategoriesAsync.pending,(state)=>{
        state.status = 'loading';
      })
      .addCase(fetchCategoriesAsync.fulfilled,(state,action)=>{
        state.status = 'idle';
        state.categories = action.payload;
      })
      .addCase(fetchProductByIdAsync.pending,(state)=>{
        state.status = 'loading';
      })
      .addCase(fetchProductByIdAsync.fulfilled,(state,action)=>{
        state.status = 'idle';
        state.selectedProduct = action.payload;
      })
      .addCase(createProductAsync.pending,(state)=>{
        state.status = 'idle';
      })
      .addCase(createProductAsync.fulfilled,(state,action)=>{
        state.status = 'idle';
        state.products.push(action.payload)
      })
      .addCase(updateProductAsync.pending,(state)=>{
        state.status = "loading";
      })
      .addCase(updateProductAsync.fulfilled,(state,action)=>{
        state.status = 'idle';
        const index = state.products.findIndex((product)=>product.id === action.payload.id)
        state.products[index] = action.payload
      })
  },
});

export const { clearSelectedProduct } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectBrands = (state) => state.product.brands;
export const selectCategories =(state) => state.product.categories;
export const selectedProductById = (state) => state.product.selectedProduct;

export default productSlice.reducer;
