
import MacroCalculator from '@/components/calculators/macro-calculator';
import { type Metadata } from 'next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import RelatedCalculators from '@/components/layout/related-calculators';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Fish, Wheat, Donut } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Macro Calculator – Daily Protein, Carb & Fat Intake',
    description: 'Use our free Macronutrient (Macro) Calculator to find your optimal daily intake of protein, carbs, and fats based on your age, size, activity level, and fitness goals.',
    alternates: {
        canonical: '/macro-calculator',
    },
};

const faqs = [
    {
        question: "What are macronutrients (macros)?",
        answer: "Macronutrients are the three main nutrients your body needs in large amounts: protein, carbohydrates, and fat. Each one provides energy (calories) and plays a unique role in bodily functions."
    },
    {
        question: "How are my daily calories calculated?",
        answer: "First, we calculate your Basal Metabolic Rate (BMR) using the Mifflin-St Jeor equation. Then, we multiply your BMR by an activity multiplier to get your Total Daily Energy Expenditure (TDEE). Finally, we adjust this TDEE based on your goal (e.g., subtracting calories for weight loss)."
    },
    {
        question: "Why do different goals have different macro ratios?",
        answer: "The ratios are adjusted to support your goal. For muscle gain, protein is increased to aid muscle repair and growth. For weight loss, protein is also kept high to preserve muscle mass while calories are reduced. For maintenance, a more balanced ratio is used."
    },
    {
        question: "How much protein do I really need?",
        answer: "The amount varies. For general health, a common recommendation is 0.8 grams per kg of body weight. For active individuals or those looking to build muscle, this can increase to 1.6-2.2 grams per kg. Our calculator uses these evidence-based ranges."
    },
    {
        question: "Is this calculator suitable for keto or low-carb diets?",
        answer: "This calculator provides standard, balanced macro recommendations. While you can use the calorie estimate as a baseline, you would need to manually adjust the carb and fat percentages to fit a specific diet like keto (which is very low in carbs and very high in fat)."
    }
];

const terminologies = [
    {
        term: "Basal Metabolic Rate (BMR)",
        definition: "The number of calories your body needs to perform basic, life-sustaining functions at rest, such as breathing, circulation, and cell production. It's the largest component of your daily calorie expenditure."
    },
    {
        term: "Total Daily Energy Expenditure (TDEE)",
        definition: "The total number of calories you burn in a 24-hour period, including from rest (BMR), physical activity, and the digestion of food. This calculator uses TDEE as the starting point for your calorie goal."
    },
    {
        term: "Protein",
        definition: "Essential for building and repairing tissues, including muscle. It also plays a role in hormone production and immune function. It contains 4 calories per gram."
    },
    {
        term: "Carbohydrates (Carbs)",
        definition: "The body's primary source of energy. They fuel your brain, muscles, and central nervous system. Carbs contain 4 calories per gram."
    },
    {
        term: "Fat",
        definition: "Crucial for hormone production, vitamin absorption (A, D, E, K), and protecting organs. Fat is the most energy-dense macronutrient, containing 9 calories per gram."
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

export default function MacroCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Macronutrient Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Get a personalized recommendation for your daily intake of protein, carbohydrates, and fats to achieve your fitness goals, whether it's weight loss, maintenance, or muscle gain.
                </p>
            </div>

            <MacroCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader>
                        <CardTitle>What Are Macros and Why Do They Matter?</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">"Macros" is short for macronutrients, the three main categories of nutrients your body needs to function: protein, carbohydrates, and fats. Unlike micronutrients (vitamins and minerals), your body needs macros in large amounts. Balancing them correctly is key to achieving your fitness goals, whether it's losing fat, building muscle, or maintaining your current weight.</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                            <div className="text-center">
                                <Fish className="mx-auto h-8 w-8 text-primary mb-2" />
                                <h3 className="font-semibold">Protein (4 cal/g)</h3>
                                <p className="text-sm text-muted-foreground">Builds and repairs tissue, crucial for muscle growth and preservation.</p>
                            </div>
                            <div className="text-center">
                                <Wheat className="mx-auto h-8 w-8 text-primary mb-2" />
                                <h3 className="font-semibold">Carbs (4 cal/g)</h3>
                                <p className="text-sm text-muted-foreground">Your body's main source of energy, fueling workouts and brain function.</p>
                            </div>
                            <div className="text-center">
                                <Donut className="mx-auto h-8 w-8 text-primary mb-2" />
                                <h3 className="font-semibold">Fats (9 cal/g)</h3>
                                <p className="text-sm text-muted-foreground">Essential for hormone regulation, vitamin absorption, and overall health.</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>How This Calculator Works</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                            <li><strong>Calculates BMR:</strong> It first estimates your Basal Metabolic Rate (the calories you burn at rest) using the Mifflin-St Jeor equation.</li>
                            <li><strong>Determines TDEE:</strong> It then adjusts your BMR based on your selected activity level to find your Total Daily Energy Expenditure (TDEE).</li>
                            <li><strong>Adjusts for Your Goal:</strong> Your daily calorie target is set by adding or subtracting calories from your TDEE based on your goal (e.g., -500 calories for weight loss).</li>
                            <li><strong>Splits the Macros:</strong> Finally, it divides those calories into protein, carbs, and fats based on standard, evidence-based ratios for your chosen goal.</li>
                        </ol>
                    </CardContent>
                </Card>

                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Understanding Key Terms</h2>
                    <Accordion type="single" collapsible className="w-full">
                        {terminologies.map((item, index) => (
                             <AccordionItem value={`item-${index}`} key={index}>
                                <AccordionTrigger>{item.term}</AccordionTrigger>
                                <AccordionContent>{item.definition}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
                
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Frequently Asked Questions</h2>
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
        <RelatedCalculators currentCategory="Scientific &amp; Health Age" currentHref="/macro-calculator" />
      </div>
    </div>
  );
}
