export enum Category {
  FOOD_DRINK = "Sales",

}

export interface SaleRecord {
  id: string;
  productName: string;
  price: number;
  quantity: number;
  category: Category;
  timestamp: number;
  notes?: string;
}

export interface ExtractedData {
  items: Array<{
    productName: string;
    price: number;
    quantity: number;
    category: string;
  }>;
}