import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  discount?: number;
  image_url: string;
  quantity: number;
  in_stock?: boolean;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existing = state?.items?.find((item) => item?.id === action?.payload?.id);
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state?.items?.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state?.items?.filter((item) => item?.id !== action.payload);
    },
    resetCart: () => initialState,
  },
});

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions;
export default cartSlice;
