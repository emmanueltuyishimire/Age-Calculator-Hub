
import BiologicalAgeCalculator from "@/components/calculators/biological-age-calculator";
import { type Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import RelatedCalculators from "@/components/layout/related-calculators";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Apple, Brain, HeartPulse, Bed, Zap, User } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Biological Age Calculator – Discover Your True Age Based on Health & Lifestyle',
    description: 'Use our Biological Age Calculator to estimate your body’s real age (or "true age") based on lifestyle, fitness, and health factors. Compare it with your chronological age and take control of your wellness today!',
    openGraph: {
        title: 'Biological Age Calculator – Know Your True Age',
        description: 'Discover your biological age based on health, lifestyle, and habits. Compare it with your chronological age and see how your choices impact your healthspan.',
        type: 'website',
        url: '/biological-age',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Biological Age Calculator – Know Your True Age',
        description: 'Discover your biological age based on health, lifestyle, and habits. Compare it with your chronological age and see how your choices impact your healthspan.',
    },
    alternates: {
        canonical: '/biological-age',
    },
};

const faqs = [
    { question: "What is my true age?", answer: "Your 'true age' is often another term for your biological age. It reflects your body's health and how well it's functioning, which can be different from your calendar age. Our calculator estimates this based on key lifestyle factors." },
    { question: "Is your body age the same as your calendar age?", answer: "Not necessarily. Your calendar (chronological) age is fixed, but your body (biological) age is flexible. A healthy lifestyle can make your body age younger than your calendar age, while an unhealthy one can make it older." },
    { question: "How can I calculate my real age?", answer: "You can get a good estimate of your 'real' or biological age by using calculators that assess your lifestyle habits, like diet, exercise, and sleep. For a clinical measurement, you would need lab tests that analyze biomarkers like DNA methylation." },
    { question: "Can exercise increase your lifespan?", answer: "Yes, numerous studies show that regular exercise is one of the most effective ways to increase both healthspan (healthy years) and lifespan. It lowers the risk of many chronic diseases and improves overall bodily function, which can lower your biological age." },
    { question: "How accurate is this biological age calculator?", answer: "This calculator provides an educational estimate based on an AI model trained on lifestyle factors that influence aging. It's a great starting point for self-assessment but is not a medical diagnosis. Clinical tests are required for a precise measurement." },
    { question: "Can I reverse my biological age?", answer: "Yes, research has shown that lifestyle interventions can lead to a measurable reversal in biological age markers. Your biological age is not fixed and can be improved at any point in life." },
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

const lifestyleFactors = [
    {
        icon: Zap,
        factor: "Physical Activity",
        description: "Regular exercise improves cardiovascular health, builds muscle, and reduces inflammation, all of which are key to a lower biological age."
    },
    {
        icon: Apple,
        factor: "Diet Quality",
        description: "A diet rich in antioxidants and anti-inflammatory foods (like fruits, vegetables, and healthy fats) combats cellular damage and aging."
    },
    {
        icon: Bed,
        factor: "Sleep Quality",
        description: "Sleep is when your body performs critical repair functions. Consistent, high-quality sleep is essential for slowing the aging process."
    },
    {
        icon: Brain,
        factor: "Stress Levels",
        description: "Chronic stress releases cortisol, a hormone that accelerates cellular aging. Managing stress is crucial for staying biologically young."
    },
    {
        icon: User,
        factor: "Smoking & Alcohol",
        description: "Toxins from smoking and excessive alcohol cause widespread cellular damage, significantly increasing biological age."
    },
     {
        icon: HeartPulse,
        factor: "Genetics",
        description: "While you can't change your genes, a healthy lifestyle can positively influence how they are expressed (epigenetics) and impact your aging process."
    }
]

export default function BiologicalAgePage() {
  return (
    <div className="container mx-auto px-4 py-8">
       <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Biological Age Calculator – Know Your True Age</h1>
            <p className="text-md md:text-lg text-muted-foreground">
                Are you younger or older on the inside? Discover your biological age based on your health, lifestyle, and habits. Compare it with your chronological age and take control of your healthspan.
            </p>
            </div>
            <BiologicalAgeCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                
                <Card>
                    <CardHeader><CardTitle>What is Biological Age vs. Chronological Age?</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            Your <strong className="text-foreground">chronological age</strong> is the number of years you’ve been alive. It’s a fixed number that marks the passage of time. Your <strong className="text-foreground">biological age</strong>, on the other hand, is a fluid measurement of how well your body is functioning at a cellular and physiological level. It's your "health age" or "body age."
                        </p>
                        <p className="text-muted-foreground">
                        A lower biological age compared to your chronological age is a positive sign of healthy aging, while a higher number may indicate that lifestyle factors are accelerating your aging process. Knowing your biological age gives you the power to make informed decisions to improve your healthspan—the number of years you live in good health. Learn more in our <Link href="/articles/what-is-biological-age-and-how-to-improve-it" className="text-primary hover:underline">Ultimate Guide to Biological Age</Link>.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>The Key Factors That Determine Your Biological Age</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground mb-4">
                            Your biological age isn't just a number; it's a reflection of your daily habits. While genetics play a role, research suggests that up to 80% of your aging process is influenced by lifestyle and environment. Our calculator analyzes the following key areas:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {lifestyleFactors.map((item) => (
                                <div key={item.factor} className="flex items-start gap-4">
                                    <item.icon className="h-8 w-8 text-primary mt-1 shrink-0"/>
                                    <div>
                                        <h3 className="font-semibold">{item.factor}</h3>
                                        <p className="text-sm text-muted-foreground">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader><CardTitle>How Accurate is This Calculator?</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                        This calculator provides an educational estimate using an AI model trained on scientific research into the lifestyle factors that influence aging. The result is intended to be an informative guide to help you understand how your habits may be impacting your healthspan, not a medical diagnosis.
                        </p>
                        <p className="text-muted-foreground mt-2">
                        For the most accurate clinical assessment, advanced tests that measure epigenetic markers (like DNA methylation "clocks") are available through specialized clinics and healthcare providers. However, this tool serves as an excellent, accessible starting point for self-assessment and motivating positive change.
                        </p>
                    </CardContent>
                </Card>

                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem value={`item-${index}`} key={index}>
                                <AccordionTrigger>{faq.question}</AccordionTrigger>
                                <AccordionContent>{faq.answer}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>
        </main>
        <RelatedCalculators currentCategory="Scientific & Health Age" currentHref="/biological-age" />
      </div>
    </div>
  );
}
