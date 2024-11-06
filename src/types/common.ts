import { Icons } from "@/components/shared/icons";

export type NotFound = {
  title: string;
  desc: string;
  toHome: string;
  retry: string;
};
export type Sub = {
  tag: string;
  title: string;
  description: string;
  features: string[];
  calltoaction: string;
};
type ServiceItem = {
  title: string;
  description: string;
};

export type Service = {
  title: string;
  href: string;
  description: string;
  icon: Icons;
  items: ServiceItem[];
};

type FaqItem = {
  question: string;
  answer: string;
};

type FaqSection = {
  title: string;
  items: FaqItem[];
};

export type Faqs = FaqSection[];
