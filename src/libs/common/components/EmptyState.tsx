import Image from 'next/image';

interface Props {
  text?: string;
}

export function EmptyState({ props }: { props?: Props }) {
  return (
    <div className="bg-default-200 text-default-800 border-default-400 my-4 space-y-4 rounded-lg border p-4 text-center">
      <Image
        src="/empty-state.svg"
        width={165}
        height={165}
        alt="empty"
        className="mx-auto w-1/4 drop-shadow-md"
      />
      <div className="text-sm">{props?.text || 'No items found'}</div>
    </div>
  );
}
