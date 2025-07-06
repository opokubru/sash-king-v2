import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthUser {
  id: string;
  email?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;

}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

    onLoginSuccess: (state, action: PayloadAction<AuthUser>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    

    onLogout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
     
    },
  },
});

export const {  onLoginSuccess, onLogout } = authSlice.actions;
export default authSlice;