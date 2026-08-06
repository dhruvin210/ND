export interface TechCategory {
  name: string;
  technologies: string[];
}

export const techStack: TechCategory[] = [
  {
    name: "Frontend",
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
    ],
  },
  {
    name: "Backend",
    technologies: ["Python", "FastAPI", "Node.js", "PostgreSQL", "Redis"],
  },
  {
    name: "Cloud",
    technologies: ["AWS", "Vercel", "Cloudflare", "Docker", "Kubernetes"],
  },
  {
    name: "AI",
    technologies: [
      "OpenAI",
      "Anthropic",
      "Gemini",
      "LangGraph",
      "LlamaIndex",
      "pgvector",
    ],
  },
  {
    name: "Data",
    technologies: ["Airflow", "dbt", "Snowflake", "Kafka", "Spark"],
  },
];
