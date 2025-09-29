import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/libs/common/api/query-keys';
import {
  getCitiesByState,
  getCountries,
  getNearestLocation,
  getStatesByCountry,
} from '@/libs/location/api';
import { CanonicalLocationDto, NearestLocationResponseDto } from '@/libs/location/types';

export function useCountries() {
  return useQuery<CanonicalLocationDto[]>({
    queryKey: queryKeys.location.countries,
    queryFn: getCountries,
  });
}

export function useStatesByCountry(countryId?: string) {
  return useQuery<CanonicalLocationDto[]>({
    queryKey: queryKeys.location.statesByCountry(countryId!),
    queryFn: () => getStatesByCountry(countryId!),
    enabled: !!countryId,
  });
}

export function useCitiesByState(stateId?: string) {
  return useQuery<CanonicalLocationDto[]>({
    queryKey: queryKeys.location.citiesByState(stateId!),
    queryFn: () => getCitiesByState(stateId!),
    enabled: !!stateId,
  });
}

export function useNearestLocation(lat?: number, lng?: number) {
  return useQuery<NearestLocationResponseDto>({
    queryKey: queryKeys.location.nearest(lat!, lng!),
    queryFn: () => getNearestLocation(lat!, lng!),
    enabled: !!lat && !!lng,
  });
}
