
import BiologicalAgeCalculator from "@/components/calculators/biological-age-calculator";
import { type Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import RelatedCalculators from "@/components/layout/related-calculators";

export const metadata: Metadata = {
    title: 'Biological Age Calculator – Discover Your True Age Based on Health & Lifestyle',
    description: 'Use our Biological Age Calculator to estimate your body’s real age (or "real age") based on lifestyle, fitness, and health factors. Compare it with your chronological age and take control of your wellness today!',
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
    { question: "What is biological age vs chronological age?", answer: "Chronological age is the number of years you have been alive. Biological age is a measure of how well your body is functioning relative to your chronological age. It reflects your overall health and can be influenced by lifestyle, genetics, and environment." },
    { question: "Can biological age be lower than chronological age?", answer: "Yes, absolutely. A healthy lifestyle with good diet, regular exercise, sufficient sleep, and low stress can lead to a biological age that is significantly younger than your actual age." },
    { question: "How is biological age calculated?", answer: "Our calculator uses an AI model to estimate your biological age based on key lifestyle factors you provide, such as exercise habits, diet, sleep patterns, and stress levels. It compares your inputs to patterns associated with aging." },
    { question: "How often should I calculate my biological age?", answer: "Calculating it every 6 to 12 months can be a great way to track your progress after making lifestyle changes and see how your efforts are paying off." },
    { question: "Which lifestyle changes can reduce my biological age the most?", answer: "While all factors are important, regular physical activity, a balanced whole-foods diet, quitting smoking, and getting consistent, quality sleep are four of the most impactful changes you can make." },
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
                Discover your biological age based on health, lifestyle, and habits. Compare it with your chronological age.
            </p>
            </div>
            <BiologicalAgeCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">What is Biological Age vs. Chronological Age?</h2>
                    <p className="text-muted-foreground mb-4">
                        Your <strong className="text-foreground">chronological age</strong> is the number of years you’ve been alive. It’s a fixed number. Your <strong className="text-foreground">biological age</strong>, on the other hand, is a measurement of how well your body is functioning at a cellular level. It reflects your overall health and can be influenced by your lifestyle, genetics, and environment.
                    </p>
                    <p className="text-muted-foreground">
                    A lower biological age compared to your chronological age is a positive sign of healthy aging, while a higher number may indicate that lifestyle factors are accelerating your aging process. Knowing your biological age gives you the power to make informed decisions to improve your health and longevity.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Factors Affecting Biological Age</h2>
                    <p className="text-muted-foreground mb-4">
                        Your biological age isn't just a number; it's a reflection of your daily habits. Several key lifestyle factors play a significant role:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li><strong>Diet:</strong> A balanced diet rich in nutrients, antioxidants, and anti-inflammatory foods can slow aging, while processed foods may accelerate it.</li>
                        <li><strong>Exercise:</strong> Regular physical activity improves cardiovascular health, maintains muscle mass, and keeps your body young and resilient.</li>
                        <li><strong>Sleep:</strong> Quality sleep is crucial for cellular repair, hormone regulation, and cognitive function. Lack of sleep is a major accelerator of aging.</li>
                        <li><strong>Stress:</strong> Chronic stress leads to inflammation and hormonal imbalances that can speed up the aging process at a cellular level.</li>
                        <li><strong>Smoking & Alcohol:</strong> Both are known to introduce toxins into the body, causing cellular damage and significantly increasing biological age.</li>
                        <li><strong>Genetics:</strong> Your genes play a role, but lifestyle choices can significantly influence their expression (a field known as epigenetics).</li>
                    </ul>
                </div>
                
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">How Accurate is This Calculator?</h2>
                    <p className="text-muted-foreground">
                    This calculator provides an educational estimate based on scientific research into the lifestyle factors that influence aging. The result is intended to be an informative guide, not a medical diagnosis. For the most accurate assessment, clinical tests that measure epigenetic markers (like DNA methylation) are available through healthcare providers. However, this tool is an excellent starting point for understanding how your habits may be impacting your healthspan.
                    </p>
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
        <RelatedCalculators currentCategory="Scientific & Health Age" currentHref="/biological-age" />
      </div>
    </div>
  );
}
