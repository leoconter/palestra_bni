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

export type Submission = {
  id: string;
  member_id: string | null;
  segment_id: string | null;
  visitor_name: string | null;
  step_reached: 1 | 2 | 3;
  // Etapa 1
  pain_choice: string;
  pain_description: string | null;
  // Etapa 2
  frequency: string | null;
  time_per_occurrence: string | null;
  // Etapa 3
  ai_usage: string | null;
  ai_usage_detail: string | null;
  automation_history: string | null;
  expected_outcome: string | null;
  created_at: string;
  updated_at: string;
};
