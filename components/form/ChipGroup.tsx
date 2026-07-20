"use client";

type ChipGroupProps = {
  label: string;
  options: readonly string[];
  hint?: string;
  multi?: boolean;
  value: string | string[] | null;
  onChange: (value: string | string[]) => void;
};

export default function ChipGroup({
  label,
  options,
  hint,
  multi = false,
  value,
  onChange,
}: ChipGroupProps) {
  const isSelected = (option: string) =>
    multi ? (value as string[]).includes(option) : value === option;

  const toggle = (option: string) => {
    if (!multi) {
      onChange(option);
      return;
    }
    const current = value as string[];
    onChange(
      current.includes(option)
        ? current.filter((v) => v !== option)
        : [...current, option],
    );
  };

  return (
    <fieldset>
      <legend className="text-base font-semibold">{label}</legend>
      {hint && <p className="mt-1 text-[13px] text-muted">{hint}</p>}
      <div className="mt-3.5 flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = isSelected(option);
          return (
            <button
              key={option}
              type="button"
              aria-pressed={selected}
              onClick={() => toggle(option)}
              className={`min-h-11 rounded-full border px-4 py-2.5 text-[15px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow ${
                selected
                  ? "border-yellow bg-yellow font-semibold text-navy"
                  : "border-navy-border bg-navy-soft text-offwhite active:border-yellow/60"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
