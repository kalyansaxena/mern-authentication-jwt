import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

// Register User
const register = async (userData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios.post(`${API_URL}/register`, userData, config);
  return response.data;
};

// Login User
const login = async (userData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios.post(`${API_URL}/login`, userData, config);
  return response.data;
};

// Forgot Password
const forgotPassword = async (userData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios.post(
    `${API_URL}/forgotPassword`,
    userData,
    config
  );
  return response.data;
};

// Reset Password
const resetPassword = async (userData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios.put(
    `${API_URL}/resetPassword/${userData.resetToken}`,
    { password: userData.password },
    config
  );
  return response.data;
};

const authService = {
  register,
  login,
  forgotPassword,
  resetPassword,
};

export default authService;
