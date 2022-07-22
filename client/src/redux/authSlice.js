import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const initialState = {
  authToken: null,
  isLoading: false,
  isSuccess: false,
  isLogoutSuccess: false,
  isError: false,
  message: "",
};

const errorMessageHandler = (error) => {
  const message = error.response.data.error || error.message;
  return message;
};

// Register User
export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      return await authService.register(userData);
    } catch (error) {
      const message = errorMessageHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login User
export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      const message = errorMessageHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Forgot Password
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (userData, thunkAPI) => {
    try {
      return await authService.forgotPassword(userData);
    } catch (error) {
      const message = errorMessageHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Reset Password
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (userData, thunkAPI) => {
    try {
      return await authService.resetPassword(userData);
    } catch (error) {
      const message = errorMessageHandler(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Logout User
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  return;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.isLogoutSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.authToken = action.payload.token;
    });

    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.authToken = null;
    });

    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.authToken = action.payload.token;
    });

    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.authToken = null;
    });

    builder.addCase(forgotPassword.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload.message;
    });

    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    builder.addCase(resetPassword.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload.message;
    });

    builder.addCase(resetPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.authToken = null;
      state.isLogoutSuccess = true;
    });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
