# Elev × BNI — páginas personalizadas

Aplicação mobile-first que entrega, para cada membro de um encontro do BNI, uma
página própria com 3 oportunidades de automação com IA mapeadas para o negócio
dele. O membro escaneia um QR code no fim da palestra e cai direto na sua página.

A página tem um caminho só e cinco blocos, nesta ordem: reconhecimento, leitura
do negócio, as 3 oportunidades, o formulário de diagnóstico e o rodapé.

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS · Supabase · deploy na Vercel.

## Rotas

| Rota | Função |
|---|---|
| `/m/[slug]` | Página do membro, com conteúdo vindo do Supabase |
| `/interno` | Índice com links de todas as páginas (uso interno, `noindex`) |
| `/` | Fallback com busca por nome ou empresa *(a fazer)* |
| `/convidado` | Página do convidado, com seleção de ramo *(a fazer)* |
| `/admin` | Listagem das submissões, protegida por senha *(a fazer)* |

## Dados

Três tabelas no Supabase:

- `bni_members` — uma linha por membro, com `reading` e exatamente 3
  `opportunities` (garantido por constraint)
- `bni_segments` — mesma estrutura por ramo, para o fluxo de convidado
- `bni_submissions` — respostas do formulário

Leitura de conteúdo é pública via RLS. Escrita de submissões passa só por route
handlers no servidor, com a service key.

## Rodando localmente

```bash
npm install
cp .env.example .env.local   # preencha as variáveis
npm run dev
```

## Variáveis de ambiente

| Variável | Para quê |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Projeto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Leitura pública do conteúdo |
| `SUPABASE_SERVICE_ROLE_KEY` | Gravação das submissões (só no servidor) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Botão de WhatsApp do rodapé |
| `ADMIN_PASSWORD` | Acesso à listagem de submissões |
