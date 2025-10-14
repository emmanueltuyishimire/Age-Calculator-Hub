
import MetabolicAgeCalculator from "@/components/calculators/metabolic-age-calculator";
import { type Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import RelatedCalculators from "@/components/layout/related-calculators";

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
        answer: "Metabolic age is a measure of how your Basal Metabolic Rate (BMR), or the calories you burn at rest, compares to the average BMR of people of your same chronological age. A lower metabolic age than your actual age is a good sign of health."
    },
    {
        question: "How is metabolic age calculated?",
        answer: "It's calculated by first determining your BMR using your weight, height, age, and gender. This BMR is then compared against the average BMR for your age group to find your metabolic age."
    },
    {
        question: "What does it mean if my metabolic age is high?",
        answer: "A metabolic age higher than your chronological age suggests that your metabolism is slower than average for your age group. This may indicate a need to increase muscle mass and improve overall fitness."
    },
    {
        question: "How can I improve my metabolic age?",
        answer: "You can lower your metabolic age by building more muscle through strength training, engaging in regular cardiovascular exercise, eating a balanced diet with enough protein, and staying well-hydrated."
    },
     {
        question: "Is this calculator a medical diagnosis?",
        answer: "No. This tool provides an estimate for informational purposes only. For a comprehensive health assessment, consult with a healthcare or fitness professional."
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
                Find out if your body is as young as you feel. Our Metabolic Age Calculator estimates your body's age based on your Basal Metabolic Rate (BMR), giving you insights into your metabolism and overall fitness.
            </p>
            </div>

            <MetabolicAgeCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">What is Metabolic Age?</h2>
                    <p className="text-muted-foreground mb-4">
                        Your <strong className="text-foreground">chronological age</strong> is how many years you've been alive. Your <strong className="text-foreground">metabolic age</strong>, however, tells a different story. It’s a comparison of your Basal Metabolic Rate (BMR)—the number of calories your body burns at rest—to the average BMR of people your age.
                    </p>
                    <p className="text-muted-foreground">
                    If your metabolic age is lower than your actual age, it's a good sign that you have a healthy amount of muscle mass and a strong metabolism. If it's higher, it could be an indicator that it's time to focus on improving your body composition and fitness levels.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">How to Improve Your Metabolic Age</h2>
                    <p className="text-muted-foreground mb-4">
                        The key to lowering your metabolic age is to boost your metabolism. Here are the most effective ways to do it:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li><strong>Build Muscle:</strong> Strength training is the most effective way to increase your BMR, as muscle tissue burns more calories at rest than fat tissue.</li>
                        <li><strong>Stay Active:</strong> Incorporate regular cardiovascular exercise like running, swimming, or cycling to burn calories and improve heart health.</li>
                        <li><strong>Eat Enough Protein:</strong> Protein requires more energy to digest than fats or carbs, and it's essential for building muscle.</li>
                        <li><strong>Stay Hydrated:</strong> Drinking plenty of water can temporarily boost your metabolism.</li>
                        <li><strong>Don't Skip Meals:</strong> Eating regular meals helps keep your metabolism steady throughout the day.</li>
                    </ul>
                </div>
                
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
        <RelatedCalculators currentCategory="Scientific & Health Age" currentHref="/metabolic-age" />
      </div>
    </div>
  );
}
