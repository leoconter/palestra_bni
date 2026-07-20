const DEFAULT_STEPS = ["A dor", "Como funciona", "Contexto"];

export default function StepIndicator({
  current,
  steps = DEFAULT_STEPS,
}: {
  current: number;
  steps?: string[];
}) {
  return (
    <ol className="flex items-center gap-2" aria-label={`Passo ${current} de 3`}>
      {steps.map((label, i) => {
        const reached = i + 1 <= current;
        return (
          <li key={label} className="flex flex-1 flex-col gap-1.5">
            <span
              className={`h-1 rounded-full transition-colors duration-300 ${reached ? "bg-yellow" : "bg-navy-border"}`}
            />
            <span
              className={`text-[11px] font-medium ${i + 1 === current ? "text-offwhite" : "text-muted"}`}
            >
              {label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
