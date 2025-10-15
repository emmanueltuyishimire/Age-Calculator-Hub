
import MetabolicAgeCalculator from "@/components/calculators/metabolic-age-calculator";
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
import { Zap, Activity, Scale, Droplets } from "lucide-react";

export const metadata: Metadata = {
    title: 'Metabolic Age Calculator – Find Out How Old Your Body Really Is',
    description: 'Use our free Metabolic Age Calculator to determine your body’s metabolic age based on your Basal Metabolic Rate (BMR). Compare it to your chronological age and get tips to improve it.',
    openGraph: {
        title: 'Metabolic Age Calculator – Find Out How Old Your Body Really Is',
        description: 'Use our free Metabolic Age Calculator to determine your body’s metabolic age based on your Basal Metabolic Rate (BMR). Compare it to your chronological age and get tips to improve it.',
        type: 'website',
        url: '/metabolic-age',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Metabolic Age Calculator – Find Out How Old Your Body Really Is',
        description: 'Use our free Metabolic Age Calculator to determine your body’s metabolic age based on your Basal Metabolic Rate (BMR). Compare it to your chronological age and get tips to improve it.',
    },
    alternates: {
        canonical: '/metabolic-age',
    },
};

const faqs = [
    {
        question: "What is metabolic age?",
        answer: "Metabolic age is a health and fitness metric that compares your Basal Metabolic Rate (BMR) to the average BMR of people of your same chronological age. A metabolic age lower than your actual age is a good indicator of health and fitness."
    },
    {
        question: "How is metabolic age calculated?",
        answer: "It's calculated by first determining your Basal Metabolic Rate (BMR) using a formula (like the Mifflin-St Jeor equation) that considers your weight, height, age, and gender. This BMR is then compared against population average BMR data for your age group to find your corresponding metabolic age."
    },
    {
        question: "What does it mean if my metabolic age is high?",
        answer: "A metabolic age higher than your chronological age suggests that your metabolism is slower than the average for your age group. This may indicate a lower amount of muscle mass and a higher amount of body fat, suggesting a need to improve overall fitness and body composition."
    },
    {
        question: "How can I improve my metabolic age?",
        answer: "You can lower your metabolic age by building more muscle through strength training, engaging in regular cardiovascular exercise (especially HIIT), eating a balanced diet with adequate protein, and staying well-hydrated. These activities boost your BMR."
    },
     {
        question: "Is this calculator a medical diagnosis?",
        answer: "No. This tool provides an estimate for informational and motivational purposes only. For a comprehensive health assessment and precise BMR measurement (e.g., through indirect calorimetry), consult with a healthcare or fitness professional."
    },
    {
        question: "Is it better to have a lower or higher metabolic age?",
        answer: "Lower is better. A lower metabolic age indicates that your body is more efficient at burning calories at rest, which is typically associated with better health, more muscle mass, and lower body fat."
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

export default function MetabolicAgePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Metabolic Age Calculator</h1>
            <p className="text-md md:text-lg text-muted-foreground">
                Find out if your body's metabolism is as young as you feel. Our Metabolic Age Calculator estimates your body's age based on your Basal Metabolic Rate (BMR), giving you powerful insights into your metabolism and overall fitness.
            </p>
            </div>

            <MetabolicAgeCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader><CardTitle>Learn More About Your Metabolism</CardTitle></CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li>First, find your BMR with our <Link href="/bmr-calculator" className="text-primary hover:underline">BMR Calculator</Link>.</li>
                            <li><Link href="/articles/understanding-bmr" className="text-primary hover:underline">Understanding BMR: Your Body's Baseline Calorie Needs</Link></li>
                        </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>What is Metabolic Age?</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            Your <strong className="text-foreground">chronological age</strong> is how many years you've been alive. Your <strong className="text-foreground">metabolic age</strong>, however, tells a different story about your health. It’s a comparison of your Basal Metabolic Rate (BMR)—the number of calories your body burns at rest—to the average BMR of people of your same chronological age.
                        </p>
                        <p className="text-muted-foreground">
                        If your metabolic age is lower than your actual age, it's a good sign that you have a healthy amount of muscle mass and a strong, efficient metabolism. If it's higher, it could be an indicator that it's time to focus on improving your body composition (building muscle, losing fat) and overall fitness levels. It's a more dynamic measure of your health than just stepping on a scale.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>How to Improve Your Metabolic Age</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground mb-4">
                        The key to lowering your metabolic age is to boost your metabolism by improving your body composition. Here are the most effective ways to do it:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-start gap-4">
                                <Zap className="h-8 w-8 text-primary mt-1 shrink-0"/>
                                <div>
                                    <h3 className="font-semibold">Build Muscle with Strength Training</h3>
                                    <p className="text-sm text-muted-foreground">This is the most effective way to increase your BMR. Muscle tissue is metabolically active and burns more calories at rest than fat tissue.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Activity className="h-8 w-8 text-primary mt-1 shrink-0"/>
                                <div>
                                    <h3 className="font-semibold">Incorporate High-Intensity Exercise</h3>
                                    <p className="text-sm text-muted-foreground">HIIT and other intense cardio workouts create an "afterburn" effect (EPOC), where your metabolism stays elevated for hours after you finish exercising.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Scale className="h-8 w-8 text-primary mt-1 shrink-0"/>
                                <div>
                                    <h3 className="font-semibold">Eat Enough Protein</h3>
                                    <p className="text-sm text-muted-foreground">Protein has a higher thermic effect of food (TEF) than fats or carbs, meaning your body burns more calories digesting it. It's also essential for building and repairing muscle.</p>
                                </div>
                            </div>
                             <div className="flex items-start gap-4">
                                <Droplets className="h-8 w-8 text-primary mt-1 shrink-0"/>
                                <div>
                                    <h3 className="font-semibold">Stay Hydrated</h3>
                                    <p className="text-sm text-muted-foreground">Dehydration can cause your metabolism to slow down. Drinking plenty of water is essential for optimal metabolic function.</p>
                                </div>
                            </div>
                        </div>
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
        <RelatedCalculators currentCategory="Health & Fitness" currentHref="/metabolic-age" />
      </div>
    </div>
  );
}

    