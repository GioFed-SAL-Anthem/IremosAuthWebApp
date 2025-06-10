import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function NotFoundScreen() {
  const router = useRouter();

  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const primaryColor = useThemeColor({}, 'tint');
  const mutedColor = useThemeColor({}, 'placeholder');

  return (
    <>
      <Stack.Screen options={{ title: 'Page Not Found' }} />
      <View style={[styles.container, { backgroundColor }]}>
        <Text style={[styles.title, { color: textColor }]}>Oops!</Text>
        <Text style={[styles.message, { color: mutedColor }]}>
          The page you’re looking for doesn’t exist.
        </Text>

        <Pressable
          onPress={() => router.replace('/authorize')}
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: primaryColor },
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>Go to Home Screen</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
