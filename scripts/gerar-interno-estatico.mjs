// Gera docs/index.html — versão estática do índice de páginas, publicada no
// GitHub Pages. Rode de novo sempre que a lista de membros mudar:
//   node scripts/gerar-interno-estatico.mjs
import { mkdirSync, writeFileSync, readFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const BASE_PADRAO = "https://bni.elev.ag";

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
const members = await res.json();

const escape = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
  );

const rows = members
  .map(
    (m) => `      <li class="row" data-busca="${escape(
      `${m.company_name} ${m.person_name} ${m.slug}`,
    )}">
        <div class="info">
          <a class="empresa" href="/m/${escape(m.slug)}" data-slug="${escape(m.slug)}">${escape(m.company_name)}</a>
          <p class="pessoa">${escape(m.person_name)} · /m/${escape(m.slug)}</p>
        </div>
        <button class="copiar" type="button" data-slug="${escape(m.slug)}">copiar</button>
      </li>`,
  )
  .join("\n");

const html = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Páginas dos membros | Elev × BNI</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap" rel="stylesheet">
<style>
  :root { --navy:#030C31; --soft:#0A1642; --border:#1C2A5E; --yellow:#FFD434; --off:#EFEFEF; --muted:#9AA3C0; }
  * { box-sizing:border-box; margin:0; padding:0; }
  body { background:var(--navy); color:var(--off); font-family:Inter,system-ui,sans-serif; -webkit-font-smoothing:antialiased; }
  .wrap { max-width:720px; margin:0 auto; padding:24px 24px 64px; }
  .topo { display:flex; align-items:center; justify-content:space-between; }
  .marca { font-size:18px; font-weight:800; letter-spacing:-.02em; }
  .marca span { color:var(--yellow); }
  .tag { font-size:11px; letter-spacing:.22em; text-transform:uppercase; color:var(--muted); }
  h1 { margin-top:32px; font-size:30px; font-weight:800; letter-spacing:-.02em; line-height:1.1; }
  h1 span { color:var(--yellow); }
  .sub { margin-top:8px; font-size:14px; line-height:1.6; color:var(--muted); }
  .campo { width:100%; border:1px solid var(--border); background:var(--soft); color:var(--off);
           border-radius:12px; padding:12px 16px; font:inherit; font-size:16px; }
  .campo::placeholder { color:rgba(154,163,192,.7); }
  .campo:focus { outline:none; border-color:rgba(255,212,52,.6); }
  .dominio { margin-top:24px; border:1px solid var(--border); background:var(--soft); border-radius:12px; padding:16px; }
  .dominio label { display:block; font-size:13px; font-weight:600; margin-bottom:8px; }
  .dominio .ajuda { margin-top:8px; font-size:12px; line-height:1.5; color:var(--muted); }
  .barra { position:sticky; top:0; z-index:5; background:rgba(3,12,49,.96); backdrop-filter:blur(8px);
           border-bottom:1px solid var(--border); padding:12px 0 16px; margin-top:24px; }
  .contagem { margin-top:8px; font-size:13px; color:var(--muted); }
  ul { list-style:none; }
  .row { display:flex; align-items:center; gap:12px; padding:14px 0; border-bottom:1px solid var(--border); }
  .info { min-width:0; flex:1; }
  .empresa { color:var(--off); font-weight:600; text-decoration:none; display:block; }
  .empresa:hover { color:var(--yellow); }
  .pessoa { font-size:13px; line-height:1.4; color:var(--muted); margin-top:2px; }
  .copiar { flex-shrink:0; min-height:44px; padding:0 14px; border-radius:999px; border:1px solid var(--border);
            background:none; color:var(--muted); font:inherit; font-size:13px; cursor:pointer; }
  .copiar:hover { border-color:rgba(255,212,52,.5); color:var(--off); }
  .vazio { padding:48px 0; text-align:center; font-size:14px; color:var(--muted); }
  .oculto { display:none; }
</style>
</head>
<body>
<div class="wrap">
  <div class="topo">
    <span class="marca">ELEV<span>*</span></span>
    <span class="tag">Uso interno</span>
  </div>

  <h1>Páginas dos membros<span>*</span></h1>
  <p class="sub">Uma página por membro. Toque no nome para abrir, ou copie o link para gerar o QR code.</p>

  <div class="dominio">
    <label for="base">Domínio do site</label>
    <input class="campo" id="base" type="url" placeholder="https://seusite.com.br" autocomplete="off">
    <p class="ajuda">Vale para todos os links e para o botão copiar. Fica salvo neste navegador — troque aqui quando houver domínio próprio.</p>
  </div>

  <div class="barra">
    <label class="oculto" for="busca">Buscar</label>
    <input class="campo" id="busca" type="search" placeholder="Buscar por nome, empresa ou slug" autocomplete="off">
    <p class="contagem" id="contagem"></p>
  </div>

  <ul id="lista">
${rows}
  </ul>
  <p class="vazio oculto" id="vazio">Nenhuma página encontrada.</p>
</div>

<script>
  var norm = function (v) { return v.normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').toLowerCase(); };
  var linhas = Array.prototype.slice.call(document.querySelectorAll('.row'));
  var busca = document.getElementById('busca');
  var contagem = document.getElementById('contagem');
  var vazio = document.getElementById('vazio');
  var base = document.getElementById('base');

  function limpaBase(v) { return (v || '').trim().replace(/\\/+$/, ''); }

  function aplicaBase() {
    var b = limpaBase(base.value);
    localStorage.setItem('elevBase', b);
    linhas.forEach(function (li) {
      var a = li.querySelector('.empresa');
      a.href = (b || '') + '/m/' + a.dataset.slug;
      a.target = b ? '_blank' : '';
      a.rel = b ? 'noopener noreferrer' : '';
    });
  }

  function filtra() {
    var q = norm(busca.value.trim());
    var visiveis = 0;
    linhas.forEach(function (li) {
      var mostra = !q || norm(li.dataset.busca).indexOf(q) !== -1;
      li.classList.toggle('oculto', !mostra);
      if (mostra) visiveis++;
    });
    contagem.textContent = visiveis + (visiveis === 1 ? ' página' : ' páginas') +
      (q ? ' de ' + linhas.length : '');
    vazio.classList.toggle('oculto', visiveis > 0);
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.copiar');
    if (!btn) return;
    var b = limpaBase(base.value) || window.location.origin;
    navigator.clipboard.writeText(b + '/m/' + btn.dataset.slug).then(function () {
      btn.textContent = 'copiado';
      setTimeout(function () { btn.textContent = 'copiar'; }, 1600);
    });
  });

  base.value = localStorage.getItem('elevBase') || '${BASE_PADRAO}';
  base.addEventListener('input', aplicaBase);
  busca.addEventListener('input', filtra);
  aplicaBase();
  filtra();
</script>
</body>
</html>
`;

mkdirSync(resolve(root, "docs"), { recursive: true });
writeFileSync(resolve(root, "docs/index.html"), html);
writeFileSync(resolve(root, "docs/.nojekyll"), "");
writeFileSync(
  resolve(root, "docs/robots.txt"),
  "User-agent: *\nDisallow: /\n",
);
console.log(`docs/index.html gerado com ${members.length} páginas`);
