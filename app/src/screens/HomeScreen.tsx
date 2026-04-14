import React from 'react';
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useReportData } from '../hooks/useReportData';
import { CategoryCard } from '../components/CategoryCard';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen({ navigation }: Props) {
  const { report, loading, error, refresh } = useReportData();

  if (loading && !report) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6366F1" />
        <Text style={styles.loadingText}>読み込み中...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!report) return null;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={refresh} tintColor="#6366F1" />
      }
    >
      <Text style={styles.date}>{report.date}</Text>

      <View style={styles.highlightCard}>
        <Text style={styles.highlightLabel}>TODAY'S HIGHLIGHT</Text>
        <Text style={styles.highlightText}>{report.highlight}</Text>
      </View>

      <Text style={styles.sectionTitle}>カテゴリ</Text>

      {report.categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          onPress={() => navigation.navigate('Category', { category })}
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
  center: {
    flex: 1,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#9CA3AF',
    marginTop: 12,
    fontSize: 14,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 14,
  },
  date: {
    color: '#6B7280',
    fontSize: 14,
    marginBottom: 16,
  },
  highlightCard: {
    backgroundColor: '#1E1B4B',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  highlightLabel: {
    color: '#818CF8',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 8,
  },
  highlightText: {
    color: '#E0E7FF',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  sectionTitle: {
    color: '#F9FAFB',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 14,
  },
});
