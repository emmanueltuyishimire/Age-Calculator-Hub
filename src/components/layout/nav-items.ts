import {
  Baby,
  Briefcase,
  Calculator,
  HeartPulse,
  PawPrint,
  FileHeart,
} from 'lucide-react';

export const navItems = [
  {
    href: '/age-calculator',
    icon: Calculator,
    label: 'Age Calculator',
  },
  {
    href: '/biological-age',
    icon: HeartPulse,
    label: 'Biological Age',
  },
  {
    href: '/pet-age',
    icon: PawPrint,
    label: 'Pet Age',
  },
  {
    href: '/retirement-age',
    icon: Briefcase,
    label: 'Retirement Age',
  },
  {
    href: '/gestational-age',
    icon: Baby,
    label: 'Gestational Age',
  },
  {
    href: '/health-assessments',
    icon: FileHeart,
    label: 'Health Assessments',
  },
];
