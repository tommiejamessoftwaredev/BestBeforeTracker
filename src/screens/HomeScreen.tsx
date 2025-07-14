import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import { FoodItem } from '../types';
import ScanScreen from './ScanScreen';

const HomeScreen = () => {
  const [showScanScreen, setShowScanScreen] = useState(false);
  const [foodItems, setFoodItems] = useState<FoodItem[]>([
    {
      id: '1',
      name: 'Milk',
      expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      category: 'Dairy',
      addedDate: new Date(),
      location: 'fridge',
      daysUntilExpiry: 2,
    },
    {
      id: '2',
      name: 'Bread',
      expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      category: 'Bakery',
      addedDate: new Date(),
      location: 'pantry',
      daysUntilExpiry: 5,
    },
  ]);

  const addFoodItem = (newItem: FoodItem) => {
    setFoodItems([...foodItems, newItem]);
  };



  const removeItem = (id: string) => {
    setFoodItems(foodItems.filter(item => item.id !== id));
  };

  const getExpiryColor = (daysUntilExpiry: number) => {
    if (daysUntilExpiry < 0) return '#cc0000'; // Dark red for expired
    if (daysUntilExpiry <= 1) return '#ff4444'; // Red
    if (daysUntilExpiry <= 3) return '#ff8800'; // Orange
    return '#44aa44'; // Green
  };

  const renderFoodItem = ({ item }: { item: FoodItem }) => (
    <TouchableOpacity
      style={[
        styles.foodItem, 
        { borderLeftColor: getExpiryColor(item.daysUntilExpiry) },
        item.daysUntilExpiry < 0 && styles.expiredItem // Add red background for expired items
      ]}
      onPress={() => {
        const message = item.daysUntilExpiry < 0 
          ? `${item.name} has expired`
          : item.daysUntilExpiry === 0 
            ? `${item.name} expires today!`
            : item.daysUntilExpiry === 1
              ? `${item.name} expires tomorrow`
              : `${item.name} expires in ${item.daysUntilExpiry} days`;
        
        Alert.alert('Food Item', message);
      }}
    >
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemCategory}>{item.category} • {item.location}</Text>
        <Text style={[styles.itemExpiry, { color: getExpiryColor(item.daysUntilExpiry) }]}>
          {item.daysUntilExpiry < 0 ? 'Expired' :
           item.daysUntilExpiry === 0 ? 'Expires today!' : 
           item.daysUntilExpiry === 1 ? 'Expires tomorrow' : 
           `Expires in ${item.daysUntilExpiry} days`}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeItem(item.id)}
      >
        <Text style={styles.removeButtonText}>Used</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Best Before Tracker</Text>
      
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          {foodItems.filter(item => item.daysUntilExpiry <= 1).length} items expiring soon • {' '}
          {foodItems.filter(item => item.daysUntilExpiry < 0).length} expired
        </Text>
      </View>

      <FlatList
        data={foodItems.sort((a, b) => a.daysUntilExpiry - b.daysUntilExpiry)}
        renderItem={renderFoodItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => setShowScanScreen(true)}>
        <Text style={styles.addButtonText}>+ Add Food Item</Text>
      </TouchableOpacity>

      <Modal
        visible={showScanScreen}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <ScanScreen
          onItemAdded={addFoodItem}
          onClose={() => setShowScanScreen(false)}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  summary: {
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  summaryText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
  },
  list: {
    flex: 1,
    paddingHorizontal: 20,
  },
  foodItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    borderLeftWidth: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  expiredItem: {
    backgroundColor: '#ffe6e6', // Light red background for expired items
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  itemCategory: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  itemExpiry: {
    fontSize: 14,
    fontWeight: '600',
  },
  removeButton: {
    backgroundColor: '#44aa44',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: '#007AFF',
    margin: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;