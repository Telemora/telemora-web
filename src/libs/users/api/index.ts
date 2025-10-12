import httpClient from '@/libs/common/utils/httpClient';
import {
  UpdateContactLocationDto,
  UpdateLanguageDto,
  UpdatePreferencesDto,
  UpdateProfileDto,
  UserPrivateProfile,
} from '@/libs/users/types';

export async function telegramLogin() {
  return httpClient.get<UserPrivateProfile>('/users/me');
}

export async function updateProfile(data: UpdateProfileDto) {
  return httpClient.patch<UserPrivateProfile>(`/users/me`, data);
}

export async function updateLanguage(data: UpdateLanguageDto) {
  return httpClient.patch<UserPrivateProfile>(`/users/me/language`, data);
}

export async function updateContactLocation(data: UpdateContactLocationDto) {
  return httpClient.patch<UserPrivateProfile>(`/users/me/contact-location`, data);
}

export async function updateUserPreferences(data: UpdatePreferencesDto) {
  return httpClient.patch<UserPrivateProfile>(`/users/me/preferences`, data);
}
