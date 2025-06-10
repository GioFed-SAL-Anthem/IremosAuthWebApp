import { MedplumClient } from '@medplum/core';
import Constants from 'expo-constants';

const baseUrl = Constants.expoConfig?.extra?.MEDPLUM_BASE_URL;
const clientId = Constants.expoConfig?.extra?.MEDPLUM_CLIENT_ID;

console.log('🌐 MEDPLUM_BASE_URL:', baseUrl);
console.log('🔑 MEDPLUM_CLIENT_ID:', clientId);

export const medplum = new MedplumClient({
  baseUrl,
  clientId,
});
