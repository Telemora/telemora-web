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
  const addressForm = useForm<AddressDto>({
    resolver: zodResolver(createAddressSchema),
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { register, watch, setValue } = addressForm;

  const { webApp, isLoaded } = useTelegramWebApp();
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
    webApp?.LocationManager.init();

    webApp?.onEvent('locationRequested', (e) => {
      console.log('logger event in code:', e);
    });
    webApp?.onEvent('locationManagerUpdated', (e) => {
      console.log('logger event in code:', e);
    });
  }, [webApp, webApp?.LocationManager]);

  if (!webApp) {
    return null;
  }

  const openSettings = () => {
    webApp.LocationManager.openSettings();
  };

  const detectLocation = async () => {
    webApp.LocationManager.getLocation((data) => {
      setValue('geoPoint.latitude', data?.latitude);
      setValue('geoPoint.longitude', data?.longitude);
    });
  };

  return (
    <FormProvider {...addressForm}>
      <Form onSubmit={addressForm.handleSubmit(onSubmit)}>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
          <ModalContent>
            <ModalBody>
              Would you like to allow access to your location to help fill out this form
              automatically?
            </ModalBody>
            <ModalFooter>
              <Button type="button" color="primary" onPress={detectLocation}>
                Allow
              </Button>
              <Button type="button" color="danger" onPress={onOpen}>
                Deny
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
