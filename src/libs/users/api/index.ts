import { generateMockUserPrivateProfile } from '@/libs/users/mocks';
import {
  UpdateContactLocationDto,
  UpdateLanguageDto,
  UpdatePreferencesDto,
  UpdateProfileDto,
} from '@/libs/users/types';

export async function telegramLogin() {
  return generateMockUserPrivateProfile();
}

export async function updateProfile(data: UpdateProfileDto) {
  return generateMockUserPrivateProfile();
}

export async function updateLanguage(data: UpdateLanguageDto) {
  return generateMockUserPrivateProfile();
}

export async function updateContactLocation(data: UpdateContactLocationDto) {
  return generateMockUserPrivateProfile();
}

export async function updateUserPreferences(data: UpdatePreferencesDto) {
  return generateMockUserPrivateProfile();
}
