import { useThemeColor } from '@/hooks/useThemeColor';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';

export default function RegisterScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');
  const borderColor = useThemeColor({}, 'icon');
  const placeholderColor = useThemeColor({}, 'placeholder');

  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.innerContainer}>
        <Text style={[styles.title, { color: textColor }]}>Create your account</Text>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: textColor }]}>Name</Text>
          <TextInput
            placeholder="Full name"
            placeholderTextColor={placeholderColor}
            style={[styles.input, { borderColor, color: textColor, backgroundColor }]}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: textColor }]}>Email</Text>
          <TextInput
            placeholder="Email"
            placeholderTextColor={placeholderColor}
            keyboardType="email-address"
            autoCapitalize="none"
            style={[styles.input, { borderColor, color: textColor, backgroundColor }]}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: textColor }]}>Password</Text>
          <TextInput
            placeholder="Password"
            placeholderTextColor={placeholderColor}
            secureTextEntry
            style={[styles.input, { borderColor, color: textColor, backgroundColor }]}
          />
        </View>

        <Pressable
          onPress={() => {
            // Implement registration logic here
            router.push('/scope');
          }}
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: tintColor },
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>Sign up</Text>
        </Pressable>

        <Pressable onPress={() => router.push('/authorize')}>
          <Text style={[styles.signInText, { color: placeholderColor }]}>
            Already have an account?{' '}
            <Text style={{ textDecorationLine: 'underline' }}>Log in</Text>
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    width: 512,
    maxWidth: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 6,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  button: {
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: '#122118',
    fontWeight: '700',
    fontSize: 16,
  },
  signInText: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
  },
});
