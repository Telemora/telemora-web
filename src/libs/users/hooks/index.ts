import { useMutation, useQuery } from '@tanstack/react-query';

import {
  telegramLogin,
  updateContactLocation,
  updateLanguage,
  updateProfile,
  updateUserPreferences,
} from '@/libs/users/api';
import {
  UpdateContactLocationFormData,
  UpdateLanguageFormData,
  UpdatePreferencesFormData,
  UpdateProfileFormData,
} from '@/libs/users/schemas';

export function useTelegramLoginQuery() {
  return useQuery({
    queryKey: ['me'],
    queryFn: telegramLogin,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
}

export function useUpdateProfileMutation() {
  return useMutation({
    mutationFn: ({ data }: { data: UpdateProfileFormData }) => updateProfile(data),
  });
}

export function useUpdateLanguageMutation() {
  return useMutation({
    mutationFn: ({ data }: { data: UpdateLanguageFormData }) => updateLanguage(data),
  });
}

export function useUpdateContactLocationMutation() {
  return useMutation({
    mutationFn: ({ data }: { data: UpdateContactLocationFormData }) => updateContactLocation(data),
  });
}

export function useUpdatePreferencesMutation() {
  return useMutation({
    mutationFn: ({ data }: { data: UpdatePreferencesFormData }) => updateUserPreferences(data),
  });
}
