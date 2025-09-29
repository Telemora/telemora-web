'use client';

import { Button } from '@heroui/button';
import { useTelegramWebApp } from '@/libs/common/hooks/useTelegramWebApp';

export function AddToCardButton() {
  const { webApp } = useTelegramWebApp();

  return (
    <Button
      fullWidth
      size="lg"
      className="mt-4"
      color="primary"
      variant="shadow"
      onPress={() => {
        webApp?.HapticFeedback.impactOccurred('light');
      }}
    >
      Add to Cart
    </Button>
  );
}
