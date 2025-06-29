import { CategoryType } from "./category";

// types/product.ts
export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image_url: string;
    created_at?: string;
    discount?: number;
    category?: CategoryType['value']; // restricts to allowed values
    in_stock?: boolean;

  }
  