type DetailItemProps = {
  label: string;
  value: string;
};

export default function DetailItem({ label, value }: DetailItemProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
      <dt className="text-sm font-medium text-slate-400">{label}</dt>
      <dd className="mt-2 wrap-break-word text-base font-semibold text-slate-100">
        {value}
      </dd>
    </div>
  );
}
