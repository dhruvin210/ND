export const site = {
  name: "NextDynamix",
  legalName: "NextDynamix",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.nextdynamix.com",
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000",
  cmsUrl: process.env.NEXT_PUBLIC_CMS_URL ?? "http://localhost:1337",
  tagline:
    "Custom Digital Solutions & Technology Services That Transform Business",
  description:
    "NextDynamix is an AI-first software development and technology consulting company. We design, build, and scale web, mobile, cloud, and AI-powered solutions for forward-thinking companies, from strategy to launch.",
  email: "hello@nextdynamix.com",
  phone: "+1 (555) 123-4567",
  /** TODO: replace with the real Clutch profile URL. */
  clutchUrl: "#",
  address: {
    street: "100 Innovation Drive, Suite 400",
    city: "Austin",
    region: "TX",
    postalCode: "78701",
    country: "US",
  },
  geo: { latitude: 30.2672, longitude: -97.7431 },
  hours: "Mon–Fri 09:00–18:00",
  social: {
    linkedin: "https://www.linkedin.com/company/nextdynamix",
    twitter: "https://twitter.com/nextdynamix",
    facebook: "https://www.facebook.com/nextdynamix",
    github: "https://github.com/nextdynamix",
  },
} as const;
