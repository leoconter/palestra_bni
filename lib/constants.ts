// Opções dos chips do formulário. Os values são gravados como texto no banco
// para o diagnóstico ler sem tabela de lookup.

export const PAIN_OTHER = "Outra coisa";

export const FREQUENCY_OPTIONS = [
  "Várias vezes ao dia",
  "Diariamente",
  "Algumas vezes por semana",
  "Semanal",
  "Mensal",
] as const;

export const TIME_OPTIONS = [
  "Até 10min",
  "10–30min",
  "30min–1h",
  "1–3h",
  "Mais de 3h",
] as const;

export const AI_USAGE_OPTIONS = [
  "Não usamos",
  "Cada um usa por conta própria",
  "Usamos em uma área específica",
  "Temos IA integrada no processo",
] as const;

// A partir de qual opção o campo "Em quê?" é revelado
export const AI_USAGE_DETAIL_TRIGGERS: string[] = [
  "Usamos em uma área específica",
  "Temos IA integrada no processo",
];

export const AUTOMATION_HISTORY_OPTIONS = [
  "Nunca tentamos",
  "Tentamos e não saiu do papel",
  "Tentamos e não deu resultado",
  "Sim, e funciona bem",
] as const;

export const OUTCOME_OPTIONS = [
  "Tempo do time",
  "Atender mais sem contratar",
  "Menos erro/retrabalho",
  "Responder mais rápido",
  "Reduzir custo",
] as const;

export const DIAGNOSIS_PROMISE =
  "Você recebe o diagnóstico da Elev em até 48h, direto no seu WhatsApp.";

export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
