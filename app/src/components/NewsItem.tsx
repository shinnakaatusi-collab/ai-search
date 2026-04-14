import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { NewsItem as NewsItemType } from '../types/report';

interface Props {
  item: NewsItemType;
  onPress: () => void;
}

const IMPACT_BADGE: Record<string, { label: string; color: string }> = {
  high: { label: '重要', color: '#EF4444' },
  medium: { label: '注目', color: '#F59E0B' },
  low: { label: '参考', color: '#6B7280' },
};

export function NewsItemCard({ item, onPress }: Props) {
  const badge = IMPACT_BADGE[item.impact_level] || IMPACT_BADGE.low;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <View style={[styles.badge, { backgroundColor: badge.color + '20' }]}>
          <Text style={[styles.badgeText, { color: badge.color }]}>{badge.label}</Text>
        </View>
        <Text style={styles.source}>{item.source}</Text>
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.summary} numberOfLines={2}>{item.summary}</Text>
      <View style={styles.tags}>
        {item.tags.slice(0, 3).map((tag) => (
          <View key={tag} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  source: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  title: {
    color: '#F9FAFB',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
  },
  summary: {
    color: '#D1D5DB',
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 10,
  },
  tags: {
    flexDirection: 'row',
    gap: 6,
  },
  tag: {
    backgroundColor: '#374151',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  tagText: {
    color: '#9CA3AF',
    fontSize: 11,
  },
});
