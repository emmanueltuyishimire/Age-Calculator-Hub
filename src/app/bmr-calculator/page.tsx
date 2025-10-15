
import BmrCalculator from '@/components/calculators/bmr-calculator';
import { type Metadata } from 'next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import RelatedCalculators from '@/components/layout/related-calculators';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'BMR Calculator – Basal Metabolic Rate',
    description: 'Use our free BMR Calculator to estimate your Basal Metabolic Rate, the number of calories your body burns at rest. Understand your baseline energy needs.',
    alternates: {
        canonical: '/bmr-calculator',
    },
};

const faqs = [
    {
        question: "What is Basal Metabolic Rate (BMR)?",
        answer: "BMR is the number of calories your body needs to accomplish its most basic (basal) life-sustaining functions, such as breathing, circulation, nutrient processing, and cell production, while at rest."
    },
    {
        question: "How is BMR calculated?",
        answer: "Our calculator uses the Mifflin-St Jeor equation, which is considered one of the most accurate methods. It takes into account your age, gender, height, and weight."
    },
    {
        question: "What's the difference between BMR and TDEE?",
        answer: "BMR is the calories you burn at rest. TDEE (Total Daily Energy Expenditure) is your BMR plus the calories you burn from physical activity. To find your TDEE, you can use our <a href='/macro-calculator' class='text-primary hover:underline'>Macro Calculator</a>, which includes an activity multiplier."
    },
    {
        question: "How can I increase my BMR?",
        answer: "The most effective way to increase your BMR is to build muscle mass through strength training. Muscle tissue is more metabolically active than fat tissue, so it burns more calories at rest."
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

export default function BmrCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
       <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">BMR Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Estimate your Basal Metabolic Rate (BMR) to understand your body's baseline calorie needs.
                </p>
            </div>

            <BmrCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader><CardTitle>Understanding Your BMR</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                           Your Basal Metabolic Rate (BMR) represents the number of calories your body needs to perform its most essential functions at rest. Think of it as the energy required to keep your body running if you were to stay in bed all day. Knowing your BMR is the first step in determining your total daily calorie needs and can be a powerful tool for weight management.
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
        <RelatedCalculators currentCategory="Scientific & Health Age" currentHref="/bmr-calculator" />
      </div>
    </div>
  );
}
