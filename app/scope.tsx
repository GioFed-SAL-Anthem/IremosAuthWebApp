import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Linking,
} from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ALL_SCOPES, DEFAULT_SCOPES } from '@/constants/Scopes';
import { ScopeCard } from '@/components/ScopeCard';
import { PrimaryButton } from '@/components/PrimaryButton';
import { medplum } from '@/lib/medplum';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function ScopesScreen() {
  const tint = useThemeColor({}, 'tint');
  const textColor = useThemeColor({}, 'text');
  const background = useThemeColor({}, 'background');
  const placeholder = useThemeColor({}, 'placeholder');
  const router = useRouter();

  const {
    email,
    password,
    redirect_uri,
    state,
    code_challenge,
  } = useLocalSearchParams<{
    email: string;
    password: string;
    redirect_uri: string;
    state: string;
    code_challenge: string;
  }>();

  const [selectedScopes, setSelectedScopes] = useState<string[]>(DEFAULT_SCOPES);
  const [loading, setLoading] = useState(false);

  const toggleScope = useCallback((scope: string) => {
    setSelectedScopes((prev) =>
      prev.includes(scope) ? prev.filter((s) => s !== scope) : [...prev, scope]
    );
  }, []);

  const handleContinue = useCallback(async () => {
    if (!email || !password || !redirect_uri) {
      console.warn('🔧 Missing required params', { email, password, redirect_uri, state });
      Alert.alert('Missing Info', 'Some required login parameters are missing.');
      return;
    }

    setLoading(true);
    try {
      const scopeString = selectedScopes.join(' ');

      const loginResult = await medplum.startLogin({
        email,
        password,
        remember: true,
        scope: scopeString,
        codeChallenge: code_challenge,
        codeChallengeMethod: code_challenge ? 'S256' : undefined,
      });

      const redirectUrl = `${redirect_uri}?code=${loginResult.code}&state=${state}`;
      console.log('✅ Login succeeded. Redirecting to:', redirectUrl);

      if (Platform.OS === 'web') {
        window.location.href = redirectUrl;
      } else {
        const supported = await Linking.canOpenURL(redirectUrl);
        if (supported) {
          await Linking.openURL(redirectUrl);
        } else {
          Alert.alert('Redirect Error', `Cannot open redirect URL: ${redirectUrl}`);
        }
      }
    } catch (err: any) {
      console.error('❌ Login error:', err);
      Alert.alert('Authorization Failed', err?.message ?? 'Unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  }, [email, password, redirect_uri, state, code_challenge, selectedScopes]);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: background }]}>
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text
            accessibilityRole="header"
            style={[styles.title, { color: textColor }]}
          >
            Choose Access Scopes
          </Text>

          <View style={styles.scopesContainer}>
            {ALL_SCOPES.map((scope) => (
              <ScopeCard
                key={scope}
                scope={scope}
                selected={selectedScopes.includes(scope)}
                onPress={() => toggleScope(scope)}
                tint={tint}
                textColor={textColor}
                background={background}
                placeholder={placeholder}
              />
            ))}
          </View>
        </ScrollView>

        <View style={[styles.buttonContainer, { backgroundColor: background }]}>
          <PrimaryButton
            title="Continue"
            onPress={handleContinue}
            loading={loading}
            backgroundColor={tint}
            textColor={background}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  wrapper: { flex: 1 },
  scrollContainer: {
    paddingTop: 64,
    paddingHorizontal: 24,
    alignItems: 'center',
    paddingBottom: 120,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
  },
  scopesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    maxWidth: SCREEN_WIDTH - 48,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
