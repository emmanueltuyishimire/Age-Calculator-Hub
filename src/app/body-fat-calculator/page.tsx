
import BodyFatCalculator from '@/components/calculators/body-fat-calculator';
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

export const metadata: Metadata = {
    title: 'Body Fat Calculator – Estimate Your Body Fat Percentage',
    description: 'Use our free Body Fat Calculator to estimate your body fat percentage using the U.S. Navy method. All you need is a tape measure and your height, neck, and waist measurements.',
    alternates: {
        canonical: '/body-fat-calculator',
    },
};

const faqs = [
    {
        question: "What is body fat percentage?",
        answer: "It's the percentage of your total body weight that is composed of fat. It's a more accurate indicator of health than weight or BMI alone because it distinguishes between fat mass and lean mass."
    },
    {
        question: "How does this calculator work?",
        answer: "This calculator uses the U.S. Navy method, which is a formula that estimates body fat based on circumference measurements. It's a convenient way to get an estimate without needing special equipment like calipers or a body composition scale."
    },
    {
        question: "How accurate is the Navy method?",
        answer: "It provides a reasonable estimate for most people. However, its accuracy can vary depending on your body shape and how you take the measurements. For the most precise results, clinical methods like a DEXA scan are the gold standard."
    },
    {
        question: "What is a healthy body fat percentage?",
        answer: "A healthy range depends on age and gender. For men, a healthy range is typically 10-20%. For women, it's generally 20-30%. Athletes often have lower percentages."
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

const bodyFatCategories = [
    { category: "Essential Fat", women: "10-13%", men: "2-5%" },
    { category: "Athletes", women: "14-20%", men: "6-13%" },
    { category: "Fitness", women: "21-24%", men: "14-17%" },
    { category: "Acceptable", women: "25-31%", men: "18-24%" },
    { category: "Obesity", women: "32%+", men: "25%+" },
];

export default function BodyFatCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
       <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Body Fat Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Estimate your body fat percentage using the U.S. Navy method with just a tape measure.
                </p>
            </div>

            <BodyFatCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                 <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Body Fat Percentage Categories</h2>
                    <p className="text-muted-foreground mb-4">
                        This table from the American Council on Exercise (ACE) shows general body fat percentage categories.
                    </p>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Women</TableHead>
                                    <TableHead>Men</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {bodyFatCategories.map((row) => (
                                    <TableRow key={row.category}>
                                        <TableCell className="font-medium">{row.category}</TableCell>
                                        <TableCell>{row.women}</TableCell>
                                        <TableCell>{row.men}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>

                <Card>
                    <CardHeader><CardTitle>Why Measure Body Fat?</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                           Tracking your body fat percentage is often more useful than tracking your weight. It helps you understand your body composition—the ratio of fat mass to lean mass (muscle, bones, water, etc.). When you lose weight, you want to ensure you're losing fat, not valuable muscle. This calculator provides a convenient way to estimate and monitor changes in your body composition over time.
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
        <RelatedCalculators currentCategory="Scientific & Health Age" currentHref="/body-fat-calculator" />
      </div>
    </div>
  );
}
