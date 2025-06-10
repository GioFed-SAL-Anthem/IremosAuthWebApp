import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  loading: boolean;
  backgroundColor: string;
  textColor: string;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  loading,
  backgroundColor,
  textColor,
}) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={loading}
    style={[styles.button, { backgroundColor }]}
    activeOpacity={0.9}
  >
    {loading ? <ActivityIndicator color={textColor} /> : <Text style={[styles.text, { color: textColor }]}>{title}</Text>}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 24,
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
  },
});
