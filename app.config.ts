import 'dotenv/config';
import { ExpoConfig, ConfigContext } from '@expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: config.name ?? 'DefaultAppName',
  slug: config.slug ?? 'default-app-slug',
  version: config.version ?? '1.0.0',
  extra: {
    ...config.extra,
    MEDPLUM_BASE_URL: process.env.EXPO_PUBLIC_MEDPLUM_BASE_URL,
    MEDPLUM_CLIENT_ID: process.env.EXPO_PUBLIC_MEDPLUM_CLIENT_ID,
  },
});