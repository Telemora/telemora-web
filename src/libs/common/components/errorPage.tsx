'use client';

import { Button } from '@heroui/react';
import Image from 'next/image';
import { useEffect } from 'react';
import { FaUndo } from 'react-icons/fa';
import { useTranslations } from 'next-intl';

export default function ErrorPage({
  error,
  reset,
}: {
  error?: Error & { digest?: string };
  reset?: () => void;
}) {
  const tError = useTranslations('error');
  const tCommon = useTranslations('common');

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-y-4 text-center">
      <Image src="/server-error.webp" alt="failed to load" priority width={160} height={160} />
      <h3>{tError('generic')}</h3>
      {reset && (
        <Button variant="shadow" onPress={reset}>
          <FaUndo />
          {tCommon('retry')}
        </Button>
      )}
    </div>
  );
}
