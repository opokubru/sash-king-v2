import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id?: string;
  name: string;
  price: number;
  discount?: number;
  image_url: string;
  quantity: number;
  in_stock?: boolean;
  selectedSize?: string | null;
selectedColor?: string | null;

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
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity++;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      // Only decrease if quantity is more than 1
      if (item && item.quantity > 1) {
        item.quantity--;
      }
    },
    resetCart: () => initialState,
  },
});

export const { addToCart, removeFromCart, resetCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice;
