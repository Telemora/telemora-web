import { PaymentStatus } from '@/libs/payments/types';
import { Chip } from '@heroui/chip';

type ChipColor = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';

const PAYMENT_STATUS_CONFIG: Record<PaymentStatus, { color: ChipColor; label: string }> = {
  [PaymentStatus.PENDING]: { color: 'default', label: 'Pending' },
  [PaymentStatus.PROCESSING]: { color: 'primary', label: 'Processing' },
  [PaymentStatus.COMPLETED]: { color: 'success', label: 'Completed' },
  [PaymentStatus.REFUNDED]: { color: 'danger', label: 'Refunded' },
  [PaymentStatus.FAILED]: { color: 'danger', label: 'Failed' },
};

const DEFAULT_STATUS_CONFIG = { color: 'default', label: 'Unknown' };

export const getPaymentStatusConfig = (status: PaymentStatus) => {
  return PAYMENT_STATUS_CONFIG[status] || DEFAULT_STATUS_CONFIG;
};

export function PaymentStatusChip({ status }: { status: PaymentStatus }) {
  const { color, label } = getPaymentStatusConfig(status);

  return (
    <Chip color={color} size="sm">
      {label}
    </Chip>
  );
}
