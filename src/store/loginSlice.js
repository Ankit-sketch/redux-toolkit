import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Web3 from "web3";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});
const auth = {
  webauth: null,
  provider: null,
  information: null,
  status: STATUSES.IDLE,
};
const loginSlice = createSlice({
  name: "login_slice",
  initialState: auth,
  reducers: {
    authLogout(state, action) {
      console.log(action);
      state.provider = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchModal.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchModal.fulfilled, (state, action) => {
        console.log(action.payload, "fjvbkhyfyufcb");
        state.webauth = action.payload;
        state.provider = action.payload.provider;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchModal.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(initializLogin.pending, (state, action) => {
        console.log("logiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
        state.status = STATUSES.LOADING;
      })
      .addCase(initializLogin.fulfilled, (state, action) => {
        console.log("login fulfilled", action);
        state.provider = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(initializLogin.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(initializeModal.pending, (state, action) => {
  //         state.status = STATUSES.LOADING;
  //       })
  //       .addCase(initializeModal.fulfilled, (state, action) => {
  //         state.status = STATUSES.IDLE;
  //       })
  //       .addCase(initializeModal.rejected, (state, action) => {
  //         state.status = STATUSES.ERROR;
  //       });
  //   },
  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(initializLogin.pending, (state, action) => {
  //         state.status = STATUSES.LOADING;
  //       })
  //       .addCase(initializLogin.fulfilled, (state, action) => {
  //         state.status = STATUSES.IDLE;
  //       })
  //       .addCase(initializLogin.rejected, (state, action) => {
  //         state.status = STATUSES.ERROR;
  //       });
  //   },
});
export const { authLogout } = loginSlice.actions;

//Thunk reduxtoolkit
export const fetchModal = createAsyncThunk("/modal/fetch", async () => {
  const web3auth = new Web3Auth({
    clientId: process.env.REACT_APP_CLIENTID, // get it from Web3Auth Dashboard
    chainConfig: {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      displayName: "Goerli Test Network",
      chainId: "0x5",
      rpcTarget: process.env.REACT_APP_RPCTARGET,
      blockExplorer: process.env.REACT_APP_BLOCKEXPLORER,
      ticker: "ETH",
      tickerName: "Ethereum",
    },
  });
  await web3auth.initModal();
  return web3auth;
});
// export const initializeModal = createAsyncThunk(
//   "/modal/initialize",
//   async (webauth) => {
//     await webauth.initModal();
//     return true;
//   }
// );
export const initializLogin = createAsyncThunk(
  "/modal/login",
  async (webauth) => {
    const web3authProvider = await webauth.connect();
    console.log("web3authProviderweb3authProvider", web3authProvider);
    return web3authProvider;
  }
);
export default loginSlice.reducer;
