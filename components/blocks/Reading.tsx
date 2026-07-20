export default function Reading({ text }: { text: string }) {
  return (
    <section aria-label="Leitura do negócio" className="px-6 py-16">
      <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted">
        Onde o tempo escapa
      </p>
      <span
        aria-hidden="true"
        className="mt-6 block text-6xl leading-none text-yellow"
      >
        *
      </span>
      <p className="mt-4 max-w-xl text-[1.55rem] font-light leading-snug text-offwhite">
        {text}
      </p>
    </section>
  );
}
