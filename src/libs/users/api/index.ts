import { generateMockUserPrivateProfile } from '@/libs/users/mocks';
import {
  UpdateContactLocationDto,
  UpdateLanguageDto,
  UpdatePreferencesDto,
  UpdateProfileDto,
} from '@/libs/users/types';

export async function telegramLogin() {
  /* httpClient.get<UserPrivateProfile>('/users/login') */
  return generateMockUserPrivateProfile();
}

export async function updateProfile(data: UpdateProfileDto) {
  /* httpClient.patch<UserPrivateProfile>(`/users/profile`, data) */
  return generateMockUserPrivateProfile();
}

export async function updateLanguage(data: UpdateLanguageDto) {
  /* httpClient.patch<UserPrivateProfile>(`/users/language`, data) */
  return generateMockUserPrivateProfile();
}

export async function updateContactLocation(data: UpdateContactLocationDto) {
  /* httpClient.patch<UserPrivateProfile>(`/users/contact-location`, data) */
  return generateMockUserPrivateProfile();
}

export async function updateUserPreferences(data: UpdatePreferencesDto) {
  /* httpClient.patch<UserPrivateProfile>(`/users/preferences`, data) */
  return generateMockUserPrivateProfile();
}
