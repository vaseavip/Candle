export interface Product {
  id: number;
  name: string;
  price: number;
  currency: string;
  category: string;
  image: string;
  inStock: boolean;
  categoryId: number;
  description: string;
  quantity: number;

  sizes?: string[];

  characteristics?: {
    material?: string;
    fuseType?: string;
    weight?: string;
    height?: string;
    burningTime?: string;
    flavor?: string[];
    color?: string;
    achievement?: string;
  };
}
