'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Time } from '@internationalized/date';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  TimeInput,
  useDisclosure,
} from '@heroui/react';
import { useSubmitStoreServiceHoursMutation } from '@/libs/stores/hooks';
import { ServiceHoursDto, SetStoreServiceHoursDto, Weekday } from '@/libs/stores/types';
import { serviceHoursDtoSchema, setStoreServiceHoursSchema } from '@/libs/stores/schemas';
import toast from 'react-hot-toast';
import { useTelegramWebApp } from '@/libs/common/hooks/useTelegramWebApp';
import { PageHeader } from '@/libs/common/components/PageHeader';
import { StoreCreationStepsNav } from '@/libs/stores/components/StoreCreationStepsNav';

export default function ServiceHoursPage() {
  const { webApp, isLoaded } = useTelegramWebApp();
  const router = useRouter();
  const { storeId } = useParams<{ storeId: string }>();
  const { mutateAsync, isPending } = useSubmitStoreServiceHoursMutation(storeId);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [serviceHours, setServiceHours] = useState<ServiceHoursDto[]>([]);
  const [newHour, setNewHour] = useState<ServiceHoursDto>({
    day: Weekday.MONDAY,
    open: '09:00',
    close: '17:00',
    interval: 30,
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const weekdayOptions = Object.values(Weekday).map((day) => ({
    key: day,
    label: day.charAt(0).toUpperCase() + day.slice(1).toLowerCase(),
  }));

  const parseTimeString = (timeStr: string): Time => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return new Time(hours, minutes);
  };

  const formatTimeString = (time: Time): string => {
    return `${time.hour.toString().padStart(2, '0')}:${time.minute.toString().padStart(2, '0')}`;
  };

  const handleAddOrUpdate = () => {
    try {
      serviceHoursDtoSchema.parse(newHour);

      if (serviceHours.some((hour, index) => hour.day === newHour.day && index !== editIndex)) {
        setError('This day already has service hours defined.');
        return;
      }

      if (editIndex !== null) {
        const updatedHours = [...serviceHours];
        updatedHours[editIndex] = newHour;
        setServiceHours(updatedHours);
      } else {
        setServiceHours([...serviceHours, newHour]);
      }
      onOpenChange();
      setNewHour({
        day: Weekday.MONDAY,
        open: '09:00',
        close: '17:00',
        interval: 30,
      });
      setEditIndex(null);
      setError(null);
    } catch (err) {
      setError('Invalid input. Please check the fields.');
    }
  };

  const handleEdit = (index: number) => {
    setNewHour(serviceHours[index]);
    setEditIndex(index);
    onOpen();
  };

  const handleDelete = (index: number) => {
    setServiceHours(serviceHours.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    try {
      const payload: SetStoreServiceHoursDto = { serviceHours };
      setStoreServiceHoursSchema.parse(payload);
      await mutateAsync(payload);
      toast.success('Working hours saved');
      webApp?.HapticFeedback.impactOccurred('light');
      router.push(`/stores/create/${storeId}/logo-upload`);
    } catch (err) {
      setError('Failed to save service hours. Please try again.');
    }
  };

  return (
    <div className="mx-auto max-w-2xl p-5">
      <PageHeader title={editIndex !== null ? 'Edit' : 'Manage' + 'Store Service Hours'} />

      {error && <div className="text-danger-500 mb-3">{error}</div>}

      <div className="mb-5">
        <Button color="primary" onPress={onOpen}>
          Add Service Hours
        </Button>
      </div>

      <div className="mb-5">
        {serviceHours.length === 0 ? (
          <p>No service hours defined.</p>
        ) : (
          <ul className="list-none p-0">
            {serviceHours.map((hour, index) => (
              <li
                key={index}
                className="flex items-center justify-between border-b border-gray-200 p-3"
              >
                <span>
                  {hour.day.charAt(0).toUpperCase() + hour.day.slice(1).toLowerCase()}: {hour.open}{' '}
                  - {hour.close}, Interval: {hour.interval} min
                </span>
                <div className="flex gap-2">
                  <Button color="primary" variant="light" onPress={() => handleEdit(index)}>
                    Edit
                  </Button>
                  <Button color="danger" variant="light" onPress={() => handleDelete(index)}>
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <StoreCreationStepsNav>
        <Button color="primary" onPress={handleSubmit} isDisabled={isPending} className="w-full">
          {isPending ? 'Saving...' : 'Save Service Hours'}
        </Button>
      </StoreCreationStepsNav>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader>
                {editIndex !== null ? 'Edit Service Hours' : 'Add Service Hours'}
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-4">
                  <Select
                    label="Day"
                    selectedKeys={[newHour.day]}
                    onChange={(e) => setNewHour({ ...newHour, day: e.target.value as Weekday })}
                  >
                    {weekdayOptions.map((option) => (
                      <SelectItem key={option.key}>{option.label}</SelectItem>
                    ))}
                  </Select>
                  <TimeInput
                    label="Open Time"
                    value={parseTimeString(newHour.open)}
                    onChange={(time) => {
                      if (!time) return;
                      setNewHour({ ...newHour, open: formatTimeString(time) });
                    }}
                    hourCycle={24}
                    granularity="minute"
                  />
                  <TimeInput
                    label="Close Time"
                    value={parseTimeString(newHour.close)}
                    onChange={(time) => {
                      if (!time) return;
                      setNewHour({ ...newHour, close: formatTimeString(time) });
                    }}
                    hourCycle={24}
                    granularity="minute"
                  />
                  <Input
                    label="Interval (minutes)"
                    type="number"
                    value={newHour.interval.toString()}
                    onChange={(e) =>
                      setNewHour({ ...newHour, interval: parseInt(e.target.value) || 30 })
                    }
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onOpenChange}>
                  Cancel
                </Button>
                <Button color="primary" onPress={handleAddOrUpdate}>
                  {editIndex !== null ? 'Update' : 'Add'}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
