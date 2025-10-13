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
  GitMerge
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
    href: '/age-calculator',
    icon: Calculator,
    label: 'Age Calculator',
    category: 'Core Age Calculation',
    description: 'Calculates age from date of birth in years, months, and days.'
  },
  {
    href: '/age-calculator-online',
    icon: Clock,
    label: 'Age Calculator Online',
    category: 'Core Age Calculation',
    description: 'Same as above with emphasis on online usage and instant results.'
  },
  {
    href: '/age-calculator-by-date-of-birth',
    icon: User,
    label: 'Age Calculator by Date of Birth',
    category: 'Core Age Calculation',
    description: 'Input birth date → get exact age today.'
  },
  {
    href: '/birthday-age-calculator',
    icon: Cake,
    label: 'Birthday Age Calculator',
    category: 'Core Age Calculation',
    description: 'Emphasize birthdays and countdown to next birthday.'
  },
  {
    href: '/age-calculator-by-year',
    icon: CalendarDays,
    label: 'Age Calculator by Year',
    category: 'Core Age Calculation',
    description: 'Simple tool to compare age differences by birth year only.'
  },
  {
    href: '/biological-age',
    icon: HeartPulse,
    label: 'Biological Age Calculator',
    category: 'Scientific & Health Age',
    description: 'Estimates body’s biological age based on health/lifestyle inputs.'
  },
  {
    href: '/chronological-age-calculator',
    icon: TestTube,
    label: 'Chronological Age Calculator',
    category: 'Scientific & Health Age',
    description: 'Calculates actual age in decimal form (used for research/education).'
  },
  {
    href: '/metabolic-age-calculator',
    icon: Scale,
    label: 'Metabolic Age Calculator',
    category: 'Scientific & Health Age',
    description: 'Calculates metabolic age from weight, height, BMI, and activity level.'
  },
  {
    href: '/gestational-age',
    icon: Baby,
    label: 'Gestational Age Calculator',
    category: 'Scientific & Health Age',
    description: 'Calculates pregnancy gestational age from last menstrual period or due date.'
  },
  {
    href: '/health-assessments',
    icon: FileHeart,
    label: 'Health Assessments',
    category: 'Scientific & Health Age',
    description: 'Tools to assess health-related age factors like Menopause and Blood Pressure.'
  },
  {
    href: '/pet-age',
    icon: PawPrint,
    label: 'Pet Age Calculator',
    category: 'Pet Age',
    description: 'Find out how old your pet is in human years.'
  },
  {
    href: '/retirement-age',
    icon: Briefcase,
    label: 'Retirement Age Calculator',
    category: 'Retirement & Social',
    description: 'Estimates retirement eligibility based on birth year.'
  },
];

export const categorizedNavItems = (): NavCategory[] => {
  const categories: { [key: string]: NavItem[] } = {};
  navItems.forEach(item => {
    if (item.category === 'Navigation') return;
    if (!categories[item.category]) {
      categories[item.category] = [];
    }
    categories[item.category].push(item);
  });
  return Object.keys(categories).map(key => ({
    name: key,
    items: categories[key],
  }));
};
