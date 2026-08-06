export interface Client {
  name: string;
  /** Optional logo path under /public/images/clients — falls back to wordmark. */
  logo?: string;
}

export const clients: Client[] = [
  { name: "TechVentures" },
  { name: "DataFlow" },
  { name: "Enterprise Solutions" },
  { name: "CloudScale" },
  { name: "Innovation Labs" },
  { name: "Digital First" },
  { name: "NextGen Systems" },
  { name: "Smart Industries" },
];

export interface Certification {
  name: string;
  description: string;
}

export const certifications: Certification[] = [
  { name: "AWS Partner", description: "Amazon Web Services Partner Network" },
  { name: "Microsoft Partner", description: "Microsoft Cloud Partner Program" },
  { name: "Google Cloud Partner", description: "Google Cloud Partner Advantage" },
  { name: "OpenAI", description: "Building on the OpenAI platform" },
  { name: "Anthropic", description: "Building with Claude" },
  { name: "Clutch Top Agency 2025", description: "Top B2B development company" },
  { name: "SSL Secured", description: "End-to-end encryption" },
  { name: "GDPR Compliant", description: "EU data protection compliant" },
];
