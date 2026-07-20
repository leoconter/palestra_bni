import Image from "next/image";

function Wordmark() {
  return (
    <Image
      src="/brand/logo-horizontal-claro.png"
      alt="Elev"
      width={350}
      height={180}
      priority
      className="h-7 w-auto"
    />
  );
}

type HeroProps = {
  greeting: string; // "Renata, esta página é sua." | "Esta página é sua."
  headline: string; // nome da empresa ou rótulo do ramo
  footnote: string; // resolve o asterisco do headline
};

export default function Hero({ greeting, headline, footnote }: HeroProps) {
  // O asterisco-expoente precisa ficar colado na última palavra do nome —
  // sozinho numa linha ele deixa de ler como nota de rodapé.
  const words = headline.split(" ");
  const lastWord = words.pop();

  // Nomes longos precisam encolher para a primeira dobra não estourar em 360px.
  const size =
    headline.length > 26
      ? "clamp(1.85rem, 7vw, 3.2rem)"
      : headline.length > 20
        ? "clamp(2.1rem, 8.5vw, 3.8rem)"
        : "clamp(2.4rem, 10.5vw, 4.5rem)";

  return (
    <header className="flex min-h-dvh flex-col px-6 pb-6 pt-5">
      <div className="rise flex items-center justify-between">
        <Wordmark />
        <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted">
          Encontro BNI
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-center py-10">
        <p className="rise rise-1 text-base font-light text-muted">{greeting}</p>
        <h1
          style={{ fontSize: size }}
          className="rise rise-2 mt-3 font-extrabold uppercase leading-[0.95] tracking-tight"
        >
          {words.join(" ")}{words.length > 0 ? " " : ""}
          <span className="whitespace-nowrap">
            {lastWord}
            <sup className="text-[0.55em] text-yellow">*</sup>
          </span>
        </h1>
        <p className="rise rise-3 mt-7 max-w-md text-lg leading-relaxed">
          3 tarefas que a IA pode assumir aí dentro.{" "}
          <span className="font-bold text-yellow">Leitura de 40 segundos.</span>
        </p>
      </div>

      <div className="rise rise-4">
        <p className="max-w-xs text-[13px] leading-snug text-muted">
          <span className="text-yellow">*</span> {footnote}
        </p>
        <div className="cue mt-6 text-muted" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </header>
  );
}
