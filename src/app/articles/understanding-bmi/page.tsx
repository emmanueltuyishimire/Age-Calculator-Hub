
"use client";

import Link from 'next/link';
import { articles } from '@/lib/articles';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { usePathname } from 'next/navigation';

const article = articles.find(a => a.slug === 'understanding-bmi');

const faqs = [
    {
        question: "What is the formula for BMI?",
        answer: "The formula for BMI is weight in kilograms divided by the square of height in meters (kg/m²). Our <a href='/bmi-calculator' class='text-primary hover:underline'>BMI Calculator</a> does this math for you instantly."
    },
    {
        question: "Why is BMI used if it's not perfect?",
        answer: "BMI is used because it's a simple, inexpensive, and non-invasive way to screen for weight categories at a population level. It provides a quick snapshot that can indicate a need for further health assessment."
    },
    {
        question: "Does BMI work for children?",
        answer: "BMI is calculated the same way for children, but the results are interpreted differently using age- and sex-specific percentile charts. This article and our calculator are designed for adults."
    },
    {
        question: "What are better alternatives to BMI?",
        answer: "For a more accurate picture of health, it's better to look at body composition. Tools like our <a href='/body-fat-calculator' class='text-primary hover:underline'>Body Fat Calculator</a>, which uses waist measurements, or clinical methods like DEXA scans provide more insight than BMI alone."
    }
];

const bmiCategories = [
    { category: "Underweight", range: "Below 18.5" },
    { category: "Normal weight", range: "18.5 – 24.9" },
    { category: "Overweight", range: "25.0 – 29.9" },
    { category: "Obesity Class I", range: "30.0 – 34.9" },
    { category: "Obesity Class II", range: "35.0 – 39.9" },
    { category: "Obesity Class III", range: "40.0 or higher" },
];


export default function BmiArticle() {
  const pathname = usePathname();
  if (!article) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <main role="main" className="max-w-4xl mx-auto">
        <article className="prose dark:prose-invert lg:prose-xl max-w-none">
          <div className="text-center mb-12">
            <p className="text-base text-primary font-semibold">{article.category}</p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">{article.title}</h1>
            <p className="text-md md:text-lg text-muted-foreground">{article.description}</p>
          </div>

          <p className="lead">
            Body Mass Index, or BMI, is one of the most widely used metrics in health and fitness. It's a simple calculation that uses your height and weight to give a general idea of whether you are underweight, a healthy weight, overweight, or obese. While it has its limitations, understanding BMI is a valuable first step in assessing your overall health.
          </p>

          <div className="my-10 text-center">
            <Link href="/bmi-calculator">
                <Button size="lg">Calculate Your BMI Now</Button>
            </Link>
            <p className="text-sm text-muted-foreground mt-2">Get your BMI score in seconds.</p>
          </div>

          <h2 className="text-3xl font-bold">What are the BMI Categories?</h2>
            <p className="text-muted-foreground mb-4">
                The World Health Organization (WHO) provides standard weight status categories based on BMI for adults.
            </p>
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Category</TableHead>
                            <TableHead>BMI Range</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bmiCategories.map((row) => (
                            <TableRow key={row.category}>
                                <TableCell className="font-medium">{row.category}</TableCell>
                                <TableCell>{row.range}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            
          <Card className="my-12 bg-muted border-l-4 border-primary">
            <CardHeader><CardTitle>The Major Limitation of BMI</CardTitle></CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                   The biggest drawback of BMI is that it **does not distinguish between fat and muscle**. Muscle is much denser than fat, so a very muscular person (like a bodybuilder or athlete) can have a high BMI that incorrectly classifies them as 'overweight' or 'obese'. Conversely, an older person who has lost muscle mass may have a 'normal' BMI but an unhealthy amount of body fat.
                </p>
                 <p className="text-muted-foreground mt-2">
                   Because of this, BMI is best used as a quick screening tool, not a definitive health diagnosis.
                </p>
            </CardContent>
          </Card>

          <h2 className="text-3xl font-bold">Beyond BMI: Better Ways to Measure Health</h2>
          <p>Since BMI can be misleading, it's helpful to use it in conjunction with other measurements for a more complete picture of your health:</p>
            <ul className="list-disc list-inside space-y-3 my-4">
              <li><strong>Body Fat Percentage:</strong> This directly measures how much of your weight is fat. You can get a good estimate using our <Link href="/body-fat-calculator" className="text-primary hover:underline">Body Fat Calculator</Link>.</li>
              <li><strong>Waist-to-Hip Ratio:</strong> This can indicate your risk for certain health conditions.</li>
              <li><strong>Basal Metabolic Rate (BMR):</strong> This shows how many calories your body burns at rest and is a key indicator of your metabolic health. Check it with our <Link href="/bmr-calculator" className="text-primary hover:underline">BMR Calculator</Link>.</li>
            </ul>

          <h2 className="text-3xl font-bold text-center mt-12 mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger className="text-left text-lg">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-base"><div dangerouslySetInnerHTML={{ __html: faq.answer }} /></AccordionContent>
                </AccordionItem>
            ))}
          </Accordion>
        </article>
      </main>
    </div>
  );
}
