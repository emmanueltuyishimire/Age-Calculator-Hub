
'use client';

import Link from 'next/link';
import { articles } from '@/lib/articles';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { notFound, usePathname } from 'next/navigation';
import * as React from 'react';

const generationData = [
    { name: "The Silent Generation", years: "1928–1945" },
    { name: "Baby Boomers", years: "1946–1964" },
    { name: "Generation X", years: "1965–1980" },
    { name: "Millennials (Gen Y)", years: "1981–1996" },
    { name: "Generation Z (Gen Z)", years: "1997–2012" },
    { name: "Generation Alpha", years: "2013–Present" },
];

const faqs = [
    {
        question: "What era am I if I was born in 1997?",
        answer: "If you were born in 1997, you are at the very beginning of Generation Z (Gen Z), which is the generation that follows Millennials."
    },
    {
        question: "What are people who were born in 2000 called?",
        answer: "People born in the year 2000 are also part of Generation Z. They are sometimes referred to as 'early Gen Z-ers'."
    },
    {
        question: "What generation is 2025?",
        answer: "A child born in 2025 will be part of Generation Alpha, which is the cohort following Generation Z. Gen Alpha is generally considered to start in the early 2010s."
    },
    {
        question: "Are Millennials and Gen Y the same thing?",
        answer: "Yes, the terms 'Millennials' and 'Generation Y' (or 'Gen Y') are used interchangeably. This generation typically includes individuals born between 1981 and 1996."
    },
    {
        question: "Why are the cutoff years for generations sometimes different?",
        answer: "Generational boundaries are not officially defined and can vary slightly depending on the source (e.g., researchers, marketers, sociologists). The dates used in this guide are based on the widely cited definitions from the Pew Research Center, but you may see slight variations elsewhere. Generations are defined by shared experiences and cultural shifts, not hard-and-fast rules."
    },
];

export default function WhatGenerationAmIPage() {
  const pathname = usePathname();
  const article = articles.find(a => `/articles/${a.slug}` === pathname);
  const [currentYear, setCurrentYear] = React.useState(new Date().getFullYear());

  React.useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  if (!article) {
    notFound();
  }

  const generationsWithAges = generationData.map(gen => {
    const [startYear, endYearStr] = gen.years.split('–');
    const endYear = endYearStr === 'Present' ? currentYear : parseInt(endYearStr);
    const ageStart = currentYear - endYear;
    const ageEnd = currentYear - parseInt(startYear);
    return {
        ...gen,
        ageInRange: `${ageStart}–${ageEnd}`
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
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
            Are you a Millennial, part of Gen X, or a proud Baby Boomer? The "generation" you belong to is more than just a label; it's a way to understand the shared historical events, technological leaps, and cultural trends that shaped your formative years. Each generation has a unique perspective shaped by the world they grew up in.
          </p>
          <p>
            This guide provides a clear and straightforward breakdown of the major living generations by birth year, helping you instantly find where you fit in. Use our simple chart to find your generation and learn a little more about what makes it unique.
          </p>

            <div className="my-10">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Generational Birth Years Chart</h2>
                 <Card>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="font-bold">Generation Name</TableHead>
                                <TableHead className="font-bold">Birth Years</TableHead>
                                <TableHead className="font-bold text-right">Age Range in {currentYear}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {generationsWithAges.map((gen) => (
                                <TableRow key={gen.name}>
                                    <TableCell className="font-medium">{gen.name}</TableCell>
                                    <TableCell>{gen.years}</TableCell>
                                    <TableCell className="text-right">{gen.ageInRange}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
                 <p className="text-xs text-muted-foreground text-center mt-2">Generational definitions based on Pew Research Center.</p>
            </div>

            <div className="my-10 text-center">
                <p className="text-lg mb-2">Want to know your exact age?</p>
                <Link href="/age-calculator">
                    <Button size="lg">Use Our Precise Age Calculator</Button>
                </Link>
            </div>


            <h2 className="text-3xl font-bold text-center mb-8">A Quick Look at the Generations</h2>
            {generationData.map((gen) => (
             <Card key={gen.name} className="my-6">
                <CardHeader>
                    <CardTitle className="text-2xl">{gen.name} ({gen.years})</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        {
                            gen.name === 'The Silent Generation' ? 'Shaped by the Great Depression and World War II, this generation is known for its resilience, conformity, and traditional values. They grew up in a time before rock \'n\' roll and the digital age.' :
                            gen.name === 'Baby Boomers' ? 'This large generation grew up during a period of post-war prosperity. They were defined by major cultural shifts, from the Civil Rights Movement to the Vietnam War, and are often seen as a competitive and optimistic group.' :
                            gen.name === 'Generation X' ? 'Often called the "latchkey generation," Gen X grew up with rising divorce rates and more mothers entering the workforce. They are known for their independence, skepticism, and embrace of work-life balance. They were the first generation to grow up with personal computers.' :
                            gen.name === 'Millennials (Gen Y)' ? 'The first generation to come of age in the new millennium. They were shaped by the internet, the 9/11 attacks, and the 2008 financial crisis. Millennials are known for being digitally native, collaborative, and socially conscious.' :
                            gen.name === 'Generation Z (Gen Z)' ? 'The first truly "digital native" generation, Gen Z has never known a world without smartphones or social media. They are defined by their diversity, entrepreneurial spirit, and strong advocacy for social justice and mental health awareness.' :
                            'The youngest generation, still being born and growing up. Generation Alpha is immersed in technology from birth, with AI, smart devices, and highly personalized digital experiences shaping their development. Their world is expected to be the most technologically integrated yet.'
                        }
                    </p>
                </CardContent>
             </Card>
          ))}
          
           <h2 className="text-3xl font-bold text-center mt-12 mb-6">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger className="text-left text-lg">{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-base">
                           <p>{faq.answer}</p>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>

        </article>
      </main>
    </div>
  );
}
