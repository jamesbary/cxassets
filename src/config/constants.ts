import { Icons } from "@/components/shared/icons";
import type { DataTableOption, SideNavItem } from "@/types";

export const sidebarNavOptions: SideNavItem[] = [
  { href: "/dashboard", icon: "dashboard", name: "Dashboard" },
  { href: "/dashboard/transfer", icon: "transactions", name: "Transfer" },
  // { href: "/dashboard/request", icon: "request", name: "Request" },
];
export const adminNavOptions: SideNavItem[] = [
  { href: "/admin", icon: "admin", name: "Admin" },
  { href: "/admin/transfer", icon: "transactions", name: "Transfer" },
  // { href: "/admin/request", icon: "request", name: "Request" },
];

export const appName = "CX Assets";
export const DEFAULT_AUTH_REDIRECT = "/dashboard";
export const apiAuthPrefix = "/api/auth";
export const authRoutes = ["/signin", "/signup", "/error", "/verification"];
// export const publicRoutes = ["/", "/about"];
export const protectedRoutes = ["/onboarding", "/dashboard", "/admin"];
export const publicRoutes = ["/", "/about", "/contact"];

export const links = {
  x: "https://x.com/revolutltd",
  github: "https://github.com/revolutorg/cxassets",
  discord: "https://discord.com/users/revolutltd",
};

export const status: DataTableOption[] = [
  {
    value: "pending",
    label: "Pending",
    icon: "dashed",
  },
  {
    value: "success",
    label: "Success",
    icon: "check",
  },
  {
    value: "rejected",
    label: "Rejected",
    icon: "cancel",
  },
];

export const statusSet = new Set(["success", "rejected"]);

export const type: DataTableOption[] = [
  {
    value: "transfer",
    label: "Transfer",
    icon: "transactions",
  },
  {
    value: "fund",
    label: "Fund",
    icon: "wallet",
  },
];

export const personal = [
  {
    title: "Personal Banking",
    href: "/personal/personal",
    description:
      "From checking and savings accounts to internet banking and bill payment, manage your finances with ease.",
    items: [
      {
        title: "Checking Accounts",
        href: "/personal/personal/checking",
      },
      {
        title: "Savings Accounts",
        href: "/personal/personal/savings",
      },
      {
        title: "Bank Cards",
        href: "/personal/personal/cards",
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
      },
      {
        title: "Bill Payment",
        href: "/personal/convenience/bill_payment",
      },
      {
        title: "USSD Banking",
        href: "/personal/convenience/ussd_banking",
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
      },
      {
        title: "Resource Center",
        href: "/personal/resources/resource_center",
      },
      {
        title: "Deposit Rates",
        href: "/personal/resources/deposit_rates",
      },
    ],
  },
];
export const lending = [
  {
    title: "Business Financing",
    href: "/lending/business",
    description:
      "Access a variety of loans for small businesses, commercial ventures, and personal mortgages.",
    items: [
      {
        title: "Small Business Loans",
        href: "/lending/business/small_business_loans",
      },
      {
        title: "Small Business Administration Loans",
        href: "/lending/business/sba_loans",
      },
      {
        title: "USDA Business Loans",
        href: "/lending/business/usda_business_loans",
      },
      {
        title: "Business Relief Programs",
        href: "/lending/business/business_reliefs",
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
      },
      {
        title: "Equipment Loans",
        href: "/lending/commercial/equipment_loans",
      },
      {
        title: "Business Acquisation Loans",
        href: "/lending/commercial/acquisation_loans",
      },
      {
        title: "Warehouse Lending",
        href: "/lending/commercial/warehouse_lending",
      },
    ],
  },
  {
    title: "Lending Resources",
    href: "/lending/resources",
    items: [
      { title: "Business Loan Support", href: "/lending/resources/support" },
    ],
  },
];
export const mortgage = [
  {
    title: "Mortgage Products",
    href: "/mortgage/products",
    description:
      "Find the right mortgage product, whether you’re a first-time homebuyer or looking for specialized financing.",
    items: [
      {
        title: "First-Time Home Buyers",
        href: "/mortgage/products/first_home",
      },
      {
        title: "Down Payment Assistance",
        href: "/mortgage/products/down_payment",
      },
      {
        title: "Mortgage Rates",
        href: "/mortgage/products/rates",
      },
      {
        title: "FHA, VA, & USDA",
        href: "/mortgage/products/fha_va_usda",
      },
      {
        title: "Jumbo Home Loans",
        href: "/mortgage/products/jumbo_home_loans",
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
      },
      {
        title: "Home Equity & HELOCs",
        href: "/mortgage/niche/equity_helocs",
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
      },
      {
        title: "Retail Mortgage Offices",
        href: "/mortgage/resources/retail_offices",
      },
    ],
  },
];

export const business = [
  {
    title: "Banking Solutions",
    href: "/business/banking",
    description:
      "Tailored solutions including business accounts, internet banking, and treasury management",
    items: [
      {
        title: "Business Accounts",
        href: "/business/banking/accounts",
      },
      {
        title: "Business Internet Banking",
        href: "/business/banking/internet_banking",
      },
      {
        title: "Treasury Management",
        href: "/business/banking/treasury",
      },
      {
        title: "Bank Cards",
        href: "/business/banking/cards",
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
      },
      {
        title: "ACH Solutions",
        href: "/business/specialty/ach",
      },
      {
        title: "Industry Solutions",
        href: "/business/specialty/industry",
      },
      {
        title: "Deposit Rates",
        href: "/business/specialty/deposit_rates",
      },
    ],
  },
];

export const support = [
  {
    title: "Company Profile",
    href: "/support/profile",
    description: "Company profile",
    items: [],
  },
  {
    title: "Guide",
    href: "/support/guide",
    description: "Find helpful materials and guides",
    items: [],
  },
  {
    title: "FAQs",
    href: "/support/faqs",
    description: "Answers to common questions",
    items: [],
  },
  {
    title: "Request Help",
    href: "/support/request",
    description: "Speak with a customer service agent",
    items: [],
  },
];

export const services = [
  {
    title: "Personal Banking",
    href: "/personal",
    description:
      "From checking and savings accounts to internet banking and bill payment, manage your finances with ease. Enjoy the convenience of 24/7 access to your accounts, secure transactions, and personalized financial tools.",
    icon: "user" as Icons,
    items: [
      {
        title: "Checking Accounts",
        description:
          "Simplify your daily transactions with our flexible and fee-free checking accounts.",
      },
      {
        title: "Savings Accounts",
        description:
          "Grow your savings with competitive interest rates and easy access to your funds.",
      },
      {
        title: "Internet Banking",
        description:
          "Manage your finances from anywhere, at any time, with our user-friendly online banking platform.",
      },
      {
        title: "Bill Payment",
        description:
          "Pay your bills quickly and securely, without the hassle of paper statements.",
      },
    ],
  },
  {
    title: "Business Banking",
    href: "/business",
    description:
      "Tailored solutions including business accounts, internet banking, and treasury management. Empower your business with tools that streamline operations and enhance financial efficiency.",
    icon: "briefcase" as Icons,
    items: [
      {
        title: "Business Accounts",
        description:
          "Keep your business finances organized with our comprehensive business account options.",
      },
      {
        title: "Business Internet Banking",
        description:
          "Monitor your business finances and perform transactions effortlessly with our secure online banking.",
      },
      {
        title: "Treasury Management",
        description:
          "Optimize your cash flow and manage your assets effectively with our advanced treasury services.",
      },
    ],
  },
  {
    title: "Lending Solutions",
    href: "/lending",
    description:
      "Access a variety of loans for small businesses, commercial ventures, and personal mortgages. Whether you’re expanding your business or purchasing your dream home, we offer flexible lending options to meet your needs.",
    icon: "dollarSign" as Icons,
    items: [
      {
        title: "Small Business Loans",
        description:
          "Get the funding you need to grow your small business with our tailored loan solutions.",
      },
      {
        title: "Commercial Financing",
        description:
          "Secure financing for your commercial projects with our competitive loan options.",
      },
      {
        title: "Personal Mortgages",
        description:
          "Choose from a range of mortgage products designed to fit your financial situation and homeownership goals.",
      },
    ],
  },
  {
    title: "Mortgage Services",
    href: "/mortgage",
    description:
      "Find the right mortgage product, whether you’re a first-time homebuyer or looking for specialized financing. Benefit from our expert advice and competitive rates to make your home buying journey smooth and stress-free.",
    icon: "mortgage" as Icons,
    items: [
      {
        title: "First-Time Home Buyers",
        description:
          "Navigate the home buying process with confidence with our first-time homebuyer programs.",
      },
      {
        title: "Down Payment Assistance",
        description:
          "Take advantage of our assistance programs to make your home purchase more affordable.",
      },
      {
        title: "Specialized Mortgages",
        description:
          "Explore our range of FHA, VA, USDA, and jumbo loans tailored to your unique needs.",
      },
    ],
  },
];

export const features = [
  {
    title: "Security",
    description:
      "State-of-the-art security to protect your data and transactions.",
    icon: "admin" as Icons,
  },
  {
    title: "Convenience",
    description:
      "Bank from anywhere, at any time, with our user-friendly digital platform.",
    icon: "convenience" as Icons,
  },
  {
    title: "Customer Support",
    description:
      "24/7 support to assist you with all your banking and investment needs.",
    icon: "support" as Icons,
  },
];

export const promo = [
  {
    title: "Special Offer",
    description: "1% cash back on all purchases for the first three months.",
    icon: "offer" as Icons,
  },
  {
    title: "Referral Program",
    description: "Earn $50 for every friend you refer who opens an account.",
    icon: "referral" as Icons,
  },
];

export const story = {
  title: "Our Story",
  description: `Welcome to ${appName}, where we believe in reimagining the
  future of banking for the digital age. Founded on the principles of
  innovation, security, and customer-centricity, our mission is to
  provide a seamless and personalized banking experience that empowers
  individuals and businesses alike.`,
};
export const values = {
  title: "Mission & Values",
  description: `At ${appName}, our mission is to transform the way you manage your finances by leveraging cutting-edge technology and exceptional customer service. We are dedicated to:`,
  items: [
    {
      title: "Innovation",
      description:
        "Continuously evolving our services to meet the changing needs of our customers.",
    },
    {
      title: "Security",
      description:
        "Implementing state-of-the-art security measures to protect your data and transactions.",
    },
    {
      title: "Customer-Centricity",
      description:
        "Putting our customers at the heart of everything we do, ensuring a smooth and rewarding banking experience",
    },
    {
      title: "Transparency",
      description:
        "Building trust through clear, honest communication and straightforward financial products.",
    },
    {
      title: "Inclusivity",
      description:
        "Providing accessible banking solutions for everyone, regardless of their financial background.",
    },
    {
      title: "Efficiency",
      description:
        "Streamlining processes to ensure quick and efficient service for all your banking needs.",
    },
    {
      title: "Responsibility",
      description:
        "Acting with integrity and accountability in all our business practices.",
    },
    {
      title: "Sustainability",
      description:
        "Promoting sustainable practices and contributing to a greener future.",
    },
  ],
};
export const team = {
  title: "Our Team",
  description:
    "Our team is a diverse group of professionals passionate about finance and technology. We bring together experts from various fields to create a dynamic and forward-thinking banking environment. Meet some of the key members driving Revolut Online Bank forward:",
  items: [
    {
      title: "John Klugger, CEO",
      description:
        "With over 20 years of experience in the financial industry, John leads our team with a vision for a more inclusive and innovative banking future.",
    },
    {
      title: "Jane Marlon, CTO",
      description:
        "Jane heads our technology division, ensuring our platform remains at the forefront of digital banking innovation.",
    },
    {
      title: "Alice Johnson, CFO",
      description:
        "Alice oversees our financial operations, bringing a wealth of knowledge and expertise to our strategic planning.",
    },
    {
      title: "Mark Thompson, HCE",
      description:
        "Mark fills the Head of Customer Experience role perfectly, ensuring every customer interaction is rewarding.",
    },
  ],
};
export const whyus = {
  title: "Why Choose Us?",
  description: `${appName} stands out for its commitment to:`,
  items: [
    {
      title: "Seamless Online Experience",
      description:
        "Enjoy a user-friendly platform that makes managing your finances easier than ever.",
    },
    {
      title: "Comprehensive Services",
      description:
        "From personal and business banking to lending solutions and mortgage services, we offer a wide range of financial products tailored to your needs.",
    },
    {
      title: "24/7 Customer Support",
      description:
        "Access help whenever you need it with our dedicated support team.",
    },
    {
      title: "Competitive Rates",
      description:
        "Benefit from attractive interest rates and low fees across our products and services.",
    },
  ],
};
export const submenus = [
  {
    tag: "checking",
    title: "Personal Checking Accounts",
    description:
      "Our Personal Checking Accounts offer a convenient way to manage your daily finances. With features like online banking, mobile check deposit, and no monthly maintenance fees, our checking accounts are designed to fit your lifestyle.",
    features: [
      "No monthly maintenance fees",
      "Free online and mobile banking",
      "Mobile check deposit",
      "Access to thousands of ATMs nationwide",
      "Overdraft protection options",
    ],
    calltoaction:
      "Open an account today and take control of your finances with ease",
  },
  {
    tag: "savings",
    title: "Persnal Savings Accounts",
    description:
      "Start saving for your future with our Personal Savings Accounts. Earn competitive interest rates while having easy access to your funds. Our savings accounts are designed to help you reach your financial goals.",
    features: [
      "No monthly maintenance fees",
      "Competitive interest rates",
      "Easy access to your funds",
      "Online and mobile banking",
      "Automatic transfers from your checking account",
    ],
    calltoaction:
      "Begin your savings journey with us. Open a savings account now",
  },
  {
    tag: "cards",
    title: "Bank Cards",
    description:
      "Our range of bank cards offers you the flexibility and security you need for all your transactions. Whether you prefer debit cards or credit cards, we have the right option for you with various rewards and benefits.",
    features: [
      "No annual fees",
      "Secure online transactions",
      "Rewards programst",
      "Worldwide acceptance",
      "24/7 customer support",
    ],
    calltoaction:
      "Choose the card that best fits your needs and start enjoying the benefits today",
  },
  {
    tag: "internet_banking",
    title: "Internet Banking",
    description:
      "Our Internet Banking service provides you with secure and easy access to your accounts anytime, anywhere. Manage your finances, pay bills, transfer funds, and more with just a few clicks.",
    features: [
      "Bill payment services",
      "Fund transfers",
      "Transaction history",
      "Secure and user-friendly interface",
      "24/7 customer support",
    ],
    calltoaction:
      "Sign up for Internet Banking and take control of your finances from the comfort of your home",
  },
  {
    tag: "bill_payment",
    title: "Bill Payment",
    description:
      "Simplify your life with our Bill Payment service. Pay all your bills from one place quickly and securely. Never miss a due date again with automatic payments and reminders.",
    features: [
      "Pay bills online",
      "Set up automatic payments",
      "Receive payment reminders",
      "Secure transactions",
      "Track your payment history",
    ],
    calltoaction:
      "Register for Bill Payment services today and manage all your bills with ease",
  },
  {
    tag: "ussd_banking",
    title: "USSD Banking",
    description:
      "Experience the convenience of banking on the go with our USSD Banking service. Access your account, check balances, transfer funds, and more using simple USSD codes on your mobile phone.",
    features: [
      "No internet required",
      "Instant access to account information",
      "Fund transfers and bill payments",
      "Secure and convenient",
      "Available on all mobile networks",
    ],
    calltoaction:
      "Get an account and start using our USSD code now for seamless banking on the go",
  },
  {
    tag: "home_loans",
    title: "Home Loans",
    description:
      "Looking to buy your dream home? Our Home Loans offer competitive rates and flexible terms to help you achieve homeownership. Whether you’re a first-time buyer or looking to refinance, we have the right solution for you.",
    features: [
      "Competitive interest rates",
      "Flexible repayment terms",
      "Quick and easy application process",
      "Expert mortgage advice",
      "Various loan options",
    ],
    calltoaction:
      "Apply for a Home Loan today and take the first step towards owning your home",
  },
  {
    tag: "resource_center",
    title: "Resource Center",
    description:
      "Our Resource Center is your go-to place for financial education and advice. Find articles, guides, and tools to help you make informed financial decisions and improve your financial well-being.",
    features: [
      "Financial articles and guides",
      "Budgeting tools",
      "Investment tips",
      "Credit management advice",
      "Mortgage calculators",
    ],
    calltoaction:
      "Visit our Resource Center and start your journey towards financial literacy and security",
  },
  {
    tag: "deposit_rates",
    title: "Deposit Rates",
    description:
      "Stay updated with our competitive deposit rates. We offer attractive rates on savings accounts, fixed deposits, and other investment products to help you grow your money.",
    features: [
      "Competitive interest rates",
      "Flexible deposit terms",
      "Regular updates",
      "Secure investments",
      "Expert financial advice",
    ],
    calltoaction:
      "Check out our current deposit rates and start earning more on your savings",
  },
  {
    tag: "accounts",
    title: "Business Accounts",
    description:
      "Our Business Accounts are designed to meet the needs of businesses of all sizes. Manage your business finances efficiently with features tailored to support your growth and success.",
    features: [
      "No monthly maintenance fees",
      "Online and mobile banking",
      "Multiple user access",
      "Business debit cards",
      "Overdraft protection options",
    ],
    calltoaction:
      "Open a Business Account today and streamline your business operations",
  },
  {
    tag: "treasury",
    title: "Treasury Management",
    description:
      "Optimize your cash flow and manage your liquidity with our Treasury Management services. Our solutions are designed to help you maximize your working capital and minimize risks.",
    features: [
      "Cash concentration and disbursement",
      "Liquidity management",
      "Fraud prevention tools",
      "Comprehensive reporting",
      "Dedicated treasury management support",
    ],
    calltoaction:
      "Explore our Treasury Management services and take control of your financial strategy",
  },
  {
    tag: "payment",
    title: "Payment Solutions",
    description:
      "Enhance your payment processing with our Payment Solutions. We offer a variety of options to help you manage and streamline your payments efficiently.",
    features: [
      "Merchant services",
      "ACH payment processing",
      "Remote deposit capture",
      "Mobile payment solutions",
      "Secure and reliable transactions",
    ],
    calltoaction:
      "Learn more about our Payment Solutions and improve your payment processing today",
  },
  {
    tag: "ach",
    title: "ACH Solutions",
    description:
      "Simplify your payment processes with our ACH Solutions. Manage direct deposits, vendor payments, and other transactions with ease and security.",
    features: [
      "Direct deposit services",
      "Vendor payment solutions",
      "Recurring payments",
      "Secure and efficient processing",
      "Detailed transaction reports",
    ],
    calltoaction:
      "Discover our ACH Solutions and streamline your payment processes",
  },
  {
    tag: "industry",
    title: "Industry Solutions",
    description:
      "We offer tailored banking solutions to meet the unique needs of different industries. Whether you’re in healthcare, retail, or manufacturing, we have the expertise to support your business.",
    features: [
      "Industry-specific banking solutions",
      "Expert financial advice",
      "Customized financing options",
      "Cash management services",
      "Specialized industry support",
    ],
    calltoaction:
      "Explore our Industry Solutions and find the right banking services for your industry",
  },
  {
    tag: "small_business_loans",
    title: "Small Business Loans",
    description:
      "Fuel your business growth with our Small Business Loans. We offer flexible loan options to help you finance your business needs, whether it’s for expansion, equipment, or working capital.",
    features: [
      "Competitive interest rates",
      "Flexible repayment terms",
      "Quick approval process",
      "No prepayment penalties",
      "Expert loan advice",
    ],
    calltoaction:
      "Apply for a Small Business Loan today and take your business to the next level",
  },
  {
    tag: "sba_loans",
    title: "Small Business Administration (SBA) Loans",
    description:
      "Our SBA Loans provide government-backed financing options for small businesses. Take advantage of lower down payments and longer repayment terms to grow your business.",
    features: [
      "Low down payments",
      "Long repayment terms",
      "Competitive interest rates",
      "SBA loan expertise",
      "Flexible loan options",
    ],
    calltoaction:
      "Explore our SBA Loan options and find the right financing solution for your business",
  },
  {
    tag: "usda_business_loans",
    title: "USDA Business Loans",
    description:
      "Our USDA Business Loans offer financing for rural businesses. Benefit from competitive rates and terms designed to support business development in rural areas.",
    features: [
      "Competitive interest rates",
      "Long repayment terms",
      "Support for rural businesses",
      "Flexible loan options",
      "Expert loan advice",
    ],
    calltoaction:
      "Apply for a USDA Business Loan and support your rural business growth",
  },
  {
    tag: "business_reliefs",
    title: "Business Relief Programs",
    description:
      "We provide Business Relief Programs to support businesses during challenging times. Access funding and resources to help your business recover and thrive.",
    features: [
      "Emergency funding options",
      "Flexible repayment terms",
      "Quick application process",
      "Expert financial advice",
      "Supportive resources",
    ],
    calltoaction:
      "Learn more about our Business Relief Programs and find the support you need",
  },
  {
    tag: "real_estate",
    title: "Commercial Real Estate Loans",
    description:
      "Finance your commercial real estate projects with our competitive loan options. Whether you’re buying, renovating, or refinancing, we offer solutions to meet your needs.",
    features: [
      "Competitive interest rates",
      "Flexible loan terms",
      "Quick approval process",
      "Expert real estate advice",
      "Various loan options",
    ],
    calltoaction:
      "Apply for a Commercial Real Estate Loan and bring your property plans to life",
  },
  {
    tag: "equipment_loans",
    title: "Equipment Loans",
    description:
      "Upgrade your business operations with our Equipment Loans. Finance new or used equipment with flexible terms and competitive rates to keep your business running smoothly.",
    features: [
      "Competitive interest rates",
      "Flexible repayment terms",
      "Quick approval process",
      "Financing for new or used equipment",
      "Expert loan advice",
    ],
    calltoaction:
      "Apply for an Equipment Loan and invest in your business’s future",
  },
  {
    tag: "acquisation_loans",
    title: "Business Acquisition Loans",
    description:
      "Expand your business through acquisitions with our Business Acquisition Loans. We offer financing solutions to help you purchase and integrate new businesses.",
    features: [
      "Competitive interest rates",
      "Flexible loan terms",
      "Quick approval process",
      "Expert acquisition advice",
      "Various loan options",
    ],
    calltoaction:
      "Apply for a Business Acquisition Loan and grow your business through strategic acquisitions",
  },
  {
    tag: "warehouse_lending",
    title: "Warehouse Lending",
    description:
      "Our Warehouse Lending solutions provide funding to mortgage bankers and other financial institutions. Access flexible financing to support your lending operations.",
    features: [
      "Competitive interest rates",
      "Flexible loan terms",
      "Quick approval process",
      "Expert financial advice",
      "Customizable solutions",
    ],
    calltoaction:
      "Explore our Warehouse Lending options and support your lending operations",
  },
  {
    tag: "loan_support",
    title: "Business Loan Support",
    description:
      "Get the support you need for your business loans with our dedicated Business Loan Support services. From application to repayment, we’re here to help you every step of the way.",
    features: [
      "Expert loan advice",
      "Assistance with loan applications",
      "Flexible repayment options",
      "Dedicated support team",
      "Comprehensive resources",
    ],
    calltoaction:
      "Contact our Business Loan Support team today and get the help you need",
  },
  {
    tag: "first_home",
    title: "First-Time Home Buyers",
    description:
      "Buying your first home is a big step. Our First-Time Home Buyers program offers special financing options and support to help you achieve homeownership.",
    features: [
      "Competitive interest rates",
      "Low down payment options",
      "Expert mortgage advice",
      "Flexible loan terms",
      "Homebuyer education resources",
    ],
    calltoaction:
      "Apply for our First-Time Home Buyers program and take the first step towards owning your home",
  },
  {
    tag: "down_payment",
    title: "Down Payment Assistance",
    description:
      "Struggling to save for a down payment? Our Down Payment Assistance programs offer grants and low-interest loans to help you cover the cost of your down payment.",
    features: [
      "Grants and low-interest loans",
      "Flexible repayment terms",
      "Expert mortgage advice",
      "Quick approval process",
      "Various assistance options",
    ],
    calltoaction:
      "Learn more about our Down Payment Assistance programs and make homeownership more accessible",
  },
  {
    tag: "rates",
    title: "Mortgage Rates",
    description:
      "Stay informed with our competitive mortgage rates. Whether you’re buying a new home or refinancing, we offer rates that fit your needs.",
    features: [
      "Competitive interest rates",
      "Various loan options",
      "Regular rate updates",
      "Expert mortgage advice",
      "Flexible loan terms",
    ],
    calltoaction:
      "Check out our current mortgage rates and find the best rate for your home loan",
  },
  {
    tag: "fha_va_usda",
    title: "FHA, VA, & USDA Loans",
    description:
      "We offer government-backed loans to help you finance your home. Whether you’re a first-time homebuyer, a veteran, or buying in a rural area, we have the right loan for you.",
    features: [
      "Low down payment options",
      "Competitive interest rates",
      "Flexible loan terms",
      "Expert mortgage advice",
      "Quick approval process",
    ],
    calltoaction:
      "Explore our FHA, VA, and USDA loan options and find the best solution for your home financing needs",
  },
  {
    tag: "jumbo_home_loans",
    title: "Jumbo Home Loans",
    description:
      "For those purchasing high-value properties, our Jumbo Home Loans offer financing solutions with competitive rates and terms to meet your needs.",
    features: [
      "Competitive interest rates",
      "Flexible loan terms",
      "Financing for high-value properties",
      "Expert mortgage advice",
      "Quick approval process",
    ],
    calltoaction:
      "Apply for a Jumbo Home Loan and finance your dream home with confidence",
  },
  {
    tag: "renovation_fha",
    title: "Renovation & FHA 203(k) Loans",
    description:
      "Transform your home with our Renovation and FHA 203(k) loans. Finance your home improvements and renovations with flexible loan options.",
    features: [
      "Competitive interest rates",
      "Financing for home improvements",
      "Expert renovation advice",
      "Flexible loan terms",
      "Quick approval process",
    ],
    calltoaction:
      "Apply for a Renovation or FHA 203(k) loan and start your home transformation today",
  },
  {
    tag: "equity_helocs",
    title: "Home Equity & HELOCs",
    description:
      "Tap into your home’s equity with our Home Equity Loans and Home Equity Lines of Credit (HELOCs). Use the funds for home improvements, debt consolidation, or other expenses",
    features: [
      "Competitive interest rates",
      "Flexible repayment terms",
      "Access to funds as needed",
      "Expert financial advice",
      "Quick approval process",
    ],
    calltoaction:
      "Learn more about our Home Equity Loans and HELOCs and make the most of your home’s value",
  },
  {
    tag: "pay_for_me",
    title: "Pay My Mortgage",
    description:
      "Conveniently manage your mortgage payments with our online payment system. Make payments, view statements, and track your payment history with ease.",
    features: [
      "Secure online payments",
      "Easy access to statements",
      "Payment reminders",
      "Detailed payment history",
      "Expert support",
    ],
    calltoaction:
      "Sign in to Pay My Mortgage and manage your mortgage payments effortlessly",
  },
  {
    tag: "retail_offices",
    title: "Retail Mortgage Offices",
    description:
      "Visit our Retail Mortgage Offices for personalized mortgage assistance. Our knowledgeable staff is here to help you with your home financing needs.",
    features: [
      "Expert mortgage advice",
      "Personalized service",
      "Convenient locations",
      "Comprehensive mortgage solutions",
      "In-person support",
    ],
    calltoaction:
      "Find a Retail Mortgage Office near you and get the personalized mortgage assistance you need",
  },
];
export const faqs = [
  {
    title: "General Banking",
    items: [
      {
        question: "How do I open a new account?",
        answer:
          "To open a new account, visit our branch or go online to our website, click on get started and fill out the form. Then select the type of account you wish to open.",
      },
      {
        question: "What types of accounts do you offer?",
        answer:
          "We offer a variety of accounts including personal checking, savings, business accounts, and more. Visit our website or contact us for more details on each account type.",
      },
      {
        question: "How can I find my account number?",
        answer:
          "Your account number can be found on your bank statement, online banking portal dashboard, or by contacting customer service.",
      },
      {
        question: "What should I do if I lose my bank card?",
        answer:
          "If you lose your bank card, contact us immediately to report the loss and request a replacement card. You can also temporarily lock your card via our mobile app.",
      },
    ],
  },
  {
    title: "Checking Accounts",
    items: [
      {
        question: "What are the benefits of a checking account?",
        answer:
          "Our checking accounts offer benefits such as easy access to your money, online banking, mobile deposits, and more. Specific features may vary by account type.",
      },
      {
        question: "Are there any fees associated with checking accounts?",
        answer:
          "Some checking accounts may have monthly maintenance fees, overdraft fees, or ATM fees. Please review our fee schedule or contact us for details on specific accounts.",
      },
      {
        question: "How can I avoid overdraft fees?",
        answer:
          "To avoid overdraft fees, keep track of your account balance, set up balance alerts, and consider enrolling in overdraft protection.",
      },
    ],
  },
  {
    title: "Savings Accounts",
    items: [
      {
        question: "What is the minimum balance required for a savings account?",
        answer: "There is none",
      },
      {
        question: "How often can I withdraw from my savings account?",
        answer:
          "Federal regulations limit certain types of withdrawals and transfers from savings accounts to six per month. For more information, please refer to our savings account terms and conditions.",
      },
      {
        question: "Are there any fees for savings accounts?",
        answer:
          "Some savings accounts may have monthly maintenance fees if the minimum balance is not maintained. Please review our fee schedule for details.",
      },
    ],
  },
  {
    title: "Internet Banking",
    items: [
      {
        question: "How do I enroll in internet banking?",
        answer:
          "Simply register and activate the type of account you want and start enjoying seemless internet banking.",
      },
      {
        question: "What features are available in internet banking?",
        answer:
          "Internet banking allows you to view account balances, transfer funds, pay bills, view statements, and more.",
      },
      {
        question: "Is internet banking secure?",
        answer:
          "Yes, we use advanced security measures such as encryption and multi-factor authentication to protect your information.",
      },
    ],
  },
  {
    title: "Home Loans",
    items: [
      {
        question: "What types of home loans do you offer?",
        answer:
          "We offer a variety of home loans including fixed-rate mortgages, adjustable-rate mortgages, FHA loans, VA loans, and more.",
      },
      {
        question: "How do I apply for a home loan?",
        answer:
          "To apply for a home loan, visit our website or contact one of our mortgage specialists to start the application process.",
      },
      {
        question: "What documents do I need to apply for a home loan?",
        answer:
          "Commonly required documents include proof of income, tax returns, bank statements, and identification. Additional documents may be required based on your specific situation.",
      },
      {
        question: "How long does it take to get approved for a home loan?",
        answer:
          "The approval process can vary, but it typically takes 30 to 45 days. Providing complete and accurate information can help speed up the process.",
      },
    ],
  },
  {
    title: "Customer Support",
    items: [
      {
        question: "How can I contact customer support?",
        answer: "You can contact customer support via our support page.",
      },
      {
        question: "What are your customer support hours?",
        answer:
          "Customer support is available Monday through Friday, 9 AM to 5 PM. After-hours support is available for urgent issues.",
      },
      {
        question: "How can I resolve a dispute with a transaction?",
        answer:
          "To resolve a dispute, contact customer support with the details of the transaction in question. We will investigate and assist you in resolving the issue.",
      },
    ],
  },
];
