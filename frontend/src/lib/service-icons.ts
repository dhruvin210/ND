import {
  BarChart3,
  Bot,
  Building2,
  Cloud,
  Layers,
  Megaphone,
  Smartphone,
  Sparkles,
  Users,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";

export const serviceIconMap: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  bot: Bot,
  "building-2": Building2,
  layers: Layers,
  cloud: Cloud,
  "bar-chart-3": BarChart3,
  megaphone: Megaphone,
  workflow: Workflow,
  smartphone: Smartphone,
  zap: Zap,
  users: Users,
};

export function resolveServiceIcon(icon?: string): LucideIcon {
  return (icon && serviceIconMap[icon]) || Sparkles;
}
