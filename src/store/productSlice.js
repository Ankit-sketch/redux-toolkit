import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const productSlice = createSlice({
  name: "product_fetching",
  initialState: { data: [], status: STATUSES.IDLE },
  reducers: {
    // setProducts(state, action) {
    //   console.log(action);
    //   state.data = action.payload;
    // },
    // setStatus(state, action) {
    //   state.status = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});
export const { setStatus, setProducts } = productSlice.actions;

//Thunk reduxtoolkit
export const fetchProduct = createAsyncThunk("/product/fetch", async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  return data;
});

// Thunk
// export function fetchProduct() {
//   return async function fetchProductThunk(dispatch, getstate) {
//     dispatch(setStatus(STATUSES.LOADING));
//     try {
//       const res = await fetch("https://fakestoreapi.com/products");
//       const data = await res.json();
//       dispatch(setProducts(data));
//       dispatch(setStatus(STATUSES.IDLE));
//     } catch (error) {
//       dispatch(setStatus(STATUSES.LOADING));
//     }
//   };
// }
export default productSlice.reducer;
