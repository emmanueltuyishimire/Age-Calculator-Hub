
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
  Percent,
  Boxes,
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
    description: 'Return to the main hub.'
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
    icon: Calculator,
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
    href: '/age-calculator-by-year',
    icon: CalendarIcon,
    label: 'Age by Year Calculator',
    category: 'Core Age Calculators',
    description: 'Quickly estimate age by only entering the year of birth.'
  },
  {
    href: '/age-calculator-by-date-of-birth',
    icon: CalendarDays,
    label: 'Online Age Calculator',
    category: 'Core Age Calculators',
    description: 'A real-time tool to find your age from your date of birth.'
  },
  {
    href: '/how-old-is',
    icon: HelpCircle,
    label: 'How Old Is...?',
    category: 'Core Age Calculators',
    description: 'A quick age finder to determine how old someone is from their birth date.'
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
    href: '/mortgage-calculator',
    icon: Landmark,
    label: 'Mortgage Calculator',
    category: 'Financial Calculators',
    description: 'Estimate your monthly mortgage payment with PITI.'
  },
  {
    href: '/auto-loan-calculator',
    icon: Car,
    label: 'Auto Loan Calculator',
    category: 'Financial Calculators',
    description: 'Estimate your monthly car payment and total loan cost.'
  },
  {
    href: '/life-insurance-calculator',
    icon: ShieldCheck,
    label: 'Life Insurance Calculator',
    category: 'Financial Calculators',
    description: 'Estimate how much life insurance coverage you really need.'
  },
   {
    href: '/retirement-savings-goal-calculator',
    icon: Target,
    label: 'Retirement Savings Goal Calculator',
    category: 'Financial Calculators',
    description: 'Estimate how much money you need to save for retirement.'
  },
  {
    href: '/savings-goal-calculator',
    icon: Goal,
    label: 'Savings Goal Calculator',
    category: 'Financial Calculators',
    description: 'Find out how much you need to save to reach your goal.'
  },
  {
    href: '/loan-payoff-calculator',
    icon: Landmark,
    label: 'Loan Payoff Calculator',
    category: 'Financial Calculators',
    description: 'Calculate how long it will take to pay off a loan.'
  },
  {
    href: '/social-security-retirement-age-calculator',
    icon: PiggyBank,
    label: 'Social Security Retirement Age Calculator',
    category: 'Financial Calculators',
    description: 'Find your Full Retirement Age (FRA) for Social Security benefits.'
  },

  // Health & Fitness Calculators
  {
    href: '/health-fitness-calculators',
    icon: HeartPulse,
    label: 'Health & Fitness Calculators',
    category: 'Health & Fitness',
    description: 'A hub for all health, fitness, and scientific calculators.'
  },
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

   // Pregnancy & Baby Calculators
   {
    href: '/pregnancy-calculators',
    icon: Baby,
    label: 'Pregnancy & Baby Calculators',
    category: 'Pregnancy & Baby',
    description: 'A hub for due date, ovulation, and baby age tracking tools.'
  },
   {
    href: '/pregnancy-calculator',
    icon: CalendarHeart,
    label: 'Pregnancy Calculator',
    category: 'Pregnancy & Baby',
    description: 'Estimate your pregnancy week, due date, and conception date.'
  },
  {
    href: '/due-date-calculator',
    icon: CalendarCheck,
    label: 'Due Date Calculator',
    category: 'Pregnancy & Baby',
    description: 'Predict your baby\'s due date from LMP, conception, or IVF.'
  },
  {
    href: '/ovulation-calculator',
    icon: ClipboardList,
    label: 'Ovulation Calculator',
    category: 'Pregnancy & Baby',
    description: 'Predict your fertile window and ovulation day.'
  },
  {
    href: '/gestational-age',
    icon: FileHeart,
    label: 'Gestational Age Calculator',
    category: 'Pregnancy & Baby',
    description: 'Calculates pregnancy gestational age from last menstrual period or due date.'
  },
  {
    href: '/baby-age-calculator',
    icon: Baby,
    label: 'Baby Age Calculator',
    category: 'Pregnancy & Baby',
    description: 'Calculate your baby\'s age in weeks, months, and days.'
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
    icon: Percent,
    label: 'Percentage Calculator',
    category: 'Math Calculators',
    description: 'A suite of tools for all your percentage calculation needs.'
  },
   {
    href: '/volume-calculator',
    icon: Boxes,
    label: 'Volume Calculator',
    category: 'Math Calculators',
    description: 'Calculate the volume of common shapes like spheres, cones, and cubes.'
  },
  
  // Other Calculators (Pet, Legal, etc. might go here or their own categories)
  {
    href: '/pet-age-calculators',
    icon: PawPrint,
    label: 'Pet Age Calculators',
    category: 'Other',
    description: 'A hub for our dog and cat age conversion tools.'
  },
  {
    href: '/dog-age',
    icon: Dog,
    label: 'Dog Age Calculator',
    category: 'Other',
    description: 'Find out how old your dog is in human years.'
  },
   {
    href: '/cat-age-in-human-years',
    icon: Cat,
    label: 'Cat Age Calculator',
    category: 'Other',
    description: 'Find out how old your cat is in human years.'
  },
  
  // Legal Estimators
  {
    href: '/legal-estimators',
    icon: Scale,
    label: 'Legal Estimators',
    category: 'Legal Estimators',
    description: 'A hub for our legal information and estimation tools.'
  },
  {
    href: '/statute-of-limitations',
    icon: BookOpen,
    label: 'Statute of Limitations Calculator',
    category: 'Legal Estimators',
    description: 'Estimate legal filing deadlines for common claims.'
  },
  {
    href: '/child-support-calculator',
    icon: Users,
    label: 'Child Support Calculator',
    category: 'Legal Estimators',
    description: 'Get a simple estimate of potential child support payments.'
  },

  // Company & Legal Links (for footer and mobile nav)
  {
    href: '/about',
    icon: Info,
    label: 'About Us',
    category: 'Company',
    description: 'Learn more about Calculator Hub.'
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
  'Health & Fitness': '/health-fitness-calculators',
  'Core Age Calculators': '/core-age-calculators',
  'Pregnancy & Baby': '/pregnancy-calculators',
  'Math Calculators': '/math-calculators',
  'Legal Estimators': '/legal-estimators',
  'Other': '/other-calculators',
};


export const categorizedNavItems = (): NavCategory[] => {
  const categories: { [key: string]: NavItem[] } = {};
  navItems.forEach(item => {
    if (item.category === 'Navigation') return;
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
    'Core Age Calculators',
    'Health & Fitness',
    'Pregnancy & Baby',
    'Financial Calculators',
    'Math Calculators',
    'Legal Estimators',
    'Other',
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
