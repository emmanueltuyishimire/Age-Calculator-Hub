
import BmiCalculator from '@/components/calculators/bmi-calculator';
import { type Metadata } from 'next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import RelatedCalculators from '@/components/layout/related-calculators';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'BMI Calculator – Calculate Your Body Mass Index',
    description: 'Use our free BMI Calculator to determine your Body Mass Index. Enter your height and weight to get your BMI and understand what it means for your health.',
    alternates: {
        canonical: '/bmi-calculator',
    },
};

const faqs = [
    {
        question: "What is BMI?",
        answer: "BMI stands for Body Mass Index. It is a simple calculation using a person's height and weight. The formula is BMI = kg/m2 where kg is a person's weight in kilograms and m2 is their height in metres squared. It is used to screen for weight categories that may lead to health problems."
    },
    {
        question: "How is BMI used?",
        answer: "BMI is a screening tool. While it does not diagnose the body fatness or health of an individual, it is used to categorize whether a person is underweight, a healthy weight, overweight, or obese."
    },
    {
        question: "Is BMI an accurate measure of health?",
        answer: "BMI can be a useful starting point, but it has limitations. It doesn't distinguish between fat and muscle mass. Therefore, very muscular people (like athletes) may have a high BMI but not have unhealthy levels of body fat."
    },
    {
        question: "What is a healthy BMI range?",
        answer: "For most adults, a healthy BMI is in the 18.5 to 24.9 range. Below 18.5 is considered underweight, 25 to 29.9 is overweight, and 30 or above is obesity."
    }
];

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

const bmiCategories = [
    { category: "Underweight", range: "< 18.5" },
    { category: "Normal weight", range: "18.5 – 24.9" },
    { category: "Overweight", range: "25 – 29.9" },
    { category: "Obesity", range: "30 or greater" },
];

export default function BmiCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
       <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">BMI Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Calculate your Body Mass Index (BMI) to get an idea of your weight status.
                </p>
            </div>

            <BmiCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                 <Card>
                    <CardHeader><CardTitle>Learn More About Body Composition</CardTitle></CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><Link href="/articles/understanding-bmi" className="text-primary hover:underline">A Deep Dive into Understanding BMI and Its Limitations</Link></li>
                            <li><Link href="/articles/understanding-body-fat" className="text-primary hover:underline">Why Body Fat Percentage is a Better Metric Than Weight</Link></li>
                        </ul>
                    </CardContent>
                </Card>
                 <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">BMI Categories for Adults</h2>
                    <p className="text-muted-foreground mb-4">
                        This table shows the standard BMI categories for adults.
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
                </div>

                <Card>
                    <CardHeader><CardTitle>Limitations of BMI</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                           While BMI is a widely used and simple tool, it's important to understand its limitations. BMI does not differentiate between muscle and fat. This means that very muscular individuals, such as athletes, may have a high BMI that classifies them as 'overweight' or 'obese' even though their body fat is low. Similarly, it may underestimate body fat in older adults who have lost muscle mass. Therefore, BMI should be used as a general screening tool, not a diagnostic one. For a more accurate picture, consider using our <Link href="/body-fat-calculator" className="text-primary hover:underline">Body Fat Calculator</Link>.
                        </p>
                    </CardContent>
                </Card>

                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Frequently Asked Questions (FAQs)</h2>
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                             <AccordionItem value={`item-${index}`} key={index}>
                                <AccordionTrigger>{faq.question}</AccordionTrigger>
                                <AccordionContent>
                                    <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>
        </main>
        <RelatedCalculators currentCategory="Health & Fitness" currentHref="/bmi-calculator" />
      </div>
    </div>
  );
}

    