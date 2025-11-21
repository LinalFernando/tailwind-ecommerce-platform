export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string; // Primary image for grid
  images: string[]; // Gallery images for modal
  badges: string[];
  rating: number;
  reviews: number;
  details: {
    origin: string;
    weight: string;
    ingredients: string;
  };
}

export interface CartItem extends Product {
  quantity: number;
}

export interface GeminiSearchResponse {
  text: string;
  sources: Array<{
    uri: string;
    title: string;
  }>;
}

export enum ImageAspectRatio {
  SQUARE = '1:1',
  PORTRAIT = '3:4',
  LANDSCAPE = '16:9',
  WIDE = '16:9' // Using 16:9 as a proxy for wide if needed, usually standard
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}