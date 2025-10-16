
"use client";

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const ScientificCalculator = dynamic(() => import('@/components/calculators/scientific-calculator'), {
  loading: () => <Skeleton className="h-[500px] w-full max-w-xs" />,
  ssr: false,
});

export default function ScientificCalculatorLoader() {
  return <ScientificCalculator />;
}
