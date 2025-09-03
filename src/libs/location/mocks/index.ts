import { faker } from '@faker-js/faker';

import {
  AddressDto,
  AddressType,
  CanonicalLocationDto,
  CanonicalLocationType,
  NearestLocationResponseDto,
} from '../types';

function generateMockCanonicalLocation(type: CanonicalLocationDto['type']): CanonicalLocationDto {
  return {
    id: faker.number.int(),
    name:
      type === 'city'
        ? faker.location.city()
        : type === 'state'
          ? faker.location.state()
          : faker.location.country(),
    type,
    parentId: faker.number.int(),
    postalCode: faker.location.zipCode(),
    latitude: Number(faker.location.latitude()),
    longitude: Number(faker.location.longitude()),
  };
}

export function generateMockAddress(): AddressDto {
  return {
    geoPoint: {
      latitude: Number(faker.location.latitude()),
      longitude: Number(faker.location.longitude()),
    },
    id: faker.number.int(),
    label: 'Home',
    country: generateMockCanonicalLocation(CanonicalLocationType.COUNTRY),
    state: generateMockCanonicalLocation(CanonicalLocationType.STATE),
    city: generateMockCanonicalLocation(CanonicalLocationType.CITY),
    streetLine1: faker.location.streetAddress(),
    streetLine2: faker.location.secondaryAddress(),
    postalCode: faker.location.zipCode(),
    type: AddressType.SHIPPING,
    isDefault: true,
  };
}

export const generateMockCountries = (): CanonicalLocationDto[] => {
  return Array.from({ length: 5 }, () =>
    generateMockCanonicalLocation(CanonicalLocationType.COUNTRY),
  );
};

export const generateMockStates = (): CanonicalLocationDto[] => {
  return Array.from({ length: 5 }, () =>
    generateMockCanonicalLocation(CanonicalLocationType.STATE),
  );
};

export const generateMockCities = (): CanonicalLocationDto[] => {
  return Array.from({ length: 5 }, () => generateMockCanonicalLocation(CanonicalLocationType.CITY));
};

export const generateMockNearestLocation = (): NearestLocationResponseDto => {
  return {
    country: generateMockCanonicalLocation(CanonicalLocationType.COUNTRY),
    state: generateMockCanonicalLocation(CanonicalLocationType.STATE),
    city: generateMockCanonicalLocation(CanonicalLocationType.CITY),
  };
};
