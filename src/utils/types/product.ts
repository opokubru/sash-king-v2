import { CategoryType } from "./category";

// types/product.ts
export interface Product {
    id?: string;
    name: string;
    title: string;
    description: string;
    price: number;
    image: string;
    image_url?: string; // Keep for backward compatibility
    created_at?: string;
    discount?: number;
    category?: CategoryType['value']; // restricts to allowed values
    in_stock?: boolean;
    extra_image_urls?: string[];
    sizes?: string[];
    colors?: string[];
    // Sash-specific properties
    textColor?: string;
    positioningLeft?: {
      text: {
        top: string;
        left: string;
        height: string;
        width: string;
        lineHeight: string;
      };
      image: {
        top: string;
        left: string;
        height: string;
        width: string;
      };
    };
    positioningRight?: {
      text: {
        top: string;
        left: string;
        height: string;
        width: string;
        lineHeight: string;
      };
      image: {
        top: string;
        left: string;
        height: string;
        width: string;
      };
    };
    otherYards?: {
      small: number;
      large: number;
      extraLarge: number;
      extraExtraLarge: number;
    };
    myZoom?: number;
    readyIn?: number;
    sizeOptions?: Array<{
      label: string;
      value: number;
    }>;
    // 3D Sash specific properties
    myNode?: Array<{
      name: string;
      yardNeeded: number;
    }>;
    sizeForms?: Array<{
      label: string;
    }>;
    weight?: number;
    isAccessory?: boolean;
  }
  