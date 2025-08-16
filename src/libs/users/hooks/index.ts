import { useMutation, useQuery } from '@tanstack/react-query';

import {
  telegramLogin,
  updateContactLocation,
  updateLanguage,
  updateProfile,
  updateUserPreferences,
} from '@/libs/users/api';
import {
  UpdateContactLocationDto,
  UpdateLanguageDto,
  UpdatePreferencesDto,
  UpdateProfileDto,
} from '@/libs/users/types';

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
    mutationFn: ({ data }: { data: UpdateProfileDto }) => updateProfile(data),
  });
}

export function useUpdateLanguageMutation() {
  return useMutation({
    mutationFn: ({ data }: { data: UpdateLanguageDto }) => updateLanguage(data),
  });
}

export function useUpdateContactLocationMutation() {
  return useMutation({
    mutationFn: ({ data }: { data: UpdateContactLocationDto }) => updateContactLocation(data),
  });
}

export function useUpdatePreferencesMutation() {
  return useMutation({
    mutationFn: ({ data }: { data: UpdatePreferencesDto }) => updateUserPreferences(data),
  });
}
