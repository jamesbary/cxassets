import { type ClientUploadedFileData } from "uploadthing/types";

import type { Icons } from "@/components/shared/icons";
import {
  businessAccounts,
  personalCheckingAccounts,
  personalSavingsAccounts,
  SavingsAccount,
  type BusinessAccount,
  type CheckingAccount,
  type Transaction,
  type User,
} from "@/db/schema";

export type Role = "user" | "admin";

export type Group = {
  label: string | null;
  value: string;
  src: string;
};

export type StatusTotal = {
  submitted?: string;
  pending?: string;
  rejected?: string;
  requested?: string;
};

export type NavigationDef = {
  dashboard: string;
  getStarted: string;
  reset: string;
  login: string;
  register: string;
  continue: string;
};

export type DataTableOption = {
  value: string;
  label: string;
  icon: Icons;
};

export type ConfigDef = {
  name: string;
  title: string;
  description: string;
  href: string;
};
export type PrivacyDef = {
  text: string;
  agreement: string;
  agreement_url: string;
  policy: string;
  policy_url: string;
};
export type InvestmentStatusTotal = {
  completed?: string;
  running?: string;
};
export type TransTypeTotal = {
  deposit?: string;
  interest?: string;
  withdrawal?: string;
};

// export type TransactionWithName = Transaction & { name: string | null };

export type SelectedUserInvestments = {
  amount: string;
  roi: string;
  interest: string | null;
  status: "running" | "completed";
  source: "interest" | "deposit";
  name: string | null;
};

export type UserTransactions = {
  id: number;
  amount: string;
  description: string | null;
  status: "submitted" | "pending" | "rejected" | "requested";
  type: "interest" | "deposit" | "withdrawal";
  date: Date;
};

export type CreditCard = {
  id: number;
  name: string;
  upload: string | null;
  status: "transit" | "delivered" | "rejected" | "requested";
};

export type AdminInvestmentOption = {
  id: number;
  name: string;
  price: string;
  priceMin: string;
  priceMax: string;
  roi: string | null;
  duration: number;
  description: string;
};

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: Icons;
  label?: string;
  description?: string;
}
export type MainNavItem = {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
  icon?: Icons;
  label?: string;
  description?: string;
  items: MainNavItem[];
};

export interface UserNavItem {
  title: string;
  href: string;
  icon: Icons;
  cmd: string;
  role: Role;
}

export interface SideNavItem {
  name: string;
  icon: Icons;
  href: string;
}

export type DashNavItem = {
  title: string;
  icon?: Icons;
  isActive?: boolean;
  href: string;
  role: Role;
  items: DashNavItem[];
};

export type SecondNavItem = {
  title: string;
  icon: Icons;
  href: string;
};

export type AccountItemOption = {
  view: string;
  transfer: string;
  withdraw: string;
  create: string;
};

export type AccountNavItem = {
  name: string;
  href: string;
  icon: Icons;
  options: AccountItemOption;
};

export interface ThemeItem {
  name: string;
  icon: Icons;
}
export interface ServiceItem {
  title: string;
  description: string;
  icon: Icons;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: SocialItem[];
}

export interface NavItemWithDescription extends NavItem {
  description: string;
}

// Union type to allow for flexibility in handling different types of items
export type NavItemType =
  | NavItem
  | NavItemWithChildren
  | NavItemWithDescription;

export type SidebarNavItem = NavItemWithChildren;

export interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
}

// export type FileWithPreview = FileWithPath & {
// 	preview: string;
// };

export interface DashboardNavigation {
  sidebarNav: SidebarNavItem[];
  adminNav?: SidebarNavItem[];
}

export interface StoredFile {
  id: string;
  name: string;
  url: string;
}

export interface DataTableSearchableColumn<TData> {
  id: keyof TData;
  title: string;
}

export interface DataTableFilterableColumn<TData>
  extends DataTableSearchableColumn<TData> {
  options: Option[];
}

// export type StripePaymentStatus = Stripe.PaymentIntent.Status;

export interface SubscriptionPlan {
  id: "basic" | "standard" | "pro";
  name: string;
  description: string;
  features: string[];
  stripePriceId: string;
  price: number;
}

export interface UserSubscriptionPlan extends SubscriptionPlan {
  stripeSubscriptionId?: string | null;
  stripeCurrentPeriodEnd?: string | null;
  stripeCustomerId?: string | null;
  isSubscribed: boolean;
  isCanceled: boolean;
  isActive: boolean;
}

export type SocialItem = {
  title: string;
  href: string;
  icon?: Icons;
  external?: boolean;
};

export interface UploadedFile<T = unknown> extends ClientUploadedFileData<T> {}

export type AccountTable =
  | typeof personalCheckingAccounts
  | typeof personalSavingsAccounts
  | typeof businessAccounts;

export type TransactionWithName = Transaction & { name: string | null };

export interface Page {
  title: string;
  description: string;
  href: string;
}

export interface Pages {
  career: Page;
  about: Page;
  contact: Page;
}

export type AdminUser = Pick<
  User,
  | "id"
  | "name"
  | "image"
  | "role"
  | "country"
  | "email"
  | "username"
  | "ipCountry"
  | "status"
> & {
  personalCheckingAccount: CheckingAccount;
  personalSavingsAccount: SavingsAccount;
  businessAccount: BusinessAccount;
  transactions: Transaction[];
};
