export interface N8nStatus {
  online: boolean;
  statusCode?: number;
  latencyMs?: number;
  endpoint: string;
  formTitle: string;
  lastChecked: string;
  error?: string;
}

export interface SubmissionResult {
  success: boolean;
  message: string;
  submissionId?: string;
  details?: {
    name: string;
    email: string;
    targetRole?: string;
    experienceLevel?: string;
    filesUploaded: Array<{
      name: string;
      sizeBytes: number;
      mimeType: string;
    }>;
  };
  error?: string;
}

export interface SampleReport {
  candidateName: string;
  role: string;
  overallScore: number;
  atsScore: number;
  impactScore: number;
  keywordScore: number;
  brevityScore: number;
  summary: string;
  keyStrengths: string[];
  criticalFixes: string[];
  matchedKeywords: string[];
  missingKeywords: string[];
  bulletRewrites: Array<{
    original: string;
    improved: string;
    reason: string;
  }>;
}
