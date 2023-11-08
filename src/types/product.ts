export interface Product {
  product_id: number;
  name: string;
  description?: string | null;
  price: number;
}

export interface ProductPayload extends Omit<Product, "product_id"> {}
