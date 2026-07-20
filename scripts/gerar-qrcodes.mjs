// Gera um QR code por página: 52 membros + a página do convidado.
//
//   node scripts/gerar-qrcodes.mjs
//   node scripts/gerar-qrcodes.mjs https://outro-dominio.com.br
//
// Saída em qrcodes/: SVG (vetor, para a gráfica), PNG 1200px e uma folha de
// contato em HTML para conferir e imprimir.
import { mkdirSync, writeFileSync, readFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import QRCode from "qrcode";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const base = (process.argv[2] ?? "https://palestra-bni.vercel.app").replace(
  /\/+$/,
  "",
);

// Navy da marca em vez de preto puro: contraste praticamente igual, e a leitura
// não sofre. Correção de erro alta para tolerar impressão e reflexo de mesa.
const OPCOES = {
  errorCorrectionLevel: "H",
  margin: 3,
  color: { dark: "#030C31", light: "#FFFFFF" },
};

const env = Object.fromEntries(
  readFileSync(resolve(root, ".env.local"), "utf8")
    .split("\n")
    .filter((l) => l.includes("=") && !l.trim().startsWith("#"))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    }),
);

const res = await fetch(
  `${env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/bni_members?select=slug,person_name,company_name&order=company_name`,
  { headers: { apikey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY } },
);

const alvos = [
  ...(await res.json()).map((m) => ({
    arquivo: m.slug,
    url: `${base}/m/${m.slug}`,
    titulo: m.company_name,
    subtitulo: m.person_name,
  })),
  {
    arquivo: "convidado",
    url: `${base}/convidado`,
    titulo: "Convidados",
    subtitulo: "Quem não é membro",
  },
];

mkdirSync(resolve(root, "qrcodes/svg"), { recursive: true });
mkdirSync(resolve(root, "qrcodes/png"), { recursive: true });

const cartoes = [];
for (const alvo of alvos) {
  const svg = await QRCode.toString(alvo.url, { ...OPCOES, type: "svg" });
  writeFileSync(resolve(root, `qrcodes/svg/${alvo.arquivo}.svg`), svg);

  const png = await QRCode.toBuffer(alvo.url, { ...OPCOES, width: 1200 });
  writeFileSync(resolve(root, `qrcodes/png/${alvo.arquivo}.png`), png);

  cartoes.push(
    `    <figure>
      <img src="png/${alvo.arquivo}.png" alt="QR code de ${alvo.titulo}">
      <figcaption>
        <strong>${alvo.titulo}</strong>
        <span>${alvo.subtitulo}</span>
        <code>/${alvo.arquivo === "convidado" ? "convidado" : `m/${alvo.arquivo}`}</code>
      </figcaption>
    </figure>`,
  );
}

writeFileSync(
  resolve(root, "qrcodes/folha-de-contato.html"),
  `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<title>QR codes — Elev × BNI</title>
<style>
  @page { size: A4; margin: 12mm; }
  body { font-family: Inter, system-ui, sans-serif; color: #111; margin: 0; padding: 24px; }
  h1 { font-size: 20px; margin: 0 0 4px; }
  p.info { font-size: 12px; color: #555; margin: 0 0 24px; }
  .grade { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
  figure { margin: 0; padding: 10px; border: 1px solid #ddd; border-radius: 8px;
           text-align: center; break-inside: avoid; }
  img { width: 100%; height: auto; display: block; }
  figcaption { margin-top: 6px; font-size: 11px; line-height: 1.35; }
  figcaption strong { display: block; font-size: 12px; }
  figcaption span { display: block; color: #555; }
  figcaption code { display: block; color: #888; font-size: 10px; margin-top: 2px; }
  @media print { body { padding: 0; } p.info { margin-bottom: 12px; } }
</style>
</head>
<body>
  <h1>QR codes — Elev × BNI</h1>
  <p class="info">${alvos.length} códigos apontando para <strong>${base}</strong>. Confira um por amostragem antes de imprimir: se o domínio mudar, todos precisam ser gerados de novo.</p>
  <div class="grade">
${cartoes.join("\n")}
  </div>
</body>
</html>
`,
);

console.log(`${alvos.length} QR codes gerados em qrcodes/ apontando para ${base}`);
