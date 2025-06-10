import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ScopeCardProps {
  scope: string;
  selected: boolean;
  onPress: () => void;
  tint: string;
  textColor: string;
  background: string;
  placeholder: string;
}

export const ScopeCard: React.FC<ScopeCardProps> = ({
  scope,
  selected,
  onPress,
  tint,
  textColor,
  background,
  placeholder,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.card,
      {
        borderColor: selected ? tint : placeholder,
        backgroundColor: selected ? tint : 'transparent',
      },
    ]}
  >
    <Text style={[styles.text, { color: selected ? background : textColor }]}>
      {scope}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    borderWidth: 2,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 24,
    margin: 6,
    minWidth: 100,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});
