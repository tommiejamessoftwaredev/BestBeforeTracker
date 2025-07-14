import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import BarcodeScanner from '../components/BarcodeScanner';
import { FoodItem } from '../types';

interface ScanScreenProps {
  onItemAdded: (item: FoodItem) => void;
  onClose: () => void;
}

const ScanScreen: React.FC<ScanScreenProps> = ({ onItemAdded, onClose }) => {
  const [showScanner, setShowScanner] = useState(false);
  const [barcode, setBarcode] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState<'fridge' | 'pantry' | 'freezer'>('fridge');
  const [expiryDate, setExpiryDate] = useState('');

  const handleBarcodeScanned = (scannedBarcode: string) => {
    setBarcode(scannedBarcode);
    setShowScanner(false);
    
    // Try to look up product info (for now just show the barcode)
    Alert.alert('Barcode Scanned', `Found: ${scannedBarcode}`, [
      { text: 'OK', onPress: () => {} }
    ]);
    
    // TODO: Look up product info from barcode API
    setName('Scanned Product'); // Placeholder
    setCategory('Unknown'); // Placeholder
  };

  const calculateDaysUntilExpiry = (expiryDateString: string): number => {
    if (!expiryDateString) return 0;
    
    const expiry = new Date(expiryDateString);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return Math.max(0, diffDays);
  };

  const handleSave = () => {
    if (!name || !expiryDate) {
      Alert.alert('Error', 'Please fill in product name and expiry date');
      return;
    }

    const newItem: FoodItem = {
      id: Date.now().toString(),
      name,
      barcode: barcode || undefined,
      expiryDate: new Date(expiryDate),
      category: category || 'Other',
      addedDate: new Date(),
      location,
      daysUntilExpiry: calculateDaysUntilExpiry(expiryDate),
    };

    onItemAdded(newItem);
    onClose();
  };

  if (showScanner) {
    return (
      <BarcodeScanner
        onBarcodeScanned={handleBarcodeScanned}
        onClose={() => setShowScanner(false)}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Add Food Item</Text>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.closeButton}>✕</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.form}>
        {/* Barcode Section */}
        <View style={styles.section}>
          <Text style={styles.label}>Barcode (Optional)</Text>
          <View style={styles.barcodeRow}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              value={barcode}
              onChangeText={setBarcode}
              placeholder="Scan or enter manually"
              placeholderTextColor="#999"
            />
            <TouchableOpacity
              style={styles.scanButton}
              onPress={() => setShowScanner(true)}
            >
              <Text style={styles.scanButtonText}>Scan</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Product Info */}
        <View style={styles.section}>
          <Text style={styles.label}>Product Name *</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter product name"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Category</Text>
          <TextInput
            style={styles.input}
            value={category}
            onChangeText={setCategory}
            placeholder="e.g. Dairy, Meat, Vegetables"
            placeholderTextColor="#999"
          />
        </View>

        {/* Location */}
        <View style={styles.section}>
          <Text style={styles.label}>Storage Location</Text>
          <View style={styles.locationRow}>
            {(['fridge', 'pantry', 'freezer'] as const).map((loc) => (
              <TouchableOpacity
                key={loc}
                style={[
                  styles.locationButton,
                  location === loc && styles.locationButtonActive
                ]}
                onPress={() => setLocation(loc)}
              >
                <Text
                  style={[
                    styles.locationButtonText,
                    location === loc && styles.locationButtonTextActive
                  ]}
                >
                  {loc.charAt(0).toUpperCase() + loc.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Expiry Date */}
        <View style={styles.section}>
          <Text style={styles.label}>Expiry Date *</Text>
          <TextInput
            style={styles.input}
            value={expiryDate}
            onChangeText={setExpiryDate}
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#999"
          />
          <Text style={styles.hint}>Format: YYYY-MM-DD (e.g., 2024-07-20)</Text>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Add Item</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    fontSize: 24,
    color: '#666',
  },
  form: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  barcodeRow: {
    flexDirection: 'row',
    gap: 10,
  },
  scanButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  scanButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  locationRow: {
    flexDirection: 'row',
    gap: 10,
  },
  locationButton: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  locationButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  locationButtonText: {
    color: '#333',
    fontWeight: '600',
  },
  locationButtonTextActive: {
    color: '#fff',
  },
  hint: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  saveButton: {
    backgroundColor: '#44aa44',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ScanScreen;