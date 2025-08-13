import { Input } from '@heroui/react';
import { UseFormRegister } from 'react-hook-form';
import { AddressDto, CanonicalLocationType } from '@/libs/location/types';

interface Props {
  reg: UseFormRegister<AddressDto>;
  type: CanonicalLocationType;
}

export function CanonicalLocationForm({ reg, type }: Props) {
  return (
    <div>
      <Input {...reg(`${type}.name`)} label="Name" />
      <Input {...reg('type')} readOnly />
    </div>
  );
}
