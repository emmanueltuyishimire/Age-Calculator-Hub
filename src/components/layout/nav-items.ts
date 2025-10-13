
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
    href: '/biological-age',
    icon: HeartPulse,
    label: 'Biological Age Calculator',
    category: 'Scientific & Health Age',
    description: 'Estimates body’s biological age based on health/lifestyle inputs.'
  },
  {
    href: '/health-assessments',
    icon: FileHeart,
    label: 'Health Assessments',
    category: 'Scientific & Health Age',
    description: 'Tools to assess health-related age factors like Menopause and Blood Pressure.'
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
    href: '/retirement',
    icon: Briefcase,
    label: 'Retirement Age Calculator',
    category: 'Retirement & Social',
    description: 'Estimates retirement eligibility based on birth year.'
  },
  {
    href: '/pregnancy-calculator',
    icon: CalendarHeart,
    label: 'Pregnancy Calculator',
    category: 'Pregnancy Calculators',
    description: 'Estimate your pregnancy week, due date, and conception date.'
  },
  {
    href: '/due-date-calculator',
    icon: CalendarCheck,
    label: 'Due Date Calculator',
    category: 'Pregnancy Calculators',
    description: 'Predict your baby\'s due date from LMP, conception, or IVF.'
  },
  {
    href: '/ovulation-calculator',
    icon: ClipboardList,
    label: 'Ovulation Calculator',
    category: 'Pregnancy Calculators',
    description: 'Predict your fertile window and ovulation day.'
  },
  {
    href: '/gestational-age',
    icon: Baby,
    label: 'Gestational Age Calculator',
    category: 'Pregnancy Calculators',
    description: 'Calculates pregnancy gestational age from last menstrual period or due date.'
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
  
  // Define the desired order
  const categoryOrder = [
    'Core Age Calculation',
    'Pregnancy Calculators',
    'Scientific & Health Age',
    'Pet Age',
    'Retirement & Social',
  ];

  // Sort categories based on the defined order
  const sortedCategories = Object.keys(categories).sort((a, b) => {
    return categoryOrder.indexOf(a) - categoryOrder.indexOf(b);
  });

  return sortedCategories.map(key => ({
    name: key,
    items: categories[key],
  }));
};
