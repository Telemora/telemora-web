import { faker } from '@faker-js/faker';

import { AddressDto, CanonicalLocationDto } from '../types';

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
    id: faker.number.int(),
    label: 'Home',
    country: generateMockCanonicalLocation('country'),
    state: generateMockCanonicalLocation('state'),
    city: generateMockCanonicalLocation('city'),
    streetLine1: faker.location.streetAddress(),
    streetLine2: faker.location.secondaryAddress(),
    postalCode: faker.location.zipCode(),
    latitude: Number(faker.location.latitude()),
    longitude: Number(faker.location.longitude()),
    type: 'shipping',
    isDefault: true,
    createdAt: faker.date.past(),
  };
}

export const generateMockCountries = (): CanonicalLocationDto[] => {
  return Array.from({ length: 5 }, () => generateMockCanonicalLocation('country'));
};

export const generateMockStates = (): CanonicalLocationDto[] => {
  return Array.from({ length: 5 }, () => generateMockCanonicalLocation('state'));
};

export const generateMockCities = (): CanonicalLocationDto[] => {
  return Array.from({ length: 5 }, () => generateMockCanonicalLocation('city'));
};
