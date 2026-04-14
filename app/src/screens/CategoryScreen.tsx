import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NewsItemCard } from '../components/NewsItem';
import { CATEGORY_COLORS } from '../config';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Category'>;

export function CategoryScreen({ route, navigation }: Props) {
  const { category } = route.params;
  const accentColor = CATEGORY_COLORS[category.id] || '#6B7280';

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.icon}>{category.icon}</Text>
        <Text style={[styles.title, { color: accentColor }]}>{category.name}</Text>
        <Text style={styles.count}>{category.items.length}件のニュース</Text>
      </View>

      {category.items.map((item, index) => (
        <NewsItemCard
          key={index}
          item={item}
          onPress={() => navigation.navigate('Detail', { item, categoryName: category.name })}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  icon: {
    fontSize: 40,
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  count: {
    color: '#9CA3AF',
    fontSize: 14,
  },
});
