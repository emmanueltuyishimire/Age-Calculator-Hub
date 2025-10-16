
import {
  Baby,
  Briefcase,
  Calculator,
  HeartPulse,
  PawPrint,
  FileHeart,
  type LucideIcon,
  Home,
  Clock,
  Cake,
  CalendarDays,
  User,
  TestTube,
  Scale,
  GitMerge,
  Dog,
  Cat,
  Stethoscope,
  CalendarHeart,
  CalendarCheck,
  ClipboardList,
  ShieldCheck,
  Info,
  Mail,
  Shield,
  FileText,
  AlertTriangle,
  LayoutGrid,
  Newspaper,
  Calendar as CalendarIcon,
  Zap,
  HelpCircle,
  PiggyBank,
  Target,
  Goal,
  Landmark,
  PieChart,
  Brain,
  Users,
  BookOpen,
  Hash,
  DollarSign,
  Car,
  FlaskConical,
  Cuboid,
  Percent,
  CreditCard,
  GraduationCap,
  FileBarChart,
  TrendingUp,
  Tag,
  Sailboat,
  Wallet,
} from 'lucide-react';

export type NavItem = {
  href: string;
  icon: LucideIcon;
  label: string;
  category: string;
  description: string;
};

export type NavCategory = {
  name: string;
  items: NavItem[];
  href?: string;
};

export const navItems: NavItem[] = [
  // General Navigation
  {
    href: '/',
    icon: Home,
    label: 'Home',
    category: 'Navigation',
    description: 'Return to the homepage.'
  },
  {
    href: '/articles',
    icon: Newspaper,
    label: 'Articles',
    category: 'Navigation',
    description: 'Read our latest articles.'
  },

  // Core Age Calculators
  {
    href: '/core-age-calculators',
    icon: Clock,
    label: 'Core Age Calculators',
    category: 'Core Age Calculators',
    description: 'A hub for chronological age and birthday tools.'
  },
  {
    href: '/age-calculator',
    icon: Clock,
    label: 'Age Calculator',
    category: 'Core Age Calculators',
    description: 'Calculates age from date of birth in years, months, and days.'
  },
  {
    href: '/birthday-age-calculator',
    icon: Cake,
    label: 'Birthday Calculator',
    category: 'Core Age Calculators',
    description: 'Find your exact age and see a live countdown to your next birthday.'
  },
  {
    href: '/how-old-is',
    icon: HelpCircle,
    label: 'How Old Is...?',
    category: 'Core Age Calculators',
    description: 'A quick age finder to determine how old someone is from their birth date.'
  },
  {
    href: '/age-calculator-by-year',
    icon: CalendarIcon,
    label: 'Age by Year Calculator',
    category: 'Core Age Calculators',
    description: 'Quickly estimate age by only entering the year of birth.'
  },

  // Fitness & Health Calculators
  {
    href: '/health-fitness-calculators',
    icon: HeartPulse,
    label: 'Fitness & Health Calculators',
    category: 'Fitness & Health Calculators',
    description: 'A hub for all health, fitness, and scientific calculators.'
  },
  {
    href: '/biological-age',
    icon: TestTube,
    label: 'Biological Age Calculator',
    category: 'Fitness & Health Calculators',
    description: 'Estimates body’s biological age based on health/lifestyle inputs.'
  },
   {
    href: '/metabolic-age',
    icon: Zap,
    label: 'Metabolic Age Calculator',
    category: 'Fitness & Health Calculators',
    description: 'Find out your body’s metabolic age based on your BMR.'
  },
  {
    href: '/target-heart-rate-calculator',
    icon: HeartPulse,
    label: 'Target Heart Rate Calculator',
    category: 'Fitness & Health Calculators',
    description: 'Find your ideal heart rate zones for exercise (fat burn, cardio, peak).'
  },
  {
    href: '/macro-calculator',
    icon: PieChart,
    label: 'Macro Calculator',
    category: 'Fitness & Health Calculators',
    description: 'Get daily protein, carb, and fat intake recommendations.'
  },
  {
    href: '/bmi-calculator',
    icon: Scale,
    label: 'BMI Calculator',
    category: 'Fitness & Health Calculators',
    description: 'Calculate your Body Mass Index to assess your weight status.'
  },
  {
    href: '/bmr-calculator',
    icon: Brain,
    label: 'BMR Calculator',
    category: 'Fitness & Health Calculators',
    description: 'Estimate your Basal Metabolic Rate (calories burned at rest).'
  },
  {
    href: '/body-fat-calculator',
    icon: Stethoscope,
    label: 'Body Fat Calculator',
    category: 'Fitness & Health Calculators',
    description: 'Estimate your body fat percentage using the U.S. Navy method.'
  },
   {
    href: '/pregnancy-calculator',
    icon: CalendarHeart,
    label: 'Pregnancy Calculator',
    category: 'Fitness & Health Calculators',
    description: 'Estimate your pregnancy week, due date, and conception date.'
  },
  {
    href: '/due-date-calculator',
    icon: CalendarCheck,
    label: 'Due Date Calculator',
    category: 'Fitness & Health Calculators',
    description: 'Predict your baby\'s due date from LMP, conception, or IVF.'
  },
  {
    href: '/ovulation-calculator',
    icon: ClipboardList,
    label: 'Ovulation Calculator',
    category: 'Fitness & Health Calculators',
    description: 'Predict your fertile window and ovulation day.'
  },
  {
    href: '/gestational-age',
    icon: FileHeart,
    label: 'Gestational Age Calculator',
    category: 'Fitness & Health Calculators',
    description: 'Calculates pregnancy gestational age from last menstrual period or due date.'
  },
  {
    href: '/baby-age-calculator',
    icon: Baby,
    label: 'Baby Age Calculator',
    category: 'Fitness & Health Calculators',
    description: 'Calculate your baby\'s age in weeks, months, and days.'
  },
  
  // Retirement & Social Security
  {
    href: '/retirement-calculators',
    icon: PiggyBank,
    label: 'Retirement & Social Security',
    category: 'Retirement & Social Security',
    description: 'A hub for retirement planning and Social Security tools.'
  },
  {
    href: '/social-security-retirement-age-calculator',
    icon: PiggyBank,
    label: 'Retirement Age Calculator',
    category: 'Retirement & Social Security',
    description: 'Find your Full Retirement Age (FRA) for Social Security benefits.'
  },
  {
    href: '/social-security-calculator',
    icon: Scale,
    label: 'Social Security Calculator',
    category: 'Retirement & Social Security',
    description: 'Find your break-even age for claiming Social Security benefits.'
  },
  {
    href: '/retirement-savings-goal-calculator',
    icon: Target,
    label: 'Retirement Savings Goal Calculator',
    category: 'Retirement & Social Security',
    description: 'Estimate how much you need to save for retirement.'
  },
  {
    href: '/ira-calculator',
    icon: Landmark,
    label: 'IRA Calculator',
    category: 'Retirement & Social Security',
    description: 'Compare Traditional IRAs, Roth IRAs, and taxable savings.'
  },
  {
    href: '/annuity-payout-calculator',
    icon: Landmark,
    label: 'Annuity Payout Calculator',
    category: 'Retirement & Social Security',
    description: 'Estimate annuity payouts or duration.'
  },


  // Financial Calculators
   {
    href: '/financial-calculators',
    icon: DollarSign,
    label: 'Financial Calculators',
    category: 'Financial Calculators',
    description: 'A hub for all our finance, investment, and loan calculators.'
  },
   {
    href: '/inflation-calculator',
    icon: TrendingUp,
    label: 'Inflation Calculator',
    category: 'Financial Calculators',
    description: 'Calculate the buying power of money over time using CPI data.'
  },
  {
    href: '/compound-interest-calculator',
    icon: PieChart,
    label: 'Compound Interest Calculator',
    category: 'Financial Calculators',
    description: 'Calculate the future value of an investment with contributions.'
  },
  {
    href: '/future-value-calculator',
    icon: TrendingUp,
    label: 'Future Value Calculator',
    category: 'Financial Calculators',
    description: 'Calculate the future value of an investment with periodic deposits.'
  },
   {
    href: '/finance-calculator',
    icon: Briefcase,
    label: 'Finance Calculator',
    category: 'Financial Calculators',
    description: 'A TVM calculator to solve for FV, PV, PMT, N, or I/Y.'
  },
  {
    href: '/payback-period-calculator',
    icon: Wallet,
    label: 'Payback Period Calculator',
    category: 'Financial Calculators',
    description: 'Calculate simple & discounted payback periods for investments.'
  },
  {
    href: '/rental-property-calculator',
    icon: Home,
    label: 'Rental Property Calculator',
    category: 'Financial Calculators',
    description: 'Analyze real estate investments with IRR, Cap Rate, and cash flow.'
  },
  {
    href: '/salary-calculator',
    icon: Briefcase,
    label: 'Salary Calculator',
    category: 'Financial Calculators',
    description: 'Convert your salary between different pay frequencies.'
  },
  {
    href: '/take-home-pay-calculator',
    icon: Briefcase,
    label: 'Take-Home Pay Calculator',
    category: 'Financial Calculators',
    description: 'Estimate your paycheck after taxes and deductions using W-4 info.'
  },
  {
    href: '/dti-calculator',
    icon: Scale,
    label: 'DTI Calculator',
    category: 'Financial Calculators',
    description: 'Calculate your Debt-to-Income ratio to assess your financial health.'
  },
   {
    href: '/average-return-calculator',
    icon: TrendingUp,
    label: 'Average Return Calculator',
    category: 'Financial Calculators',
    description: 'Calculate IRR from cash flows or average returns from multiple investments.'
  },
  {
    href: '/student-loan-calculator',
    icon: GraduationCap,
    label: 'Student Loan Calculator',
    category: 'Financial Calculators',
    description: 'Estimate payments, analyze payoff strategies, and project future loan balances.'
  },
  {
    href: '/income-tax-calculator',
    icon: DollarSign,
    label: 'Income Tax Calculator',
    category: 'Financial Calculators',
    description: 'Estimate your federal tax refund or amount owed.'
  },
  {
    href: '/estate-tax-calculator',
    icon: Landmark,
    label: 'Estate Tax Calculator',
    category: 'Financial Calculators',
    description: 'Estimate your federal estate tax liability.'
  },
  {
    href: '/rent-calculator',
    icon: Home,
    label: 'Rent Calculator',
    category: 'Financial Calculators',
    description: 'Estimate how much rent you can afford based on your income.'
  },
  {
    href: '/bond-calculator',
    icon: FileBarChart,
    label: 'Bond Calculator',
    category: 'Financial Calculators',
    description: 'Calculate bond price, yield, and accrued interest.'
  },
  {
    href: '/simple-interest-calculator',
    icon: DollarSign,
    label: 'Simple Interest Calculator',
    category: 'Financial Calculators',
    description: 'Calculate simple interest on a loan or investment.'
  },
  {
    href: '/discount-calculator',
    icon: Tag,
    label: 'Discount Calculator',
    category: 'Financial Calculators',
    description: 'Calculate the final price after a percentage or fixed amount off.'
  },
  {
    href: '/payment-calculator',
    icon: DollarSign,
    label: 'Payment Calculator',
    category: 'Financial Calculators',
    description: 'Estimate the monthly payment for any type of loan.'
  },
  {
    href: '/interest-rate-calculator',
    icon: Percent,
    label: 'Interest Rate Calculator',
    category: 'Financial Calculators',
    description: 'Solve for the interest rate (APR) of a loan from its payments.'
  },
  {
    href: '/amortization-calculator',
    icon: Landmark,
    label: 'Amortization Calculator',
    category: 'Financial Calculators',
    description: 'See a detailed payment schedule for your mortgage, auto, or personal loan.'
  },
  {
    href: '/mortgage-calculator',
    icon: Landmark,
    label: 'Mortgage Calculator',
    category: 'Financial Calculators',
    description: 'Estimate your monthly mortgage payment with PITI.'
  },
  {
    href: '/refinance-calculator',
    icon: Home,
    label: 'Refinance Calculator',
    category: 'Financial Calculators',
    description: 'See if refinancing your loan makes financial sense.'
  },
  {
    href: '/down-payment-calculator',
    icon: Home,
    label: 'Down Payment Calculator',
    category: 'Financial Calculators',
    description: 'Plan your home down payment from multiple angles.'
  },
  {
    href: '/house-affordability-calculator',
    icon: Home,
    label: 'House Affordability Calculator',
    category: 'Financial Calculators',
    description: 'Estimate how much house you can realistically afford.'
  },
  {
    href: '/auto-loan-calculator',
    icon: Car,
    label: 'Auto Loan Calculator',
    category: 'Financial Calculators',
    description: 'Estimate your monthly car payment and total loan cost.'
  },
  {
    href: '/auto-lease-calculator',
    icon: Car,
    label: 'Auto Lease Calculator',
    category: 'Financial Calculators',
    description: 'Estimate your monthly car lease payment and see a breakdown of costs.'
  },
  {
    href: '/boat-loan-calculator',
    icon: Sailboat,
    label: 'Boat Loan Calculator',
    category: 'Financial Calculators',
    description: 'Estimate your monthly boat payment and total loan cost.'
  },
   {
    href: '/fha-loan-calculator',
    icon: Home,
    label: 'FHA Loan Calculator',
    category: 'Financial Calculators',
    description: 'Estimate monthly payments for an FHA mortgage, including MIP.'
  },
  {
    href: '/life-insurance-calculator',
    icon: ShieldCheck,
    label: 'Life Insurance Calculator',
    category: 'Financial Calculators',
    description: 'Estimate how much life insurance coverage you really need.'
  },
  {
    href: '/loan-calculator',
    icon: Landmark,
    label: 'Loan Calculator',
    category: 'Financial Calculators',
    description: 'A comprehensive calculator for various loan types like amortized and deferred payment.'
  },
  {
    href: '/credit-card-payoff-calculator',
    icon: CreditCard,
    label: 'Credit Card Payoff Calculator',
    category: 'Financial Calculators',
    description: 'Create a payoff plan for multiple credit cards using the Debt Avalanche method.'
  },
   {
    href: '/debt-consolidation-calculator',
    icon: Scale,
    label: 'Debt Consolidation Calculator',
    category: 'Financial Calculators',
    description: 'Compare current debts with a consolidation loan to see potential savings.'
  },
  
  // Math Calculators
  {
    href: '/math-calculators',
    icon: Hash,
    label: 'Math Calculators',
    category: 'Math Calculators',
    description: 'A hub for all our mathematical and scientific calculators.'
  },
  {
    href: '/scientific-calculator',
    icon: FlaskConical,
    label: 'Scientific Calculator',
    category: 'Math Calculators',
    description: 'An online scientific calculator with advanced functions.'
  },
  {
    href: '/percentage-calculator',
    icon: Calculator,
    label: 'Percentage Calculator',
    category: 'Math Calculators',
    description: 'A versatile tool for all types of percentage calculations.'
  },
  {
    href: '/vat-calculator',
    icon: Percent,
    label: 'VAT Calculator',
    category: 'Math Calculators',
    description: 'Easily add or remove Value Added Tax (VAT) from a price.'
  },
  {
    href: '/volume-calculator',
    icon: Cuboid,
    label: 'Volume Calculator',
    category: 'Math Calculators',
    description: 'Calculate the volume of common 3D shapes like spheres, cubes, and cylinders.'
  },
  
  // Other Calculators (Pet, Legal, etc.)
  {
    href: '/other-calculators',
    icon: LayoutGrid,
    label: 'Other Calculators',
    category: 'Other Calculators',
    description: 'A hub for pet age, legal estimators, and more.'
  },
  {
    href: '/dog-age',
    icon: Dog,
    label: 'Dog Age Calculator',
    category: 'Other Calculators',
    description: 'Find out how old your dog is in human years based on size.'
  },
   {
    href: '/cat-age-in-human-years',
    icon: Cat,
    label: 'Cat Age Calculator',
    category: 'Other Calculators',
    description: 'Find out how old your cat is in human years.'
  },
  {
    href: '/statute-of-limitations',
    icon: BookOpen,
    label: 'Statute of Limitations Calculator',
    category: 'Other Calculators',
    description: 'Estimate legal filing deadlines for common claims.'
  },
  {
    href: '/child-support-calculator',
    icon: Users,
    label: 'Child Support Calculator',
    category: 'Other Calculators',
    description: 'Get a simple estimate of potential child support payments.'
  },
  
  // Company & Legal Links (for footer and mobile nav)
  {
    href: '/about',
    icon: Info,
    label: 'About Us',
    category: 'Company',
    description: 'Learn more about Calculators.'
  },
  {
    href: '/contact',
    icon: Mail,
    label: 'Contact Us',
    category: 'Company',
    description: 'Get in touch with our team.'
  },
  {
    href: '/privacy',
    icon: Shield,
    label: 'Privacy Policy',
    category: 'Legal',
    description: 'Read our privacy policy.'
  },
  {
    href: '/terms',
    icon: FileText,
    label: 'Terms of Service',
    category: 'Legal',
    description: 'Read our terms of service.'
  },
  {
    href: '/disclaimer',
    icon: AlertTriangle,
    label: 'Disclaimer',
    category: 'Legal',
    description: 'Read our disclaimer.'
  },
];

const categoryHubs: Record<string, string> = {
  'Financial Calculators': '/financial-calculators',
  'Fitness & Health Calculators': '/health-fitness-calculators',
  'Core Age Calculators': '/core-age-calculators',
  'Math Calculators': '/math-calculators',
  'Other Calculators': '/other-calculators',
  'Retirement & Social Security': '/retirement-calculators',
};


export const categorizedNavItems = (): NavCategory[] => {
  const categories: { [key: string]: NavItem[] } = {};
  navItems.forEach(item => {
    if (!categories[item.category]) {
      categories[item.category] = [];
    }
    // Avoid adding the hub page itself to its own dropdown list
    if (item.href !== categoryHubs[item.category]) {
        categories[item.category].push(item);
    }
  });
  
  // Define the desired order
  const categoryOrder = [
    'Navigation',
    'Core Age Calculators',
    'Financial Calculators',
    'Retirement & Social Security',
    'Fitness & Health Calculators',
    'Math Calculators',
    'Other Calculators',
    'Company',
    'Legal',
  ];

  // Sort categories based on the defined order
  const sortedCategories = Object.keys(categories).sort((a, b) => {
    return categoryOrder.indexOf(a) - categoryOrder.indexOf(b);
  });

  return sortedCategories.map(key => {
    const hubHref = categoryHubs[key];
    let categoryItems = categories[key];

    // Add a link to the hub page as the first item if it exists
    if (hubHref) {
      const hubItem = navItems.find(item => item.href === hubHref);
      if (hubItem) {
          categoryItems = [hubItem, ...categoryItems.filter(i => i.href !== hubHref)];
      }
    }

    return {
      name: key,
      items: categoryItems,
      href: hubHref,
    };
  });
};
