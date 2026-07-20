export type Opportunity = {
  title: string;
  today: string;
  with_ai: string;
  gain: string;
};

export type Member = {
  id: string;
  slug: string;
  person_name: string;
  company_name: string;
  reading: string;
  opportunities: [Opportunity, Opportunity, Opportunity];
};

export type Segment = {
  id: string;
  slug: string;
  label: string;
  reading: string;
  opportunities: [Opportunity, Opportunity, Opportunity];
};

// Respostas do formulário. Membro chega identificado pelo slug; convidado se
// identifica nos campos visitor_*.
export type DiagnosticAnswers = {
  painChoice: string;
  painDescription: string;
  frequency: string | null;
  timePer: string | null;
  aiUsage: string | null;
  aiUsageDetail: string;
  automationHistory: string | null;
  outcome: string | null;
  visitorName: string;
  visitorCompany: string;
  visitorWhatsapp: string;
};

export const emptyAnswers: DiagnosticAnswers = {
  painChoice: "",
  painDescription: "",
  frequency: null,
  timePer: null,
  aiUsage: null,
  aiUsageDetail: "",
  automationHistory: null,
  outcome: null,
  visitorName: "",
  visitorCompany: "",
  visitorWhatsapp: "",
};

export type Submission = {
  id: string;
  member_id: string | null;
  segment_id: string | null;
  visitor_name: string | null;
  visitor_company: string | null;
  visitor_whatsapp: string | null;
  step_reached: 1 | 2 | 3;
  pain_choice: string;
  pain_description: string | null;
  frequency: string | null;
  time_per_occurrence: string | null;
  ai_usage: string | null;
  ai_usage_detail: string | null;
  automation_history: string | null;
  expected_outcome: string | null;
  created_at: string;
  updated_at: string;
};
