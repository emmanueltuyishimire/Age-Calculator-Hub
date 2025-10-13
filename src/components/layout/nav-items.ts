import {
  Baby,
  Briefcase,
  Calculator,
  HeartPulse,
  PawPrint,
  FileHeart,
  type LucideIcon,
  Home,
  Clock
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
    category: 'Human Age',
    description: 'Calculate your exact age from your date of birth.'
  },
  {
    href: '/age-calculator-online',
    icon: Clock,
    label: 'Age Calculator Online',
    category: 'Human Age',
    description: 'A real-time online tool to calculate your age instantly.'
  },
  {
    href: '/biological-age',
    icon: HeartPulse,
    label: 'Biological Age',
    category: 'Human Age',
    description: 'Estimate your biological age based on lifestyle factors.'
  },
  {
    href: '/pet-age',
    icon: PawPrint,
    label: 'Pet Age',
    category: 'Pet Age',
    description: 'Find out how old your pet is in human years.'
  },
  {
    href: '/retirement-age',
    icon: Briefcase,
    label: 'Retirement Age',
    category: 'Life Events',
    description: 'Determine your full retirement age for social security.'
  },
  {
    href: '/gestational-age',
    icon: Baby,
    label: 'Gestational Age',
    category: 'Life Events',
    description: 'Calculate gestational age and estimated due date.'
  },
  {
    href: '/health-assessments',
    icon: FileHeart,
    label: 'Health Assessments',
    category: 'Health',
    description: 'Tools to assess health-related age factors.'
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
