import { DIAGNOSIS_PROMISE } from "@/lib/constants";

export default function SuccessCard({ firstName }: { firstName?: string }) {
  return (
    <div className="step-in rounded-2xl border border-navy-border bg-navy-soft p-8">
      <span aria-hidden="true" className="block text-5xl leading-none text-yellow">
        *
      </span>
      <h2 className="mt-4 text-2xl font-extrabold leading-tight tracking-tight">
        {firstName ? `Recebido, ${firstName}.` : "Recebido."}
      </h2>
      <p className="mt-3 max-w-sm text-base leading-relaxed text-offwhite/85">
        A Elev vai estudar o que você contou. {DIAGNOSIS_PROMISE}
      </p>
    </div>
  );
}
