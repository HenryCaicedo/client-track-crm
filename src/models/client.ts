import { Product } from "./product";

export interface Client {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  productIds: number[];
}
