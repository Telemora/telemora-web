import { isDev } from '@/libs/common/utils';
import httpClient from '@/libs/common/utils/httpClient';
import { generateMockUserPrivateProfile } from '@/libs/users/mocks';
import {
  UpdateContactLocationDto,
  UpdateLanguageDto,
  UpdatePreferencesDto,
  UpdateProfileDto,
  UserPrivateProfile,
} from '@/libs/users/types';

export async function telegramLogin() {
  return isDev
    ? generateMockUserPrivateProfile()
    : httpClient.get<UserPrivateProfile>('/users/login');
}

export async function updateProfile(data: UpdateProfileDto) {
  return isDev
    ? generateMockUserPrivateProfile()
    : httpClient.patch<UserPrivateProfile>(`/users/profile`, data);
}

export async function updateLanguage(data: UpdateLanguageDto) {
  return isDev
    ? generateMockUserPrivateProfile()
    : httpClient.patch<UserPrivateProfile>(`/users/language`, data);
}

export async function updateContactLocation(data: UpdateContactLocationDto) {
  return isDev
    ? generateMockUserPrivateProfile()
    : httpClient.patch<UserPrivateProfile>(`/users/contact-location`, data);
}

export async function updateUserPreferences(data: UpdatePreferencesDto) {
  return isDev
    ? generateMockUserPrivateProfile()
    : httpClient.patch<UserPrivateProfile>(`/users/preferences`, data);
}
