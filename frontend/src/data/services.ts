import {
  ShieldCheck,
  Sparkles,
  Cloud,
  Code2,
  ShoppingCart,
  Smartphone,
  Megaphone,
  Palette,
  type LucideIcon,
} from "lucide-react";

export type ServiceCategory =
  | "Cyber Security"
  | "Generative AI"
  | "Cloud Services"
  | "Web Development"
  | "CMS & Ecommerce"
  | "App Development"
  | "Digital Marketing"
  | "Designing";

export interface ServiceItem {
  slug: string;
  title: string;
  category: ServiceCategory;
  description: string;
  icon: LucideIcon;
}

export const categoryIcons: Record<ServiceCategory, LucideIcon> = {
  "Cyber Security": ShieldCheck,
  "Generative AI": Sparkles,
  "Cloud Services": Cloud,
  "Web Development": Code2,
  "CMS & Ecommerce": ShoppingCart,
  "App Development": Smartphone,
  "Digital Marketing": Megaphone,
  Designing: Palette,
};

/** Positioning copy for each discipline — used by the catalog and mega menu. */
export const categoryBlurbs: Record<ServiceCategory, string> = {
  "Cyber Security":
    "Perimeter to endpoint to cloud — defence that is designed, deployed, and monitored, not just bought.",
  "Generative AI":
    "From where AI actually pays off to the system running in production behind it.",
  "Cloud Services":
    "Architecture, migration, and day-two operations across the three major clouds.",
  "Web Development":
    "Server-rendered, accessible, fast — built on the stack your team can maintain.",
  "CMS & Ecommerce":
    "Storefronts and content platforms your marketing team can run without a developer.",
  "App Development":
    "Native and cross-platform apps shipped to both stores from one delivery team.",
  "Digital Marketing":
    "Demand generation measured against pipeline, not impressions.",
  Designing:
    "Identity and interface work grounded in research, delivered as a usable system.",
};

const rawServices: Omit<ServiceItem, "icon">[] = [
  // Cyber Security
  { slug: "firewalls-solutions", title: "Firewalls Solutions", category: "Cyber Security", description: "Perimeter and network firewall design, deployment, and management." },
  { slug: "security-proxy-solutions", title: "Security Proxy Solutions", category: "Cyber Security", description: "Secure web gateways and proxy solutions to control and inspect traffic." },
  { slug: "endpoint-security-solutions", title: "Endpoint Security Solutions", category: "Cyber Security", description: "Protecting every device on your network from modern threats." },
  { slug: "data-loss-prevention", title: "Data Loss Prevention (DLP)", category: "Cyber Security", description: "Stopping sensitive data from leaving your organization unintentionally." },
  { slug: "siem-log-management-solutions", title: "SIEM & Log Management Solutions", category: "Cyber Security", description: "Centralized visibility and alerting across your entire environment." },
  { slug: "cloud-security-solutions", title: "Cloud Security Solutions", category: "Cyber Security", description: "Securing cloud workloads, identities, and configurations." },
  { slug: "penetration-testing", title: "Penetration Testing", category: "Cyber Security", description: "Ethical hacking to find and fix vulnerabilities before attackers do." },

  // Generative AI
  { slug: "ai-strategy-consulting", title: "AI Strategy Consulting", category: "Generative AI", description: "Identifying where AI creates real business value for you." },
  { slug: "ai-development", title: "AI Development", category: "Generative AI", description: "Building custom AI models and applications end to end." },
  { slug: "ai-integration", title: "AI Integration", category: "Generative AI", description: "Embedding AI into your existing tools and workflows." },
  { slug: "ai-training-and-support", title: "AI Training and Support", category: "Generative AI", description: "Helping your team adopt and get the most from AI systems." },
  { slug: "ai-engagement", title: "AI Engagement", category: "Generative AI", description: "Conversational AI and chatbots that engage your customers." },
  { slug: "ai-ethics-and-compliance", title: "AI Ethics and Compliance", category: "Generative AI", description: "Responsible AI practices aligned with regulation and best practice." },

  // Cloud Services
  { slug: "aws-cloud-services", title: "AWS", category: "Cloud Services", description: "Amazon Web Services architecture, migration, and management." },
  { slug: "microsoft-azure", title: "Microsoft Azure", category: "Cloud Services", description: "Azure cloud infrastructure and platform services." },
  { slug: "google-cloud-platform", title: "Google Cloud Platform (GCP)", category: "Cloud Services", description: "GCP solutions for scale, data, and AI workloads." },

  // Web Development
  { slug: "php-development", title: "PHP", category: "Web Development", description: "Robust, scalable PHP web application development." },
  { slug: "mean-stack-development", title: "Mean Stack", category: "Web Development", description: "Full-stack JavaScript apps with MongoDB, Express, Angular, Node." },
  { slug: "node-js-development", title: "Node JS", category: "Web Development", description: "High-performance backend services built on Node.js." },
  { slug: "react-js-development", title: "React JS", category: "Web Development", description: "Fast, modern front-ends built with React." },
  { slug: "nuxt-js-development", title: "Nuxt JS", category: "Web Development", description: "Vue-powered apps with Nuxt for SSR and performance." },
  { slug: "next-js-development", title: "Next JS", category: "Web Development", description: "Production-grade React apps built with Next.js." },
  { slug: "mern-stack-development", title: "Mern Stack", category: "Web Development", description: "Full-stack apps with MongoDB, Express, React, Node." },
  { slug: "javascript-development", title: "JS", category: "Web Development", description: "Custom JavaScript development for the modern web." },
  { slug: "angular-js-development", title: "Angular JS", category: "Web Development", description: "Enterprise-grade front-ends built with Angular." },
  { slug: "python-development", title: "Python", category: "Web Development", description: "Backend systems and automation built with Python." },

  // CMS & Ecommerce
  { slug: "wordpress-development", title: "WordPress", category: "CMS & Ecommerce", description: "Custom WordPress sites, themes, and plugins." },
  { slug: "woocommerce-development", title: "WooCommerce", category: "CMS & Ecommerce", description: "Online stores built on WooCommerce." },
  { slug: "magento-development", title: "Magento", category: "CMS & Ecommerce", description: "Enterprise ecommerce built on Magento." },
  { slug: "joomla-development", title: "Joomla", category: "CMS & Ecommerce", description: "Flexible content sites built on Joomla." },
  { slug: "shopify-development", title: "Shopify", category: "CMS & Ecommerce", description: "Custom Shopify storefronts and apps." },
  { slug: "opencart-development", title: "Opencart", category: "CMS & Ecommerce", description: "Ecommerce stores powered by Opencart." },
  { slug: "drupal-development", title: "Drupal", category: "CMS & Ecommerce", description: "Secure, scalable sites built on Drupal." },

  // App Development
  { slug: "ios-app-development", title: "iOS", category: "App Development", description: "Native iOS app design and development." },
  { slug: "android-app-development", title: "Android", category: "App Development", description: "Native Android app design and development." },
  { slug: "cross-platform-app-development", title: "Cross Platform", category: "App Development", description: "One codebase, apps on every platform." },
  { slug: "flutter-app-development", title: "Flutter", category: "App Development", description: "Beautiful cross-platform apps built with Flutter." },
  { slug: "wearable-app-development", title: "Wearable", category: "App Development", description: "Apps built for wearable devices and smartwatches." },
  { slug: "react-native-app-development", title: "React Native", category: "App Development", description: "Cross-platform mobile apps built with React Native." },

  // Digital Marketing
  { slug: "seo-services", title: "SEO", category: "Digital Marketing", description: "Organic search visibility that drives qualified traffic." },
  { slug: "smo-services", title: "SMO", category: "Digital Marketing", description: "Social media optimization to grow your brand presence." },
  { slug: "ppc-services", title: "PPC", category: "Digital Marketing", description: "Paid campaigns engineered for measurable ROI." },
  { slug: "email-marketing", title: "Email Marketing", category: "Digital Marketing", description: "Email campaigns that nurture and convert." },
  { slug: "whatsapp-marketing", title: "Whatsapp Marketing", category: "Digital Marketing", description: "Reach customers directly through WhatsApp campaigns." },

  // Designing
  { slug: "logo-design", title: "Logo Designing", category: "Designing", description: "Distinctive logo design for your brand identity." },
  { slug: "ui-ux-design", title: "UI/UX Designing", category: "Designing", description: "Intuitive, user-centered product design." },
  { slug: "custom-design", title: "Custom Designing", category: "Designing", description: "Bespoke design work tailored to your brief." },
  { slug: "graphic-design", title: "Graphic Designing", category: "Designing", description: "Graphics and visual assets across every channel." },
];

export const services: ServiceItem[] = rawServices.map((s) => ({
  ...s,
  icon: categoryIcons[s.category],
}));

export const categories: ServiceCategory[] = [
  "Cyber Security",
  "Generative AI",
  "Cloud Services",
  "Web Development",
  "CMS & Ecommerce",
  "App Development",
  "Digital Marketing",
  "Designing",
];

export function getServicesByCategory(category: ServiceCategory) {
  return services.filter((s) => s.category === category);
}

/** Discipline → its services, grouped once at module load. */
export const servicesByCategory: Record<ServiceCategory, ServiceItem[]> =
  categories.reduce(
    (acc, category) => {
      acc[category] = services.filter((s) => s.category === category);
      return acc;
    },
    {} as Record<ServiceCategory, ServiceItem[]>,
  );

/** Stable `#fragment` per discipline — the catalog renders these as section ids. */
export const categoryAnchors: Record<ServiceCategory, string> =
  categories.reduce(
    (acc, category) => {
      acc[category] = category
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      return acc;
    },
    {} as Record<ServiceCategory, string>,
  );

/** Service count per discipline — precomputed so the catalog never re-filters. */
export const categoryCounts: Record<ServiceCategory, number> = categories.reduce(
  (acc, category) => {
    acc[category] = services.filter((s) => s.category === category).length;
    return acc;
  },
  {} as Record<ServiceCategory, number>,
);

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function getServiceIcon(category: ServiceCategory): LucideIcon {
  return categoryIcons[category];
}