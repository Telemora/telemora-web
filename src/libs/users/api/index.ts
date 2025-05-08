import { isDev } from '@/libs/common/utils';
import httpClient from '@/libs/common/utils/http-client';
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

export async function updateProfile(telegramId: number | string, data: UpdateProfileDto) {
  return isDev
    ? generateMockUserPrivateProfile()
    : httpClient.patch<UserPrivateProfile>(`/users/profile/${telegramId}`, data);
}

export async function updateLanguage(telegramId: number | string, data: UpdateLanguageDto) {
  return isDev
    ? generateMockUserPrivateProfile()
    : httpClient.patch<UserPrivateProfile>(`/users/language/${telegramId}`, data);
}

export async function updateContactLocation(
  telegramId: number | string,
  data: UpdateContactLocationDto,
) {
  return isDev
    ? generateMockUserPrivateProfile()
    : httpClient.patch<UserPrivateProfile>(`/users/contact-location/${telegramId}`, data);
}

export async function updateUserPreferences(telegramId: number | string, data: UpdatePreferencesDto) {
  return isDev
    ? generateMockUserPrivateProfile()
    : httpClient.patch<UserPrivateProfile>(`/users/preferences/${telegramId}`, data);
}
