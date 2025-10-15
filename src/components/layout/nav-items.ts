
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

  // Fitness & Health Calculators
  {
    href: '/health-fitness-calculators',
    icon: HeartPulse,
    label: 'Fitness & Health Calculators',
    category: 'Fitness & Health Calculators',
    description: 'A hub for all health, fitness, and scientific calculators.'
  },
  {
    href: '/age-calculator',
    icon: Clock,
    label: 'Age Calculator',
    category: 'Fitness & Health Calculators',
    description: 'Calculates age from date of birth in years, months, and days.'
  },
  {
    href: '/birthday-age-calculator',
    icon: Cake,
    label: 'Birthday Calculator',
    category: 'Fitness & Health Calculators',
    description: 'Find your exact age and see a live countdown to your next birthday.'
  },
  {
    href: '/how-old-is',
    icon: HelpCircle,
    label: 'How Old Is...?',
    category: 'Fitness & Health Calculators',
    description: 'A quick age finder to determine how old someone is from their birth date.'
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
    label: 'Social Security Retirement Age',
    category: 'Financial Calculators',
    description: 'Find your Full Retirement Age (FRA) for Social Security benefits.'
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
   {
    href: '/age-calculator-by-year',
    icon: CalendarIcon,
    label: 'Age by Year Calculator',
    category: 'Other Calculators',
    description: 'Quickly estimate age by only entering the year of birth.'
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
  'Math Calculators': '/math-calculators',
  'Other Calculators': '/other-calculators',
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
    'Financial Calculators',
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
