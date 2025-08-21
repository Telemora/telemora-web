export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="mb-6 space-y-2">
      <h1 className="text-default text-xl font-semibold">{title}</h1>
      <p className="text-default text-sm">{subtitle}</p>
    </header>
  );
}
