import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
  useWindowDimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useThemeColor } from '@/hooks/useThemeColor';
import { startLoginWithRedirect } from '@/lib/auth';

const logo = require('@/assets/images/icon.png');

export default function AuthorizeScreen() {
  const { width } = useWindowDimensions();

  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');
  const borderColor = useThemeColor({}, 'icon');
  const placeholderColor = useThemeColor({}, 'placeholder');

  const params = useLocalSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    client_id,
    redirect_uri,
    response_type,
    scope,
    state,
    code_challenge,
  } = params;

  async function handleAuthorize() {
    if (!email || !password) {
      Alert.alert('Missing Credentials', 'Please enter both email and password.');
      return;
    }

    if (!redirect_uri || !code_challenge) {
      Alert.alert('Missing Parameters', 'OAuth parameters are incomplete.');
      console.warn('OAuth Params:', { redirect_uri, state, code_challenge });
      return;
    }

    setLoading(true);
    try {
      await startLoginWithRedirect(
        router,
        email.trim(),
        password,
        redirect_uri as string,
        state as string,
        code_challenge as string
      );
    } catch (err: any) {
      console.error('Login error:', err);
      Alert.alert('Login Failed', err?.message || 'Unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: 'padding', android: undefined })}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={[styles.container, { backgroundColor }]}>
          <View style={[styles.innerContainer, { maxWidth: Math.min(512, width - 40) }]}>
            <Image
              source={logo}
              style={styles.logo}
              resizeMode="contain"
              accessible
              accessibilityLabel="App Logo"
            />

            <Text style={[styles.title, { color: textColor }]}>OAuth Login</Text>

            <Text style={[styles.subtitle, { color: textColor }]}>
              Authorizing client: <Text style={{ fontWeight: '600' }}>{client_id}</Text>
            </Text>

            <TextInput
              placeholder="Email"
              placeholderTextColor={placeholderColor}
              style={[styles.input, { borderColor, color: textColor, backgroundColor }]}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              value={email}
              onChangeText={setEmail}
              accessible
              accessibilityLabel="Email input"
              textContentType="emailAddress"
            />

            <TextInput
              placeholder="Password"
              placeholderTextColor={placeholderColor}
              style={[styles.input, { borderColor, color: textColor, backgroundColor }]}
              secureTextEntry
              autoCapitalize="none"
              value={password}
              onChangeText={setPassword}
              accessible
              accessibilityLabel="Password input"
              textContentType="password"
            />

            <Pressable
              onPress={handleAuthorize}
              disabled={loading}
              style={({ pressed }) => [
                styles.button,
                { backgroundColor: tintColor },
                pressed && styles.buttonPressed,
              ]}
              accessibilityRole="button"
              accessibilityLabel="Authorize button"
            >
              {loading ? (
                <ActivityIndicator color="#122118" />
              ) : (
                <Text style={styles.buttonText}>Authorize</Text>
              )}
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    width: '100%',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 56,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    width: '100%',
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonText: {
    color: '#122118',
    fontWeight: '700',
    fontSize: 16,
  },
});
