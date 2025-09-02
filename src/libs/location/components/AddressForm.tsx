'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import {
  Button,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Switch,
  useDisclosure,
} from '@heroui/react';
import {
  useCitiesByState,
  useCountries,
  useNearestLocation,
  useStatesByCountry,
} from '@/libs/location/hooks';
import { CanonicalLocationForm } from '@/libs/location/components/CanonicalLocationForm';
import { GeoPointForm } from '@/libs/location/components/GeoPointForm';
import { AddressDto, AddressType, CanonicalLocationType } from '@/libs/location/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { createAddressSchema } from '@/libs/location/schemas';
import { useTelegramWebApp } from '@/libs/common/hooks/useTelegramWebApp';
import { StoreCreationStepsNav } from '@/libs/stores/components/StoreCreationStepsNav';

interface Props {
  isPending: boolean;
  onSubmit: (data: AddressDto) => void;
}

export function AddressForm({ isPending, onSubmit }: Props) {
  const { webApp } = useTelegramWebApp();
  const addressForm = useForm<AddressDto>({
    resolver: zodResolver(createAddressSchema),
  });
  const { register, watch, setValue } = addressForm;
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const router = useRouter();

  const countryId = watch('country.id');
  const stateId = watch('state.id');
  const longitude = watch('geoPoint.longitude');
  const latitude = watch('geoPoint.latitude');

  const { data: countries = [], isLoading: loadingCountries } = useCountries();
  const { data: states = [], isLoading: loadingStates } = useStatesByCountry(countryId);
  const { data: cities = [], isLoading: loadingCities } = useCitiesByState(stateId);
  const { data: nearest, isFetching: nearestLoading } = useNearestLocation(latitude, longitude);

  useEffect(() => {
    webApp?.LocationManager.init(() => {
      const isInited = webApp?.LocationManager.isInited;
      const isLocationAvailable = webApp?.LocationManager.isLocationAvailable;
      const isAccessRequested = webApp?.LocationManager.isAccessRequested;
      const isAccessGranted = webApp?.LocationManager.isAccessGranted;

      console.log(
        'isInited?',
        isInited,
        'isLocationAvailable?',
        isLocationAvailable,
        'isAccessRequested?',
        isAccessRequested,
        'isAccessGranted?',
        isAccessGranted,
      );
    });

    onOpen();
  }, [onOpen, webApp, webApp?.LocationManager]);

  const openSettings = () => {
    webApp?.LocationManager.openSettings();
  };

  const detectLocation = async () => {
    webApp?.LocationManager.getLocation((data) => {
      if (!data) {
        openSettings();
      }
      setValue('geoPoint.latitude', data?.latitude);
      setValue('geoPoint.longitude', data?.longitude);
    });
  };

  const onAllowAccess = async () => {
    await detectLocation();
    onClose();
  };

  return (
    <FormProvider {...addressForm}>
      <Form onSubmit={addressForm.handleSubmit(onSubmit)}>
        <Modal
          classNames={{ backdrop: 'bg-black/50' }}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          hideCloseButton
          placement="center"
        >
          <ModalContent>
            <ModalHeader>Location Access</ModalHeader>
            <ModalBody>
              Would you like to allow access to your location to help fill out this form
              automatically?
            </ModalBody>
            <ModalFooter>
              <Button type="button" onPress={onClose}>
                Deny
              </Button>
              <Button type="button" color="primary" onPress={onAllowAccess}>
                Allow
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Input {...register('label')} label="Label" />
        <CanonicalLocationForm data={countries} type={CanonicalLocationType.COUNTRY} />
        <CanonicalLocationForm data={states} type={CanonicalLocationType.STATE} />
        <CanonicalLocationForm data={cities} type={CanonicalLocationType.CITY} />
        <Input {...register('streetLine1')} label="Street Line 1" />
        <Input {...register('streetLine2')} label="Street Line 2" />
        <Input {...register('postalCode')} label="Postal Code" />
        <Select {...register('type')} label="Type">
          {Object.values<string>(AddressType).map((type) => (
            <SelectItem key={type}>{type}</SelectItem>
          ))}
        </Select>
        <GeoPointForm />
        <div className="my-2 flex w-full items-center justify-between">
          <label className="text-xs">Save as Default location</label>
          <Switch {...register('isDefault')} />
        </div>

        {/* Buttons */}
        <StoreCreationStepsNav>
          <Button type="button" onPress={() => router.back()}>
            Back
          </Button>
          <Button type="submit" color="primary" isLoading={isPending}>
            Save & Continue
          </Button>
        </StoreCreationStepsNav>
      </Form>
    </FormProvider>
  );
}
