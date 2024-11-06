import {
  adminNavOptions,
  appName,
  links,
  sidebarNavOptions,
} from "@/config/constants";
import { mapSidebarToDashboard } from "@/lib/utils";
import type {
  DashboardNavigation,
  FooterItem,
  MainNavItem,
  UserNavItem,
} from "@/types";

export type AppConfig = typeof appConfig;

export const appConfig = {
  name: appName,
  short: "CXAssets",
  description: "A digital investment platform with banking solutions",
  url: "/",
  ogImage: "",
  home: {
    title: "Home",
    description: "...",
  },
  auth: {
    title: `Authentication`,
    description: "Signup or signin to your account to get started.",
    signin: {
      title: "Sign In",
      description: "Signin with email or username and password.",
      href: "/signin",
    },
    signup: {
      title: "Sign Up",
      description: "Create an account to get started.",
      href: "/signup",
    },
    signout: {
      title: "Sign Out",
      description: "Hope to see you again.",
      href: "/signout",
    },
    verification: {
      title: "Auth Verification",
      description: "Verify your email address",
      href: "/verification",
    },
    onboarding: {
      title: "Onboarding",
      description: "Get onboarded, and personalize your experience",
      href: "/onboarding",
    },
    admin: {
      title: "Admin",
      description: "Configure, setup, and monitor",
      href: "/admin",
    },
    error: {
      title: "Authentication Error",
      description: "Problems getting started",
      href: "/error",
    },
    protected: ["/dashboard", "/onboarding", "/admin"],
  },
  entry: {
    title: "Dashboard",
    description: "Manage your investments, and configure your account",
    href: "/dashboard",
  },
  support: {
    request: {
      title: "Request help",
      description: "....",
      href: "/support/request",
    },
  },
  links,
  docs: {
    privacy: {
      text: `By continuing, you are setting up a ${appName} account and agree to our`,
      agreement: `terms of use`,
      agreement_url: "/docs/terms",
      policy: "privacy & security",
      policy_url: "/docs/privacy-security",
    },
  },
  quote: {
    text: `&ldquo;This has been a beautiful experience. The platform is as functional and enriching as it iis beautifull.&rdquo;`,
    footer: "Melda Zinc",
  },
  mainNav: [
    {
      title: "Personal",
      href: "/personal",
      items: [
        {
          title: "Personal Banking",
          href: "/personal/personal",
          items: [
            {
              title: "Checking Accounts",
              href: "/personal/personal/checking",
              items: [],
            },
            {
              title: "Savings Accounts",
              href: "/personal/personal/savings",
              items: [],
            },
            {
              title: "Bank Cards",
              href: "/personal/personal/cards",
              items: [],
            },
          ],
        },
        {
          title: "Convenience Banking",
          href: "/personal/convenience",
          items: [
            {
              title: "Internet Banking",
              href: "/personal/convenience/internet_banking",
              items: [],
            },
            {
              title: "Bill Payment",
              href: "/personal/convenience/bill_payment",
              items: [],
            },
            {
              title: "USSD Banking",
              href: "/personal/convenience/ussd_banking",
              items: [],
            },
          ],
        },
        {
          title: "Personal Resources",
          href: "/personal/resources",
          items: [
            {
              title: "Home Loans",
              href: "/personal/resources/home_loans",
              items: [],
            },
            {
              title: "Resource Center",
              href: "/personal/resources/resource_center",
              items: [],
            },
            {
              title: "Deposit Rates",
              href: "/personal/resources/deposit_rates",
              items: [],
            },
          ],
        },
      ],
    },
    {
      title: "Business",
      href: "/business",
      items: [
        {
          title: "Banking Solutions",
          href: "/business/banking",
          items: [
            {
              title: "Business Accounts",
              href: "/business/banking/accounts",
              items: [],
            },
            {
              title: "Business Internet Banking",
              href: "/business/banking/internet_banking",
              items: [],
            },
            {
              title: "Treasury Management",
              href: "/business/banking/treasury",
              items: [],
            },
            {
              title: "Bank Cards",
              href: "/business/banking/cards",
              items: [],
            },
          ],
        },
        {
          title: "Specialty Banking",
          href: "/business/specialty",
          items: [
            {
              title: "Payment Solutions",
              href: "/business/specialty/payment",
              items: [],
            },
            {
              title: "ACH Solutions",
              href: "/business/specialty/ach",
              items: [],
            },
            {
              title: "Industry Solutions",
              href: "/business/specialty/industry",
              items: [],
            },
            {
              title: "Deposit Rates",
              href: "/business/specialty/deposit_rates",
              items: [],
            },
          ],
        },
      ],
    },
    {
      title: "Lending",
      href: "/lending",
      items: [
        {
          title: "Business Financing",
          href: "/lending/business",
          items: [
            {
              title: "Small Business Loans",
              href: "/lending/business/small_business_loans",
              items: [],
            },
            {
              title: "Small Business Administration Loans",
              href: "/lending/business/sba_loans",
              items: [],
            },
            {
              title: "USDA Business Loans",
              href: "/lending/business/usda_business_loans",
              items: [],
            },
            {
              title: "Business Relief Programs",
              href: "/lending/business/business_reliefs",
              items: [],
            },
          ],
        },
        {
          title: "Commercial Financing",
          href: "/lending/commercial",
          items: [
            {
              title: "Commercial Real Estate",
              href: "/lending/commercial/real_estate",
              items: [],
            },
            {
              title: "Equipment Loans",
              href: "/lending/commercial/equipment_loans",
              items: [],
            },
            {
              title: "Business Acquisation Loans",
              href: "/lending/commercial/acquisation_loans",
              items: [],
            },
            {
              title: "Warehouse Lending",
              href: "/lending/commercial/warehouse_lending",
              items: [],
            },
          ],
        },
        {
          title: "Lending Resources",
          href: "/lending/resources",
          items: [
            {
              title: "Business Loan Support",
              href: "/lending/resources/loan_support",
              items: [],
            },
          ],
        },
      ],
    },
    {
      title: "Mortgage",
      href: "/mortgage",
      items: [
        {
          title: "Mortgage Products",
          href: "/mortgage/products",
          items: [
            {
              title: "First-Time Home Buyers",
              href: "/mortgage/products/first_home",
              items: [],
            },
            {
              title: "Down Payment Assistance",
              href: "/mortgage/products/down_payment",
              items: [],
            },
            {
              title: "Mortgage Rates",
              href: "/mortgage/products/rates",
              items: [],
            },
            {
              title: "FHA, VA, & USDA",
              href: "/mortgage/products/fha_va_usda",
              items: [],
            },
            {
              title: "Jumbo Home Loans",
              href: "/mortgage/products/jumbo_home_loans",
              items: [],
            },
          ],
        },
        {
          title: "Niche Products",
          href: "/mortgage/niche",
          items: [
            {
              title: "Renovation & FHA 203(k)",
              href: "/mortgage/niche/renovation_fha",
              items: [],
            },
            {
              title: "Home Equity & HELOCs",
              href: "/mortgage/niche/equity_helocs",
              items: [],
            },
          ],
        },
        {
          title: "Mortgage Resources",
          href: "/mortgage/resources",
          items: [
            {
              title: "Pay My Mortgage",
              href: "/mortgage/resources/pay_for_me",
              items: [],
            },
            {
              title: "Retail Mortgage Offices",
              href: "/mortgage/resources/retail_offices",
              items: [],
            },
          ],
        },
      ],
    },
    {
      title: "FAQs",
      href: "/support/faqs",
      items: [],
    },
  ] satisfies MainNavItem[],

  dashboardNav: {
    sidebarNav: mapSidebarToDashboard(sidebarNavOptions),
    adminNav: mapSidebarToDashboard(adminNavOptions),
  } satisfies DashboardNavigation,

  userNav: [
    {
      title: "Admin",
      href: "/admin",
      icon: "admin",
      cmd: "⇧⌘X",
      role: "admin",
    },
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: "dashboard",
      cmd: "⇧⌘D",
      role: "user",
    },
  ] satisfies UserNavItem[],

  footerNav: [
    {
      title: "Help",
      items: [
        {
          title: "About",
          href: "/about",
          external: false,
        },
        {
          title: "Terms",
          href: "/terms",
          external: false,
        },
        {
          title: "Privacy",
          href: "/privacy",
          external: false,
        },
      ],
    },
    {
      title: "Social",
      items: [
        {
          title: "X",
          href: links.x,
          icon: "x",
          external: true,
        },
        // {
        //   title: "GitHub",
        //   href: links.github,
        //   icon: "gitHub",
        //   external: true,
        // },
        {
          title: "Discord",
          href: links.discord,
          icon: "discord",
          external: true,
        },
      ],
    },
  ] satisfies FooterItem[],
};
