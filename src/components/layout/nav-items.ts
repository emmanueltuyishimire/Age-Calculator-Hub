
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
  Heart,
  Timer,
  Divide,
  Shuffle,
  Flame,
  Binary,
  Atom,
  FunctionSquare,
  Sigma,
  Radical,
  Grid,
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
  href: string;
  items: NavItem[];
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

  // Health & Fitness Calculators
  {
    href: '/biological-age',
    icon: TestTube,
    label: 'Biological Age Calculator',
    category: 'Health & Fitness',
    description: 'Estimates body’s biological age based on health/lifestyle inputs.'
  },
   {
    href: '/metabolic-age',
    icon: Zap,
    label: 'Metabolic Age Calculator',
    category: 'Health & Fitness',
    description: 'Find out your body’s metabolic age based on your BMR.'
  },
  {
    href: '/target-heart-rate-calculator',
    icon: HeartPulse,
    label: 'Target Heart Rate Calculator',
    category: 'Health & Fitness',
    description: 'Find your ideal heart rate zones for exercise (fat burn, cardio, peak).'
  },
  {
    href: '/macro-calculator',
    icon: PieChart,
    label: 'Macro Calculator',
    category: 'Health & Fitness',
    description: 'Get daily protein, carb, and fat intake recommendations.'
  },
  {
    href: '/bmi-calculator',
    icon: Scale,
    label: 'BMI Calculator',
    category: 'Health & Fitness',
    description: 'Calculate your Body Mass Index to assess your weight status.'
  },
  {
    href: '/bmr-calculator',
    icon: Brain,
    label: 'BMR Calculator',
    category: 'Health & Fitness',
    description: 'Estimate your Basal Metabolic Rate (calories burned at rest).'
  },
  {
    href: '/body-fat-calculator',
    icon: Stethoscope,
    label: 'Body Fat Calculator',
    category: 'Health & Fitness',
    description: 'Estimate your body fat percentage using the U.S. Navy method.'
  },
   {
    href: '/pregnancy-calculator',
    icon: CalendarHeart,
    label: 'Pregnancy Calculator',
    category: 'Health & Fitness',
    description: 'Estimate your pregnancy week, due date, and conception date.'
  },
  {
    href: '/due-date-calculator',
    icon: CalendarCheck,
    label: 'Due Date Calculator',
    category: 'Health & Fitness',
    description: 'Predict your baby\'s due date from LMP, conception, or IVF.'
  },
  {
    href: '/ovulation-calculator',
    icon: ClipboardList,
    label: 'Ovulation Calculator',
    category: 'Health & Fitness',
    description: 'Predict your fertile window and ovulation day.'
  },
  {
    href: '/gestational-age',
    icon: FileHeart,
    label: 'Gestational Age Calculator',
    category: 'Health & Fitness',
    description: 'Calculates pregnancy gestational age from last menstrual period or due date.'
  },
  {
    href: '/baby-age-calculator',
    icon: Baby,
    label: 'Baby Age Calculator',
    category: 'Health & Fitness',
    description: 'Calculate your baby\'s age in weeks, months, and days.'
  },
  
  // Financial Calculators Hub
  {
    href: '/retirement',
    icon: PiggyBank,
    label: 'Retirement Age Calculator',
    category: 'Financial',
    description: 'Find your Full Retirement Age (FRA) for Social Security benefits.'
  },
  {
    href: '/social-security-calculator',
    icon: Scale,
    label: 'Social Security Calculator',
    category: 'Financial',
    description: 'Find your break-even age for claiming Social Security benefits.'
  },
  {
    href: '/401k-calculator',
    icon: Briefcase,
    label: '401(k) Calculator',
    category: 'Financial',
    description: 'Estimate retirement savings, withdrawal costs, and employer match.'
  },
   {
    href: '/annuity-calculator',
    icon: Wallet,
    label: 'Annuity Calculator',
    category: 'Financial',
    description: 'Estimate the future value of an annuity during its accumulation phase.'
  },
  {
    href: '/annuity-payout-calculator',
    icon: Landmark,
    label: 'Annuity Payout Calculator',
    category: 'Financial',
    description: 'Estimate annuity payouts or duration.'
  },
  {
    href: '/pension-calculator',
    icon: Briefcase,
    label: 'Pension Calculator',
    category: 'Financial',
    description: 'Evaluate pension decisions like lump sum vs. monthly income.'
  },
  {
    href: '/ira-calculator',
    icon: Landmark,
    label: 'IRA Calculator',
    category: 'Financial',
    description: 'Compare Traditional IRAs, Roth IRAs, and taxable savings.'
  },
   {
    href: '/roth-ira-calculator',
    icon: Landmark,
    label: 'Roth IRA Calculator',
    category: 'Financial',
    description: 'Compare a Roth IRA with a regular taxable investment account.'
  },
  {
    href: '/retirement-savings-goal-calculator',
    icon: Goal,
    label: 'Retirement Savings Calculator',
    category: 'Financial',
    description: 'Estimate your total nest egg needed for retirement.'
  },
   {
    href: '/rmd-calculator',
    icon: PiggyBank,
    label: 'RMD Calculator',
    category: 'Financial',
    description: 'Calculate your Required Minimum Distribution from retirement accounts.'
  },
  {
    href: '/mortgage-calculator',
    icon: Landmark,
    label: 'Mortgage Calculator',
    category: 'Financial',
    description: 'Estimate your monthly mortgage payment with PITI.'
  },
  {
    href: '/amortization-calculator',
    icon: Landmark,
    label: 'Amortization Calculator',
    category: 'Financial',
    description: 'See a detailed payment schedule for your mortgage, auto, or personal loan.'
  },
  {
    href: '/mortgage-payoff-calculator',
    icon: Home,
    label: 'Mortgage Payoff Calculator',
    category: 'Financial',
    description: 'See how extra payments can shorten your loan term.'
  },
  {
    href: '/house-affordability-calculator',
    icon: Home,
    label: 'House Affordability Calculator',
    category: 'Financial',
    description: 'Estimate how much house you can realistically afford.'
  },
  {
    href: '/rent-calculator',
    icon: Home,
    label: 'Rent Calculator',
    category: 'Financial',
    description: 'Estimate how much rent you can afford based on your income.'
  },
  {
    href: '/dti-calculator',
    icon: Scale,
    label: 'DTI Calculator',
    category: 'Financial',
    description: 'Calculate your Debt-to-Income ratio to assess your financial health.'
  },
  {
    href: '/refinance-calculator',
    icon: Home,
    label: 'Refinance Calculator',
    category: 'Financial',
    description: 'See if refinancing your loan makes financial sense.'
  },
  {
    href: '/rental-property-calculator',
    icon: Home,
    label: 'Rental Property Calculator',
    category: 'Financial',
    description: 'Analyze real estate investments with IRR, Cap Rate, and cash flow.'
  },
  {
    href: '/fha-loan-calculator',
    icon: Home,
    label: 'FHA Loan Calculator',
    category: 'Financial',
    description: 'Estimate monthly payments for an FHA mortgage, including MIP.'
  },
  {
    href: '/down-payment-calculator',
    icon: Home,
    label: 'Down Payment Calculator',
    category: 'Financial',
    description: 'Plan your home down payment from multiple angles.'
  },
  {
    href: '/auto-loan-calculator',
    icon: Car,
    label: 'Auto Loan Calculator',
    category: 'Financial',
    description: 'Estimate your monthly car payment and total loan cost.'
  },
  {
    href: '/auto-lease-calculator',
    icon: Car,
    label: 'Auto Lease Calculator',
    category: 'Financial',
    description: 'Estimate your monthly car lease payment and see a breakdown of costs.'
  },
  {
    href: '/cash-back-or-low-interest-calculator',
    icon: Car,
    label: 'Cash Back or Low Interest Calculator',
    category: 'Financial',
    description: 'Compare a cash back rebate vs. low interest rate car deal.'
  },
   {
    href: '/finance-calculator',
    icon: Briefcase,
    label: 'Finance Calculator',
    category: 'Financial',
    description: 'A TVM calculator to solve for FV, PV, PMT, N, or I/Y.'
  },
  {
    href: '/compound-interest-calculator',
    icon: PieChart,
    label: 'Compound Interest Calculator',
    category: 'Financial',
    description: 'Calculate the future value of an investment with contributions.'
  },
  {
    href: '/savings-calculator',
    icon: PiggyBank,
    label: 'Savings Calculator',
    category: 'Financial',
    description: 'Estimate your savings growth with contributions and interest.'
  },
  {
    href: '/savings-goal-calculator',
    icon: Target,
    label: 'Savings Goal Calculator',
    category: 'Financial',
    description: 'Find out how much you need to save daily, monthly, or hourly for a goal.'
  },
  {
    href: '/future-value-calculator',
    icon: TrendingUp,
    label: 'Future Value Calculator',
    category: 'Financial',
    description: 'Calculate the future value of an investment with periodic deposits.'
  },
  {
    href: '/payback-period-calculator',
    icon: Wallet,
    label: 'Payback Period Calculator',
    category: 'Financial',
    description: 'Calculate simple & discounted payback periods for investments.'
  },
  {
    href: '/bond-calculator',
    icon: FileBarChart,
    label: 'Bond Calculator',
    category: 'Financial',
    description: 'Calculate bond price, yield, and accrued interest.'
  },
  {
    href: '/simple-interest-calculator',
    icon: DollarSign,
    label: 'Simple Interest Calculator',
    category: 'Financial',
    description: 'Calculate simple interest on a loan or investment.'
  },
  {
    href: '/interest-rate-calculator',
    icon: Percent,
    label: 'Interest Rate Calculator',
    category: 'Financial',
    description: 'Solve for the interest rate (APR) of a loan from its payments.'
  },
  {
    href: '/roi-calculator',
    icon: TrendingUp,
    label: 'ROI Calculator',
    category: 'Financial',
    description: 'Measure the profitability of an investment with simple and annualized ROI.'
  },
  {
    href: '/cd-calculator',
    icon: Wallet,
    label: 'CD Calculator',
    category: 'Financial',
    description: 'Estimate the future value of a Certificate of Deposit.',
  },
  {
    href: '/salary-calculator',
    icon: Briefcase,
    label: 'Salary Calculator',
    category: 'Financial',
    description: 'Convert your salary between different pay frequencies.'
  },
  {
    href: '/take-home-pay-calculator',
    icon: Briefcase,
    label: 'Take-Home Pay Calculator',
    category: 'Financial',
    description: 'Estimate your paycheck after taxes and deductions using W-4 info.'
  },
  {
    href: '/income-tax-calculator',
    icon: DollarSign,
    label: 'Income Tax Calculator',
    category: 'Financial',
    description: 'Estimate your federal tax refund or amount owed.'
  },
  {
    href: '/marriage-tax-calculator',
    icon: Heart,
    label: 'Marriage Tax Calculator',
    category: 'Financial',
    description: 'Estimate the tax impact of marriage by comparing joint vs. single filing.'
  },
  {
    href: '/estate-tax-calculator',
    icon: Landmark,
    label: 'Estate Tax Calculator',
    category: 'Financial',
    description: 'Estimate your federal estate tax liability.'
  },
  {
    href: '/life-insurance-calculator',
    icon: ShieldCheck,
    label: 'Life Insurance Calculator',
    category: 'Financial',
    description: 'Estimate how much life insurance coverage you really need.'
  },
  {
    href: '/loan-calculator',
    icon: Landmark,
    label: 'Loan Calculator',
    category: 'Financial',
    description: 'A comprehensive calculator for various loan types like amortized and deferred payment.'
  },
  {
    href: '/debt-payoff-calculator',
    icon: CreditCard,
    label: 'Debt Payoff Calculator',
    category: 'Financial',
    description: 'Create a payoff plan for multiple debts using the Debt Avalanche method.'
  },
  {
    href: '/credit-card-calculator',
    icon: CreditCard,
    label: 'Credit Card Calculator',
    category: 'Financial',
    description: 'Calculates the time or payment needed to pay off a credit card balance.'
  },
   {
    href: '/debt-consolidation-calculator',
    icon: Scale,
    label: 'Debt Consolidation Calculator',
    category: 'Financial',
    description: 'Compare current debts with a consolidation loan to see potential savings.'
  },
   {
    href: '/inflation-calculator',
    icon: TrendingUp,
    label: 'Inflation Calculator',
    category: 'Financial',
    description: 'Calculate the buying power of money over time using CPI data.'
  },
  {
    href: '/discount-calculator',
    icon: Tag,
    label: 'Discount Calculator',
    category: 'Financial',
    description: 'Calculate the final price after a percentage or fixed amount off.'
  },
  {
    href: '/payment-calculator',
    icon: DollarSign,
    label: 'Payment Calculator',
    category: 'Financial',
    description: 'Estimate the monthly payment for any type of loan.'
  },
  {
    href: '/boat-loan-calculator',
    icon: Sailboat,
    label: 'Boat Loan Calculator',
    category: 'Financial',
    description: 'Estimate your monthly boat payment and total loan cost.'
  },
  {
    href: '/college-cost-calculator',
    icon: GraduationCap,
    label: 'College Cost Calculator',
    category: 'Financial',
    description: 'Estimate future college costs and the savings needed.'
  },

  // Math Calculators
  {
    href: '/simple-calculator',
    icon: Calculator,
    label: 'Simple Calculator',
    category: 'Math',
    description: 'A basic calculator for everyday arithmetic operations.'
  },
  {
    href: '/scientific-calculator',
    icon: FlaskConical,
    label: 'Scientific Calculator',
    category: 'Math',
    description: 'An online scientific calculator with advanced functions.'
  },
   {
    href: '/scientific-notation-calculator',
    icon: Atom,
    label: 'Scientific Notation Calculator',
    category: 'Math',
    description: 'Perform arithmetic and conversions with scientific notation.'
  },
  {
    href: '/fraction-calculator',
    icon: Divide,
    label: 'Fraction Calculator',
    category: 'Math',
    description: 'A tool for fraction arithmetic, simplification, and conversion.'
  },
  {
    href: '/percentage-calculator',
    icon: Percent,
    label: 'Percentage Calculator',
    category: 'Math',
    description: 'A versatile tool for all types of percentage calculations.'
  },
  {
    href: '/percent-error-calculator',
    icon: Percent,
    label: 'Percent Error Calculator',
    category: 'Math',
    description: 'Calculate the percentage error between an observed and true value.'
  },
   {
    href: '/random-number-generator',
    icon: Shuffle,
    label: 'Random Number Generator',
    category: 'Math',
    description: 'Generate random integers or decimals within a specified range.'
  },
  {
    href: '/ratio-calculator',
    icon: Scale,
    label: 'Ratio Calculator',
    category: 'Math',
    description: 'Solve proportions and scale ratios up or down.'
  },
  {
    href: '/volume-calculator',
    icon: Cuboid,
    label: 'Volume Calculator',
    category: 'Math',
    description: 'Calculate the volume of common 3D shapes like spheres, cubes, and cylinders.'
  },
  {
    href: '/exponent-calculator',
    icon: Flame,
    label: 'Exponent Calculator',
    category: 'Math',
    description: 'Solve for base, exponent, or result in an exponential equation.'
  },
  {
    href: '/log-calculator',
    icon: Sigma,
    label: 'Log Calculator',
    category: 'Math',
    description: 'Solve logarithmic equations for base, argument, or result.'
  },
  {
    href: '/quadratic-calculator',
    icon: FunctionSquare,
    label: 'Quadratic Calculator',
    category: 'Math',
    description: 'Solve quadratic equations using the quadratic formula.'
   },
   {
    href: '/binary-calculator',
    icon: Hash,
    label: 'Binary Calculator',
    category: 'Math',
    description: 'Perform arithmetic and conversions with binary numbers.'
   },
   {
    href: '/hex-calculator',
    icon: Binary,
    label: 'Hex Calculator',
    category: 'Math',
    description: 'Perform arithmetic and conversions with hexadecimal numbers.'
   },
   {
    href: '/time-calculator',
    icon: Timer,
    label: 'Time Calculator',
    category: 'Math',
    description: 'Calculate duration between dates or add/subtract time.'
  },
  {
    href: '/sales-tax-calculator',
    icon: Percent,
    label: 'Sales Tax Calculator',
    category: 'Math',
    description: 'Calculate the final price of an item including sales tax.'
  },
  {
    href: '/vat-calculator',
    icon: Percent,
    label: 'VAT Calculator',
    category: 'Math',
    description: 'Easily add or remove Value Added Tax (VAT) from a price.'
  },
  {
    href: '/half-life-calculator',
    icon: Atom,
    label: 'Half-Life Calculator',
    category: 'Math',
    description: 'Solve for half-life, initial quantity, remaining quantity, or time.'
  },
  {
    href: '/root-calculator',
    icon: Radical,
    label: 'Root Calculator',
    category: 'Math',
    description: 'Calculate the square, cube, or nth root of a number.'
  },
  {
    href: '/lcm-calculator',
    icon: Sigma,
    label: 'LCM Calculator',
    category: 'Math',
    description: 'Calculate the Least Common Multiple of a set of numbers.'
  },
  {
    href: '/gcf-calculator',
    icon: Sigma,
    label: 'GCF Calculator',
    description: 'Calculate the Greatest Common Factor of a set of numbers.',
    category: 'Math',
  },
  {
    href: '/factor-calculator',
    icon: Sigma,
    label: 'Factor Calculator',
    category: 'Math',
    description: 'Find all factors and the prime factorization of an integer.'
  },
  {
    href: '/rounding-calculator',
    icon: Sigma,
    label: 'Rounding Calculator',
    category: 'Math',
    description: 'Round numbers using various methods like half up, ceiling, or to the nearest fraction.'
  },

  // Other Calculators
   {
    href: '/age-calculator',
    icon: Clock,
    label: 'Age Calculator',
    category: 'Other Calculators',
    description: 'Calculates age from date of birth in years, months, and days.'
  },
  {
    href: '/how-old-is',
    icon: HelpCircle,
    label: 'How Old Is Calculator',
    category: 'Other Calculators',
    description: 'A quick age finder to determine how old someone is from their birth date.'
  },
  {
    href: '/age-calculator-by-year',
    icon: CalendarIcon,
    label: 'Age by Year Calculator',
    category: 'Other Calculators',
    description: 'Quickly estimate age by only entering the year of birth.'
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

export const categorizedNavItems = (): NavCategory[] => {
  const categories: Record<string, { items: NavItem[], href?: string }> = {};

  // Initialize categories with their hub page URLs
  categories['Financial'] = { items: [], href: '/financial-calculators' };
  categories['Health & Fitness'] = { items: [], href: '/health-fitness-calculators' };
  categories['Math'] = { items: [], href: '/math-calculators' };
  categories['Other Calculators'] = { items: [], href: '/other-calculators' };
  categories['Navigation'] = { items: [] };
  categories['Company'] = { items: [] };
  categories['Legal'] = { items: [] };

  navItems.forEach(item => {
    if (categories[item.category]) {
      categories[item.category].items.push(item);
    }
  });

  const categoryOrder = [
    'Navigation',
    'Financial',
    'Health & Fitness',
    'Math',
    'Other Calculators',
    'Company',
    'Legal',
  ];

  return categoryOrder
    .filter(key => categories[key])
    .map(key => ({
      name: key,
      href: categories[key].href || '',
      items: categories[key].items,
    }));
};
