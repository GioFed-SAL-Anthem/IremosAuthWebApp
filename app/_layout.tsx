import { useThemeColor } from '@/hooks/useThemeColor';
import { Stack } from 'expo-router';

export default function RootLayout() {
  const background = useThemeColor({}, 'background');
  const text = useThemeColor({}, 'text');
  const tint = useThemeColor({}, 'tint');
  const border = useThemeColor({}, 'border');

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: background
        },
        headerShadowVisible: false,
        headerTintColor: tint,
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
        },
        contentStyle: {
          backgroundColor: background,
        },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="authorize" options={{ title: 'Welcome' }} />
      <Stack.Screen name="register" options={{ title: 'Register' }} />
      <Stack.Screen name="scope" options={{ title: 'Access Scopes' }} />
    </Stack>
  );
}
