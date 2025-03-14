import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface CategoryItemProps {
  title: string;
  onPress?: () => void;
  isSelected?: boolean;
}

const CategoryItem = ({ title, onPress, isSelected = false }: CategoryItemProps) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity 
        style={[styles.customButton, isSelected && styles.selectedButton]}
        onPress={onPress}
      >
        <Text style={[styles.buttonText, isSelected && styles.selectedText]}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginHorizontal: 10,
  },
  customButton: {
    backgroundColor: '#EEDCC6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  selectedButton: {
    backgroundColor: '#230C02',
  },
  buttonText: {
    color: '#230C02',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedText: {
    color: '#EEDCC6',
  },
});

export default CategoryItem;