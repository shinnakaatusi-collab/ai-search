import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  label: string;
  period: string;
  content: string;
  color: string;
}

export function PredictionCard({ label, period, content, color }: Props) {
  return (
    <View style={[styles.card, { borderLeftColor: color }]}>
      <View style={styles.header}>
        <Text style={[styles.label, { color }]}>{label}</Text>
        <Text style={styles.period}>{period}</Text>
      </View>
      <Text style={styles.content}>{content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
  },
  period: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  content: {
    color: '#D1D5DB',
    fontSize: 14,
    lineHeight: 22,
  },
});
