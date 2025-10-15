
import TargetHeartRateCalculator from '@/components/calculators/target-heart-rate-calculator';
import { type Metadata } from 'next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import RelatedCalculators from '@/components/layout/related-calculators';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Flame, HeartPulse, Zap } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Target Heart Rate Calculator – Find Your Fat Burn, Cardio & Peak Zones',
    description: 'Use our free Target Heart Rate Calculator to find your ideal heart rate zones for exercise. Get personalized fat burn, cardio, and peak zones based on your age to optimize your workouts.',
    alternates: {
        canonical: '/target-heart-rate-calculator',
    },
};

const faqs = [
    {
        question: "What is my target heart rate?",
        answer: "Your target heart rate is a range of how fast your heart should beat during exercise. Working out in your target heart rate zones helps you get the most out of your physical activity without overexerting yourself. This calculator determines your zones based on your age."
    },
    {
        question: "How do you calculate target heart rate zones?",
        answer: "First, we estimate your maximum heart rate (MHR) using the common formula: 220 - your age. Then, different zones are calculated as a percentage of your MHR. For example, the fat-burning zone is typically 60-70% of your MHR, while the cardio zone is 70-80%."
    },
    {
        question: "What is the best heart rate for fat burning?",
        answer: "The 'fat-burning' zone is typically 60-70% of your maximum heart rate. In this zone, your body uses a higher percentage of fat for fuel. However, higher intensity workouts in the cardio zone may burn more total calories, which also contributes to fat loss."
    },
    {
        question: "Is this calculator 100% accurate?",
        answer: "This calculator provides a great estimate based on age-based formulas. However, individual factors like fitness level, medications, and health conditions can affect your actual maximum heart rate. For a precise measurement, a clinical stress test is required. This tool is for informational purposes."
    },
    {
        question: "How can I monitor my heart rate during exercise?",
        answer: "You can do it manually by taking your pulse at your wrist or neck for 15 seconds and multiplying by four. For more convenience and accuracy, using a fitness tracker, heart rate monitor chest strap, or smart watch is highly recommended."
    }
];

const zones = [
    {
        icon: Flame,
        title: "Zone 2: Fat Burn Zone (60-70% of MHR)",
        description: "This is a low-to-moderate intensity zone where your body primarily uses stored fat for energy. It's excellent for building endurance, improving your body's ability to use fat as fuel, and is sustainable for long workouts."
    },
    {
        icon: HeartPulse,
        title: "Zone 3: Aerobic/Cardio Zone (70-80% of MHR)",
        description: "This is the ideal zone for improving cardiovascular fitness. Working out here strengthens your heart and lungs, improves circulation, and increases your cardiorespiratory capacity (VO2 max). It feels challenging but sustainable."
    },
    {
        icon: Zap,
        title: "Zone 4: Anaerobic/Peak Zone (80-90% of MHR)",
        description: "This is a high-intensity zone that can only be maintained for shorter periods. It's used for interval training and helps improve your anaerobic threshold, speed, and performance. This zone pushes your limits and burns a high number of calories."
    }
];

const terminologies = [
    {
        term: "Maximum Heart Rate (MHR)",
        definition: "The highest number of times your heart can safely beat in one minute. The most common formula to estimate MHR is 220 minus your age. This calculator uses that formula."
    },
    {
        term: "Resting Heart Rate (RHR)",
        definition: "The number of times your heart beats per minute while you are at complete rest. A lower RHR is often a sign of good cardiovascular fitness. You can measure it by taking your pulse after resting for several minutes."
    },
    {
        term: "Heart Rate Reserve (HRR)",
        definition: "The difference between your Maximum Heart Rate and your Resting Heart Rate (MHR - RHR). Some more advanced formulas (like the Karvonen formula) use HRR to calculate target zones, which can be more accurate for very fit individuals."
    },
    {
        term: "VO2 Max",
        definition: "A measure of the maximum amount of oxygen your body can utilize during intense exercise. It is a key indicator of cardiovascular fitness. Training in the higher heart rate zones helps to improve your VO2 Max."
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

export default function TargetHeartRateCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Target Heart Rate Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Optimize your workout by finding your ideal heart rate zones. Enter your age to calculate your personalized fat burn, cardio, and peak zones.
                </p>
            </div>

            <TargetHeartRateCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader>
                        <CardTitle>How to Use the Target Heart Rate Calculator</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                            <li><strong>Enter Your Age:</strong> Input your current age in years. This is the only information needed.</li>
                            <li><strong>Click “Calculate Zones”:</strong> Get an instant breakdown of your estimated maximum heart rate and your three key training zones.</li>
                            <li><strong>Plan Your Workout:</strong> Use the results to guide the intensity of your exercise, whether you're aiming for endurance, cardiovascular improvement, or peak performance.</li>
                        </ol>
                    </CardContent>
                </Card>

                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Understanding Your Heart Rate Zones</h2>
                    <p className="text-muted-foreground mb-6">Each zone provides different benefits. Structuring your workouts to include time in different zones is a great way to build a well-rounded fitness routine.</p>
                     <div className="space-y-4">
                        {zones.map((zone) => (
                             <Card key={zone.title}>
                                <CardHeader className="flex flex-row items-start gap-4">
                                     <zone.icon className="h-8 w-8 text-primary mt-1 shrink-0" />
                                     <div>
                                        <CardTitle>{zone.title}</CardTitle>
                                        <CardContent className="p-0 pt-2">
                                            <p className="text-muted-foreground">{zone.description}</p>
                                        </CardContent>
                                     </div>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Why Training by Heart Rate Matters</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground">Training with a heart rate monitor allows you to work out smarter, not just harder. It provides real-time, objective data on how hard your body is working, ensuring you're in the right zone to meet your goals.</p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><strong>Prevents Overtraining:</strong> It helps you know when to push harder and when to ease off, reducing the risk of injury and burnout.</li>
                            <li><strong>Maximizes Efficiency:</strong> Ensures every minute of your workout is effective for your specific goal, whether it's fat loss or improving cardio fitness.</li>
                            <li><strong>Tracks Progress:</strong> As your fitness improves, you'll notice you can do more work at a lower heart rate, which is a clear sign of progress.</li>
                        </ul>
                         <p className="text-muted-foreground mt-4">For more health insights, try our <Link href="/metabolic-age" className="text-primary hover:underline">Metabolic Age Calculator</Link> to understand your body's efficiency, or our <Link href="/biological-age" className="text-primary hover:underline">Biological Age Calculator</Link> to see how your lifestyle impacts your overall aging process.</p>
                    </CardContent>
                </Card>
                
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Understanding Key Terminologies</h2>
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
        <RelatedCalculators currentCategory="Scientific &amp; Health Age" currentHref="/target-heart-rate-calculator" />
      </div>
    </div>
  );
}
