export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  categoryId: string;
  description: string;
}