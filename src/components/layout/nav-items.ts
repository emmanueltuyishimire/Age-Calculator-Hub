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
   {
    href: '/core-age-calculators',
    icon: Calculator,
    label: 'Core Age Calculators',
    category: 'Core Age Calculation',
    description: 'Calculate your chronological age, time until birthday, and more.'
  },
  {
    href: '/age-calculator',
    icon: Calculator,
    label: 'Age Calculator',
    category: 'Core Age Calculation',
    description: 'Calculates age from date of birth in years, months, and days.'
  },
  {
    href: '/how-old-is',
    icon: HelpCircle,
    label: 'How Old Is...?',
    category: 'Core Age Calculation',
    description: 'Quickly find out how old someone is from their birth date.'
  },
  {
    href: '/chronological-age-calculator',
    icon: Clock,
    label: 'Chronological Age Calculator',
    category: 'Core Age Calculation',
    description: 'Find your exact age in years, months, and days.'
  },
  {
    href: '/age-calculator-by-date-of-birth',
    icon: User,
    label: 'Age Calculator by Date of Birth',
    category: 'Core Age Calculation',
    description: 'Input birth date → get exact age today.'
  },
    {
    href: '/age-calculator-by-year',
    icon: CalendarIcon,
    label: 'Age Calculator by Year',
    category: 'Core Age Calculation',
    description: 'Get a quick age estimate from just the birth year.'
  },
  {
    href: '/birthday-age-calculator',
    icon: Cake,
    label: 'Birthday Age Calculator',
    category: 'Core Age Calculation',
    description: 'Emphasize birthdays and countdown to next birthday.'
  },
  {
    href: '/biological-age',
    icon: HeartPulse,
    label: 'Biological Age Calculator',
    category: 'Scientific & Health Age',
    description: 'Estimates body’s biological age based on health/lifestyle inputs.'
  },
   {
    href: '/metabolic-age',
    icon: Zap,
    label: 'Metabolic Age Calculator',
    category: 'Scientific & Health Age',
    description: 'Find out your body’s metabolic age based on your BMR.'
  },
  {
    href: '/health-assessments',
    icon: Stethoscope,
    label: 'Health Assessments',
    category: 'Scientific & Health Age',
    description: 'Tools to assess various health-related age factors.'
  },
  {
    href: '/dog-age',
    icon: Dog,
    label: 'Dog Age Calculator',
    category: 'Pet Age',
    description: 'Find out how old your dog is in human years.'
  },
   {
    href: '/cat-age-in-human-years',
    icon: Cat,
    label: 'Cat Age Calculator',
    category: 'Pet Age',
    description: 'Find out how old your cat is in human years.'
  },
  {
    href: '/life-insurance-calculator',
    icon: ShieldCheck,
    label: 'Life Insurance Calculator',
    category: 'Financial Planning',
    description: 'Estimate how much life insurance coverage you really need.'
  },
   {
    href: '/retirement-savings-goal-calculator',
    icon: Target,
    label: 'Retirement Savings Goal Calculator',
    category: 'Financial Planning',
    description: 'Estimate how much money you need to save for retirement.'
  },
  {
    href: '/retirement',
    icon: Briefcase,
    label: 'Retirement Age Calculator',
    category: 'Retirement & Social',
    description: 'Estimates retirement eligibility based on birth year.'
  },
  {
    href: '/social-security-retirement-age-calculator',
    icon: PiggyBank,
    label: 'Social Security Retirement Age Calculator',
    category: 'Retirement & Social',
    description: 'Find your Full Retirement Age (FRA) for Social Security benefits.'
  },
  {
    href: '/pregnancy-calculators',
    icon: CalendarHeart,
    label: 'Pregnancy Calculators Hub',
    category: 'Pregnancy & Baby',
    description: 'A hub for all pregnancy-related calculators.'
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
  {
    href: '/about',
    icon: Info,
    label: 'About Us',
    category: 'Company',
    description: 'Learn more about Age Calculator Hub.'
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
  'Core Age Calculation': '/core-age-calculators',
  'Pregnancy & Baby': '/pregnancy-calculators',
  'Scientific & Health Age': '/health-assessments',
  'Pet Age': '/pet-age-calculators',
  'Retirement & Social': '/retirement-calculators',
  'Financial Planning': '/financial-planning',
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
    'Core Age Calculation',
    'Pregnancy & Baby',
    'Scientific & Health Age',
    'Pet Age',
    'Financial Planning',
    'Retirement & Social',
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
      const hubItem: NavItem = {
        href: hubHref,
        icon: LayoutGrid,
        label: `All ${key}`,
        category: key,
        description: `View all ${key.toLowerCase()} tools.`
      };
      
      // Check if hub item already exists
      if (!categoryItems.some(item => item.href === hubHref)) {
        categoryItems = [hubItem, ...categoryItems];
      }
    }

    return {
      name: key,
      items: categoryItems,
      href: hubHref,
    };
  });
};
