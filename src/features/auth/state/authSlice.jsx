import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loggedIn, loginUserApi, refreshToken } from "../api/authApi";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await loginUserApi(credentials);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

// ✅ check auth on app start / page refresh
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const data = await loggedIn();
      return data;
    } catch (error) {
      return rejectWithValue(null);
    }
  }
);

// ✅ check auth on app start / page refresh
export const refreshTokenGenrate = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const data = await refreshToken();
      return data;
    } catch (error) {
      return rejectWithValue(null);
    }
  }
);

const initialState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  isHydrated: false,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
    },

    setHydrated: (state) => {
      state.isHydrated = true;
    },
      // ✅ update access token from interceptor
    updateAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;

        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;

        state.isAuthenticated = true;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
       // ✅ checkAuth
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
        state.isHydrated = false;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;

        state.isHydrated = true; // ✅ auth check done
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.isHydrated = true; // ✅ auth check done even if failed
      })
       // ✅ refreshToken
      .addCase(refreshTokenGenrate.pending, (state) => {
        state.isLoading = true;
        state.isHydrated = false;
      })
      .addCase(refreshTokenGenrate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accessToken = action.payload.token;
        // state.isAuthenticated = true;
        // state.isHydrated = true; // ✅ auth check done
      })
      .addCase(refreshTokenGenrate.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.accessToken = null;
        state.isAuthenticated = false;
        state.isHydrated = true; // ✅ auth check done even if failed
      })
  },
});

export const { logout, setHydrated, updateAccessToken  } = authSlice.actions;

export default authSlice.reducer;