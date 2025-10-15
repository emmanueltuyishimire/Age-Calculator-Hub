
import { type Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/lib/articles';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { notFound } from 'next/navigation';
import { Zap, Activity, Scale, Droplets } from 'lucide-react';

const article = articles.find(a => a.slug === 'understanding-bmr');

export function generateMetadata(): Metadata {
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/articles/${article.slug}` },
  };
}

const faqs = [
    {
        question: "What's the difference between BMR and RMR?",
        answer: "BMR (Basal Metabolic Rate) is a more precise measurement taken under strict laboratory conditions (e.g., after fasting and a full night's sleep). RMR (Resting Metabolic Rate) is a less restrictive, more commonly used estimate of resting energy expenditure. For practical purposes, the terms are often used interchangeably, and our calculator provides an RMR estimate using the BMR formula."
    },
    {
        question: "How is BMR calculated?",
        answer: "Our calculator uses the Mifflin-St Jeor equation, which is widely considered one of the most accurate formulas. It factors in your weight, height, age, and gender to estimate the calories you burn at rest."
    },
    {
        question: "Why does my BMR matter for weight loss?",
        answer: "Knowing your BMR is the first step to creating a calorie deficit. To lose weight, you need to consume fewer calories than your Total Daily Energy Expenditure (TDEE), which is your BMR plus the calories you burn from activity. Our <a href='/macro-calculator' class='text-primary hover:underline'>Macro Calculator</a> can help you determine your TDEE."
    },
    {
        question: "Do skinny people have a higher BMR?",
        answer: "Not necessarily. BMR is heavily influenced by muscle mass. A person with more muscle will have a higher BMR than a person of the same weight with less muscle, because muscle tissue is more metabolically active."
    }
];

export default function BmrArticle() {
  if (!article) notFound();

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
            Your body is a remarkable engine, constantly burning fuel (calories) just to keep running. The energy required to perform its most essential, life-sustaining functions—like breathing, circulating blood, and regulating body temperature—while you are at complete rest is known as your Basal Metabolic Rate, or BMR. Understanding your BMR is the cornerstone of any effective nutrition or weight management plan.
          </p>

          <div className="my-10 text-center">
            <Link href="/bmr-calculator">
                <Button size="lg">Calculate Your BMR</Button>
            </Link>
            <p className="text-sm text-muted-foreground mt-2">Discover your body's baseline calorie needs.</p>
          </div>

          <h2 className="text-3xl font-bold">BMR vs. TDEE: What's the Difference?</h2>
          <p>
            It's important to distinguish BMR from TDEE (Total Daily Energy Expenditure).
          </p>
          <ul className="list-disc list-inside space-y-2 my-4">
              <li><strong>BMR (Basal Metabolic Rate):</strong> The calories you burn at complete rest. Think of it as the energy cost of keeping the lights on.</li>
              <li><strong>TDEE (Total Daily Energy Expenditure):</strong> This is your BMR *plus* the calories you burn from all other activities, including walking, working, exercising, and even digesting food.</li>
          </ul>
           <p>Your BMR is the largest component of your TDEE, typically accounting for 60-75% of the total calories you burn each day.</p>

          <Card className="my-12">
            <CardHeader>
                <CardTitle>How to Boost Your BMR and Lower Your Metabolic Age</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-muted-foreground mb-4">
                A higher BMR means you burn more calories at rest, which is beneficial for weight management and is often associated with a younger <Link href="/metabolic-age" className="text-primary hover:underline">Metabolic Age</Link>. Here are the most effective strategies:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-4">
                        <Zap className="h-8 w-8 text-primary mt-1 shrink-0"/>
                        <div>
                            <h3 className="font-semibold">Build Muscle</h3>
                            <p className="text-sm text-muted-foreground">This is the #1 way to increase your BMR. Muscle is metabolically active tissue, so the more you have, the more calories you burn 24/7.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <Activity className="h-8 w-8 text-primary mt-1 shrink-0"/>
                        <div>
                            <h3 className="font-semibold">HIIT Workouts</h3>
                            <p className="text-sm text-muted-foreground">High-Intensity Interval Training creates an "afterburn" effect that keeps your metabolism elevated for hours after your workout is over.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <Scale className="h-8 w-8 text-primary mt-1 shrink-0"/>
                        <div>
                            <h3 className="font-semibold">Eat Enough Protein</h3>
                            <p className="text-sm text-muted-foreground">Your body uses more energy to digest protein than carbs or fats (the Thermic Effect of Food). Adequate protein also supports muscle growth.</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <Droplets className="h-8 w-8 text-primary mt-1 shrink-0"/>
                        <div>
                            <h3 className="font-semibold">Stay Hydrated</h3>
                            <p className="text-sm text-muted-foreground">Dehydration can cause a temporary dip in your metabolic rate. Drinking enough water ensures your metabolism is running optimally.</p>
                        </div>
                    </div>
                </div>
            </CardContent>
          </Card>

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
