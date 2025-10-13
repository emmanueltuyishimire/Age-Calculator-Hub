"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Baby,
  Briefcase,
  Calculator,
  HeartPulse,
  PawPrint,
  FileHeart,
} from 'lucide-react';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

const navItems = [
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

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname === item.href}
            tooltip={item.label}
          >
            <Link href={item.href}>
              <item.icon />
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
