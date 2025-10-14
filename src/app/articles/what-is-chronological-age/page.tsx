
import { type Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/lib/articles';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { categorizedNavItems } from '@/components/layout/nav-items';
import { Check } from 'lucide-react';

const article = articles.find(a => a.slug === 'your-complete-guide-to-age-calculators');

if (!article) {
  return null;
}

export const metadata: Metadata = {
    title: article.title,
    description: article.description,
    alternates: {
        canonical: `/articles/${article.slug}`,
    },
};

export default function AgeCalculatorAppArticle() {
    const calculatorCategories = categorizedNavItems().filter(c => c.name !== 'Company' && c.name !== 'Legal');

  return (
    <div className="container mx-auto px-4 py-8">
      <main role="main" className="max-w-4xl mx-auto">
        <article className="prose dark:prose-invert lg:prose-xl max-w-none">
          <div className="text-center mb-8">
            <p className="text-base text-primary font-semibold">{article.category}</p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">{article.title}</h1>
            <p className="text-md md:text-lg text-muted-foreground">
              {article.description}
            </p>
          </div>

          <p className="lead">
            Welcome to the ultimate hub for all things age-related. Our Age Calculator App is more than just a single tool; it's a comprehensive suite of free online calculators designed to answer any question you have about age, time, and milestones. Whether you're looking for your exact age down to the second, curious about your body's biological age, planning for retirement, or even converting your pet's age to human years, you've come to the right place.
          </p>

          <div className="my-10 text-center">
            <Link href="/">
                <Button size="lg">Explore All Calculators</Button>
            </Link>
            <p className="text-sm text-muted-foreground mt-2">Free, instant, and accurate results.</p>
          </div>
          
          <p>
            This guide will walk you through the different types of calculators available on our app, explaining what they do and how they can provide valuable insights into your life.
          </p>

          <h2 className="text-2xl font-bold text-foreground pt-4">Core Age Calculators: The Fundamentals</h2>
          <p>
            This is the heart of our app. These tools are designed for one primary purpose: to tell you exactly how old you are with precision.
          </p>
          <ul className="list-none p-0">
             <li className="flex items-start my-2"><Check className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong><Link href="/age-calculator">Chronological Age Calculator:</Link></strong> Our most popular tool. Find your age in years, months, days, and even real-time seconds.</span></li>
             <li className="flex items-start my-2"><Check className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong><Link href="/birthday-age-calculator">Birthday Calculator:</Link></strong> Not only calculates your age but also provides a fun countdown to your next birthday.</span></li>
             <li className="flex items-start my-2"><Check className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong><Link href="/age-calculator-by-year">Age by Year Calculator:</Link></strong> Need a quick estimate? This tool gives you an approximate age using only the year of birth.</span></li>
          </ul>
           <p>
            These calculators are perfect for official documents, birthday planning, or simply satisfying your curiosity.
          </p>

          <h2 className="text-2xl font-bold text-foreground pt-4">Health & Scientific Age Calculators</h2>
          <p>
            Age isn't just a number on the calendar. Our health-focused calculators help you understand your body's true age and wellness.
          </p>
          <ul className="list-none p-0">
             <li className="flex items-start my-2"><Check className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong><Link href="/biological-age">Biological Age Calculator:</Link></strong> Are you younger or older than your years? This tool estimates your body's age based on lifestyle factors like diet, exercise, and sleep.</span></li>
             <li className="flex items-start my-2"><Check className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong><Link href="/metabolic-age">Metabolic Age Calculator:</Link></strong> Discover how your metabolism compares to others your age, giving you insight into your fitness level.</span></li>
          </ul>
          <p>
            Use these tools to gain a deeper understanding of your health and find motivation to make positive lifestyle changes. Read our <Link href="/articles/what-is-biological-age-and-how-to-improve-it">guide on biological age</Link> to learn more.
          </p>

          <h2 className="text-2xl font-bold text-foreground pt-4">Pet Age Calculators</h2>
          <p>
            Our furry friends age differently than we do. Our pet age calculators use the latest veterinary science to convert your pet's age into human years, helping you better understand their life stage and care needs.
          </p>
           <ul className="list-none p-0">
             <li className="flex items-start my-2"><Check className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong><Link href="/dog-age">Dog Age Calculator:</Link></strong> Works for all breeds, including mixed breeds. Age is calculated based on size for maximum accuracy.</span></li>
             <li className="flex items-start my-2"><Check className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong><Link href="/cat-age-in-human-years">Cat Age Calculator:</Link></strong> Convert your cat's years to human years to understand if they are a kitten, adult, or senior.</span></li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground pt-4">Pregnancy & Fertility Calculators</h2>
          <p>
            For those planning a family or expecting a new arrival, our pregnancy calculators are essential tools for tracking important milestones.
          </p>
          <ul className="list-none p-0">
             <li className="flex items-start my-2"><Check className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong><Link href="/due-date-calculator">Due Date Calculator:</Link></strong> Estimate your baby's arrival date based on LMP, conception date, or IVF.</span></li>
             <li className="flex items-start my-2"><Check className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong><Link href="/ovulation-calculator">Ovulation Calculator:</Link></strong> Pinpoint your most fertile days to help with conception planning.</span></li>
             <li className="flex items-start my-2"><Check className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong><Link href="/gestational-age">Gestational Age Calculator:</Link></strong> Track how many weeks pregnant you are.</span></li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground pt-4">Retirement & Financial Planning</h2>
           <p>
            Knowing your retirement age is a cornerstone of financial planning. Our calculator helps you understand when you'll be eligible for Social Security benefits based on your birth year.
          </p>
           <ul className="list-none p-0">
             <li className="flex items-start my-2"><Check className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong><Link href="/retirement">Retirement Age Calculator:</Link></strong> Find your full retirement age according to the Social Security Administration.</span></li>
          </ul>

          <Card className="my-8 bg-muted border-l-4 border-primary">
            <CardHeader>
                <CardTitle>Why Use Our Age Calculator App?</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start"><Check className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Accurate & Reliable:</strong> Our tools use up-to-date formulas and scientific data.</span></li>
                    <li className="flex items-start"><Check className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Completely Free:</strong> No fees, no sign-ups. Just instant, accessible information.</span></li>
                    <li className="flex items-start"><Check className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Private & Secure:</strong> All calculations are done in your browser. We do not store your personal data.</span></li>
                     <li className="flex items-start"><Check className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Comprehensive:</strong> From human age to pet age, we have a calculator for nearly every need.</span></li>
                </ul>
            </CardContent>
          </Card>

          <p>
            Our mission is to provide a single, trustworthy destination for anyone needing to calculate age in any context. Explore the calculators, read our articles, and empower yourself with knowledge. Thank you for using the Age Calculator App!
          </p>
        </article>
      </main>
    </div>
  );
}

