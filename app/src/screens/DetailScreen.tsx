import React from 'react';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PredictionCard } from '../components/PredictionCard';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

const IMPACT_LABEL: Record<string, { label: string; color: string }> = {
  high: { label: '重要度: 高', color: '#EF4444' },
  medium: { label: '重要度: 中', color: '#F59E0B' },
  low: { label: '重要度: 低', color: '#6B7280' },
};

export function DetailScreen({ route }: Props) {
  const { item } = route.params;
  const impact = IMPACT_LABEL[item.impact_level] || IMPACT_LABEL.low;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={[styles.impactBadge, { backgroundColor: impact.color + '20' }]}>
        <Text style={[styles.impactText, { color: impact.color }]}>{impact.label}</Text>
      </View>

      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.source}>{item.source}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>概要</Text>
        <Text style={styles.body}>{item.summary}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>背景・経緯</Text>
        <Text style={styles.body}>{item.background}</Text>
      </View>

      <Text style={styles.predictionTitle}>トレンド予測</Text>

      <PredictionCard
        label="短期予測"
        period="1〜3ヶ月"
        content={item.prediction_short}
        color="#3B82F6"
      />
      <PredictionCard
        label="中長期予測"
        period="半年〜1年"
        content={item.prediction_long}
        color="#8B5CF6"
      />

      <View style={styles.tags}>
        {item.tags.map((tag) => (
          <View key={tag} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => Linking.openURL(item.url)}
      >
        <Text style={styles.linkText}>元記事を開く</Text>
      </TouchableOpacity>
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
  impactBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 12,
  },
  impactText: {
    fontSize: 12,
    fontWeight: '700',
  },
  title: {
    color: '#F9FAFB',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 28,
    marginBottom: 6,
  },
  source: {
    color: '#9CA3AF',
    fontSize: 13,
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionLabel: {
    color: '#6B7280',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  body: {
    color: '#D1D5DB',
    fontSize: 15,
    lineHeight: 24,
  },
  predictionTitle: {
    color: '#F9FAFB',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 14,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  tag: {
    backgroundColor: '#374151',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
  },
  tagText: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  linkButton: {
    backgroundColor: '#6366F1',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  linkText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
});
