import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Category } from '../types/report';
import { CATEGORY_COLORS } from '../config';

interface Props {
  category: Category;
  onPress: () => void;
}

export function CategoryCard({ category, onPress }: Props) {
  const accentColor = CATEGORY_COLORS[category.id] || '#6B7280';

  return (
    <TouchableOpacity style={[styles.card, { borderLeftColor: accentColor }]} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.icon}>{category.icon}</Text>
        <Text style={styles.name}>{category.name}</Text>
      </View>
      <Text style={styles.count}>{category.items.length}件</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  icon: {
    fontSize: 24,
  },
  name: {
    color: '#F9FAFB',
    fontSize: 16,
    fontWeight: '600',
  },
  count: {
    color: '#9CA3AF',
    fontSize: 14,
  },
});
