import { Skeleton } from '@heroui/skeleton';

export default function App() {
  return (
    <div className="space-y-5 p-4">
      <Skeleton className="rounded-lg">
        <div className="bg-default-300 h-24 rounded-lg" />
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="bg-default-200 h-4 w-3/5 rounded-lg" />
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="bg-default-200 h-4 w-4/5 rounded-lg" />
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="bg-default-300 h-4 w-2/5 rounded-lg" />
        </Skeleton>
      </div>
    </div>
  );
}
