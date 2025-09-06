import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';

interface CardProps {
  title: string;
  children?: React.ReactNode;
  style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({ title, children, style }) => {
  return (
    <View style={[styles.card, style]}>    
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e0e0e0'
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  content: {
    // space for children
  }
});
