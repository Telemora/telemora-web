import Image from 'next/image';

interface Props {
  text?: string;
}

export function EmptyState({ text }: Props) {
  return (
    <div className="bg-default-200 border-default-400 my-4 w-full space-y-4 rounded-lg border p-4 text-center">
      <Image
        src="/empty-state.svg"
        width={165}
        height={165}
        alt="empty"
        priority
        className="mx-auto w-1/5 drop-shadow-md"
      />
      <div className="text-default-600 text-sm">{text || 'No items found'}</div>
    </div>
  );
}
