import { generateMockUserPrivateProfile } from '@/libs/users/mocks';
import {
  UpdateContactLocationDto,
  UpdateLanguageDto,
  UpdatePreferencesDto,
  UpdateProfileDto,
} from '@/libs/users/types';

export async function telegramLogin() {
  /* httpClient.get<UserPrivateProfile>('/users/me') */
  return generateMockUserPrivateProfile();
}

export async function updateProfile(data: UpdateProfileDto) {
  /* httpClient.patch<UserPrivateProfile>(`/users/me`, data) */
  return generateMockUserPrivateProfile();
}

export async function updateLanguage(data: UpdateLanguageDto) {
  /* httpClient.patch<UserPrivateProfile>(`/users/me/language`, data) */
  return generateMockUserPrivateProfile();
}

export async function updateContactLocation(data: UpdateContactLocationDto) {
  /* httpClient.patch<UserPrivateProfile>(`/users/me/contact-location`, data) */
  return generateMockUserPrivateProfile();
}

export async function updateUserPreferences(data: UpdatePreferencesDto) {
  /* httpClient.patch<UserPrivateProfile>(`/users/me/preferences`, data) */
  return generateMockUserPrivateProfile();
}
