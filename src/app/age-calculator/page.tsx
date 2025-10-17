
import ChronologicalAgeCalculatorForm from '@/components/calculators/chronological-age-calculator-form';
import { type Metadata } from 'next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import RelatedCalculators from '@/components/layout/related-calculators';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Age Calculator – Calculate Your Exact Age Online',
    description: 'Our age calculator allows you to calculate your exact age by date of birth, by year, or by birthday. This online age calculator is easy to use and provides instant results for anyone looking to track their age accurately. It\'s a useful tool for official documents, understanding age-related milestones, or simply celebrating another year of life.',
    alternates: {
        canonical: '/age-calculator',
    },
};

const faqs = [
    {
        question: "What is the easiest way to calculate age?",
        answer: "The easiest way is to use a reliable online tool like this Age Calculator. It automatically handles all the complexities like month lengths and leap years. Just enter the date of birth and get an instant, accurate result."
    },
    {
        question: "How does an age calculator work?",
        answer: "Age calculators work by findi...