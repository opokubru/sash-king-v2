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
  // Custom design fields
  isCustom?: boolean;
  customTextLeft?: string;
  customTextRight?: string;
  customImage?: string;
  uploadedImageLeft?: string;
  uploadedImageRight?: string;
  fontSizeLeft?: number;
  fontSizeRight?: number;
  fontFamily?: string;
  textColor?: string;
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
      const existing = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.selectedSize === action.payload.selectedSize &&
          item.selectedColor === action.payload.selectedColor
      );
    
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state?.items?.filter((item) => item?.id !== action.payload);
    },
    increaseQuantity: (
      state,
      action: PayloadAction<{ id: string; selectedSize?: string | null; selectedColor?: string | null }>
    ) => {
      const item = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.selectedSize === action.payload.selectedSize &&
          item.selectedColor === action.payload.selectedColor
      );
      if (item) {
        item.quantity++;
      }
    },
    
    decreaseQuantity: (
      state,
      action: PayloadAction<{ id: string; selectedSize?: string | null; selectedColor?: string | null }>
    ) => {
      const index = state.items.findIndex(
        (item) =>
          item.id === action.payload.id &&
          item.selectedSize === action.payload.selectedSize &&
          item.selectedColor === action.payload.selectedColor
      );
      if (index !== -1) {
        const item = state.items[index];
        if (item.quantity > 1) {
          item.quantity--;
        } else {
          state.items.splice(index, 1);
        }
      }
    },
    
    resetCart: () => initialState,
  },
});

export const { addToCart, removeFromCart, resetCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice;
