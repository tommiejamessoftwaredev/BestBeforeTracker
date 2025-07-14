export interface FoodItem {
  id: string;
  name: string;
  barcode?: string;
  expiryDate: Date;
  originalExpiryDate?: Date; // Store original expiry date
  category: string;
  addedDate: Date;
  location: 'fridge' | 'pantry' | 'freezer';
  daysUntilExpiry: number;
  openedDate?: Date; // When product was opened
  useWithinDays?: number; // How many days to use after opening
}

export interface BarcodeResult {
  value: string;
  format: string;
}

export interface OCRResult {
  text: string;
  confidence: number;
}
