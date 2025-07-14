export interface FoodItem {
  id: string;
  name: string;
  barcode?: string;
  expiryDate: Date;
  category: string;
  addedDate: Date;
  location: 'fridge' | 'pantry' | 'freezer';
  daysUntilExpiry: number;
}

export interface BarcodeResult {
  value: string;
  format: string;
}

export interface OCRResult {
  text: string;
  confidence: number;
}