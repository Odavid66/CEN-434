import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';

const SimpleTextEditor = () => {
  const [text, setText] = useState('');
  const [savedText, setSavedText] = useState('');

  const saveText = () => setSavedText(text);
  const clearText = () => {
    setText('');
    setSavedText('');
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.header}>Simple Text Editor</Text>

      <View style={styles.editorCard}>
        <TextInput
          style={styles.input}
          multiline
          value={text}
          onChangeText={setText}
          placeholder="Start typing..."
          placeholderTextColor="#94a3b8"
        />
      </View>

      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.saveBtn} onPress={saveText}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.clearBtn} onPress={clearText}>
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>
      </View>

      {savedText ? (
        <View style={styles.previewCard}>
          <Text style={styles.previewLabel}>Saved Text</Text>
          <Text style={styles.previewText}>{savedText}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f1f5f9',
    width: '80%',
    alignSelf: 'center',
  },

  header: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 16,
    textAlign: 'center',
  },

  editorCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
    minHeight: 160,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },

  input: {
    fontSize: 16,
    color: '#1e293b',
    textAlignVertical: 'top',
    lineHeight: 22,
  },

  actionRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },

  saveBtn: {
    flex: 1,
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },

  clearBtn: {
    flex: 1,
    backgroundColor: '#e2e8f0',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },

  saveText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },

  clearText: {
    color: '#0f172a',
    fontSize: 16,
    fontWeight: '600',
  },

  previewCard: {
    marginTop: 20,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 4,
  },

  previewLabel: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  previewText: {
    fontSize: 16,
    color: '#0f172a',
    lineHeight: 22,
  },
});

export default SimpleTextEditor;
