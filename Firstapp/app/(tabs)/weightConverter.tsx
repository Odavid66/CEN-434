import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const MassConverter = () => {
  const [kilograms, setKilograms] = useState('');

  const poundsValue = kilograms
    ? (Number(kilograms) * 2.20462).toFixed(2)
    : '';

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Weight Converter</Text>

      <Text style={styles.caption}>Kilograms</Text>
      <TextInput
        style={styles.field}
        keyboardType="numeric"
        placeholder="Enter kg"
        value={kilograms}
        onChangeText={setKilograms}
      />

      <View style={styles.outputBox}>
        <Text style={styles.outputLabel}>Pounds</Text>
        <Text style={styles.outputValue}>
          {poundsValue ? `${poundsValue} lbs` : '--'}
        </Text>
      </View>
    </View>
  );
};

export default function App() {
  return (
    <View style={styles.page}>
      <MassConverter />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#eef2f7',
    width: '80%',
    alignSelf: 'center',
  },

  card: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 18,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 16,
    textAlign: 'center',
  },

  caption: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 6,
  },

  field: {
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingHorizontal: 14,
    fontSize: 16,
    backgroundColor: '#f8fafc',
    marginBottom: 20,
  },

  outputBox: {
    backgroundColor: '#f1f5f9',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
  },

  outputLabel: {
    fontSize: 13,
    color: '#475569',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  outputValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1e293b',
  },
});
