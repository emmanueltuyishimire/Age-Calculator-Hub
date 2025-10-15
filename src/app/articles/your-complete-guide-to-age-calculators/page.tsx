
import { type Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/lib/articles';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { notFound } from 'next/navigation';

const article = articles.find(a => a.slug === 'your-complete-guide-to-age-calculators');

export function generateMetadata(): Metadata {
  if (!article) {
    return {};
  }
  return {
    title: 'Your Complete Guide to Age Calculator Hub',
    description: article.description,
    alternates: {
        canonical: `/articles/${article.slug}`,
    },
    openGraph: {
        title: article.title,
        description: article.description,
        type: 'article',
        publishedTime: article.publishedDate,
        url: `/articles/${article.slug}`,
    },
  };
}

const faqs = [
    {
        question: "What is the most accurate type of age calculator?",
        answer: "For calculating the time you've been alive, the <a href='/age-calculator' class='text-primary hover:underline'>Chronological Age Calculator</a> is the most accurate. For health insights, the <a href='/biological-age' class='text-primary hover:underline'>Biological Age Calculator</a> provides a valuable, science-backed estimate."
    },
    {
        question: "Are the calculators on this site free to use?",
        answer: "Yes, every calculator on our platform is 100% free, with no sign-ups or hidden fees. Our mission is to provide accessible and reliable tools for everyone."
    },
    {
        question: "Is my data safe when using these calculators?",
        answer: "Yes. All calculations are performed directly in your browser (client-side). We do not see, store, or transmit any of your personal data, ensuring your privacy and security."
    },
    {
        question: "Can I use these calculators for official purposes?",
        answer: "Our chronological age calculators are precise and can be used to determine your age for official forms and applications. However, health-related calculators are for informational purposes only and should not replace professional medical advice. Please read our <a href='/disclaimer' class='text-primary hover:underline'>Disclaimer</a> for more details."
    }
];

export default function AgeCalculatorAppArticle() {
  if (!article) {
    notFound();
  }
  
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "datePublished": article.publishedDate,
    "author": {
        "@type": "Organization",
        "name": "Age Calculator Hub"
    },
    "publisher": {
        "@type": "Organization",
        "name": "Age Calculator Hub",
        "logo": {
            "@type": "ImageObject",
            "url": "https://innerpeacejournals.com/logo.png"
        }
    }
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
        }
    }))
};

  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main role="main" className="max-w-4xl mx-auto">
        <article className="prose dark:prose-invert lg:prose-xl max-w-none">
          <div className="text-center mb-12">
            <p className="text-base text-primary font-semibold">{article.category}</p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">{article.title}</h1>
            <p className="text-md md:text-lg text-muted-foreground">
              {article.description}
            </p>
          </div>

          <p className="lead">
            Welcome to the ultimate hub for all things age-related. Age Calculator Hub is more than just a single tool; it's a comprehensive suite of free, specialized online calculators designed to answer any question you might have about age, time, and life's milestones. Whether you need your exact age down to the second, are curious about your body's "true" biological age, planning for retirement, or even converting your pet's age to human years, you've come to the right place.
          </p>

          <div className="my-10 text-center">
            <Link href="/">
                <Button size="lg" className="text-lg">Explore All Calculators</Button>
            </Link>
            <p className="text-sm text-muted-foreground mt-2">Free, instant, and accurate results.</p>
          </div>
          
          <p>
            This guide will walk you through the different categories of calculators available on our site, explaining what they do, who they're for, and how they can provide valuable insights into your life and the lives of your loved ones.
          </p>

          <h2 className="text-3xl font-bold">Core Age Calculators: The Foundation of Time</h2>
          <p>
            This is the heart of our site, designed for one primary purpose: to tell you exactly how old you are with unerring precision. These tools are essential for everything from official paperwork to satisfying simple curiosity.
          </p>
          <Card className="my-6">
            <CardHeader>
                <CardTitle>Tools in this Category</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                 <li className="flex items-start"><Check className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong><Link href="/age-calculator" className="text-primary hover:underline">Chronological Age Calculator:</Link></strong> Our most popular and powerful tool. Find your age in years, months, days, and watch it update in real-time.</span></li>
                 <li className="flex items-start"><Check className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong><Link href="/birthday-age-calculator" className="text-primary hover:underline">Birthday Calculator:</Link></strong> Not only calculates your age but also provides a fun, live countdown to your next birthday celebration.</span></li>
                 <li className="flex items-start"><Check className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong><Link href="/age-calculator-by-year" className="text-primary hover:underline">Age by Year Calculator:</Link></strong> Need a quick estimate without a full birth date? This tool provides an approximate age using only the year of birth.</span></li>
            </CardContent>
          </Card>
           

          <h2 className="text-3xl font-bold">Health & Scientific Age Calculators: Look Beyond the Calendar</h2>
          <p>
            Age isn't just a number on a calendar. Our health-focused calculators use scientific principles to help you understand your body's true age and overall wellness, empowering you to make informed lifestyle choices.
          </p>
          <Card className="my-6">
            <CardHeader>
                <CardTitle>Tools in this Category</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <li className="flex items-start"><Check className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong><Link href="/biological-age" className="text-primary hover:underline">Biological Age Calculator:</Link></strong> Are you younger or older on the inside? This AI-powered tool estimates your body's age based on key lifestyle factors like diet, exercise, and sleep.</span></li>
                 <li className="flex items-start"><Check className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong><Link href="/metabolic-age" className="text-primary hover:underline">Metabolic Age Calculator:</Link></strong> Discover how your metabolism (your body's engine) compares to others your age, giving you crucial insight into your fitness level.</span></li>
            </CardContent>
          </Card>
           <p>
            Use these tools to gain a deeper understanding of your health and find motivation to make positive lifestyle changes. Read our <Link href="/articles/what-is-biological-age-and-how-to-improve-it" className="text-primary hover:underline">guide on biological age</Link> to learn more.
          </p>

          <h2 className="text-3xl font-bold">Pet Age Calculators: Understand Your Furry Friends</h2>
          <p>
            Our beloved pets age differently and on a much faster scale than we do. Our pet age calculators use the latest veterinary science to convert your pet's age into equivalent human years, helping you better understand their life stage and provide age-appropriate care.
          </p>
           <Card className="my-6">
            <CardHeader>
                <CardTitle>Tools in this Category</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                 <li className="flex items-start"><Check className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong><Link href="/dog-age" className="text-primary hover:underline">Dog Age Calculator:</Link></strong> This tool debunks the "1 year = 7 years" myth. It works for all breeds, including mixed breeds, by using size as the key factor for maximum accuracy.</span></li>
                 <li className="flex items-start"><Check className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong><Link href="/cat-age-in-human-years" className="text-primary hover:underline">Cat Age Calculator:</Link></strong> Convert your cat's years to human years to understand if they are a playful kitten, a mature adult, or a distinguished senior.</span></li>
            </CardContent>
          </Card>


          <h2 className="text-3xl font-bold">Pregnancy & Fertility Calculators: Charting the Journey to Parenthood</h2>
          <p>
            For those planning a family or already expecting a new arrival, our suite of pregnancy calculators provides essential tools for tracking important dates and milestones.
          </p>
          <Card className="my-6">
            <CardHeader>
                <CardTitle>Tools in this Category</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <li className="flex items-start"><Check className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong><Link href="/due-date-calculator" className="text-primary hover:underline">Due Date Calculator:</Link></strong> Estimate your baby's arrival date based on your Last Menstrual Period (LMP), conception date, or IVF transfer.</span></li>
                 <li className="flex items-start"><Check className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong><Link href="/ovulation-calculator" className="text-primary hover:underline">Ovulation Calculator:</Link></strong> Pinpoint your most fertile days each month to help with conception planning.</span></li>
                 <li className="flex items-start"><Check className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong><Link href="/gestational-age" className="text-primary hover:underline">Gestational Age Calculator:</Link></strong> Track how many weeks pregnant you are, a key metric used by healthcare providers.</span></li>
            </CardContent>
          </Card>

          <h2 className="text-3xl font-bold">Retirement & Financial Planning: Prepare for Your Future</h2>
           <p>
            Knowing your official retirement age is a cornerstone of effective financial planning. Our calculator helps you understand when you'll be eligible to receive Social Security benefits based on your birth year.
          </p>
          <Card className="my-6">
            <CardHeader>
                <CardTitle>Tools in this Category</CardTitle>
            </CardHeader>
            <CardContent>
                <li className="flex items-start"><Check className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong><Link href="/social-security-retirement-age-calculator" className="text-primary hover:underline">Retirement Age Calculator:</Link></strong> Find your full retirement age according to the U.S. Social Security Administration (SSA).</span></li>
            </CardContent>
          </Card>
          

          <Card className="my-12 bg-muted border-l-4 border-primary">
            <CardHeader>
                <CardTitle>Why Use Age Calculator Hub?</CardTitle>
                <CardDescription>Our Commitment to You</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4 text-muted-foreground">
                    <li className="flex items-start"><Check className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Accurate & Reliable:</strong> Our tools are built on up-to-date formulas and official scientific and governmental data to provide trustworthy results.</span></li>
                    <li className="flex items-start"><Check className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Completely Free & Accessible:</strong> No fees, no sign-ups, no paywalls. Just instant, accessible information for everyone.</span></li>
                    <li className="flex items-start"><Check className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Private & Secure:</strong> All calculations are performed in your browser. We do not see, track, or store your personal data. Your privacy is guaranteed.</span></li>
                     <li className="flex items-start"><Check className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Comprehensive & User-Friendly:</strong> We aim to provide a calculator for nearly every need in a clean, easy-to-use interface that works perfectly on any device.</span></li>
                </ul>
            </CardContent>
          </Card>

          <p>
            Our mission is to be the single, most trustworthy destination for anyone needing to calculate age in any context. Explore the calculators, read our in-depth articles, and empower yourself with knowledge. Thank you for choosing Age Calculator Hub!
          </p>

            <h2 className="text-3xl font-bold text-center mt-12 mb-6">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger className="text-left text-lg">{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-base">
                           <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </article>
      </main>
    </div>
  );
}
