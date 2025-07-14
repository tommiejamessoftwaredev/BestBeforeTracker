import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { FoodItem } from '../types';

const HomeScreen = () => {
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

  const addSampleItem = () => {
    const newItem: FoodItem = {
      id: Date.now().toString(),
      name: 'Sample Item',
      expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      category: 'Test',
      addedDate: new Date(),
      location: 'fridge',
      daysUntilExpiry: 3,
    };
    setFoodItems([...foodItems, newItem]);
  };

  const removeItem = (id: string) => {
    setFoodItems(foodItems.filter(item => item.id !== id));
  };

  const getExpiryColor = (daysUntilExpiry: number) => {
    if (daysUntilExpiry <= 1) return '#ff4444'; // Red
    if (daysUntilExpiry <= 3) return '#ff8800'; // Orange
    return '#44aa44'; // Green
  };

  const renderFoodItem = ({ item }: { item: FoodItem }) => (
    <TouchableOpacity
      style={[styles.foodItem, { borderLeftColor: getExpiryColor(item.daysUntilExpiry) }]}
      onPress={() => Alert.alert('Food Item', `${item.name} expires in ${item.daysUntilExpiry} days`)}
    >
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemCategory}>{item.category} • {item.location}</Text>
        <Text style={[styles.itemExpiry, { color: getExpiryColor(item.daysUntilExpiry) }]}>
          {item.daysUntilExpiry === 0 ? 'Expires today!' : 
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
          {foodItems.filter(item => item.daysUntilExpiry <= 1).length} items expiring soon
        </Text>
      </View>

      <FlatList
        data={foodItems.sort((a, b) => a.daysUntilExpiry - b.daysUntilExpiry)}
        renderItem={renderFoodItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />

      <TouchableOpacity style={styles.addButton} onPress={addSampleItem}>
        <Text style={styles.addButtonText}>+ Add Sample Item</Text>
      </TouchableOpacity>
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