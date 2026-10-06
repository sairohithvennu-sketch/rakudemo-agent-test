interface Props {
  label: string;
  value: string;
  hint?: string;
  testId?: string;
}

export default function StatCard({ label, value, hint, testId }: Props) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-card ring-1 ring-slate-100">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p data-testid={testId} className="mt-1 text-2xl font-bold text-slate-900">
        {value}
      </p>
      {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
    </div>
  );
}
