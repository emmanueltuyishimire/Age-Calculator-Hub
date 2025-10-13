
import BiologicalAgeCalculator from "@/components/calculators/biological-age-calculator";
import { type Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Biological Age Calculator – Discover Your True Age Based on Health & Lifestyle',
    description: 'Use our Biological Age Calculator to estimate your body’s real age based on lifestyle, fitness, and health factors. Compare it with your chronological age and take control of your wellness today!',
    openGraph: {
        title: 'Biological Age Calculator – Discover Your True Age Based on Health & Lifestyle',
        description: 'Use our Biological Age Calculator to estimate your body’s real age based on lifestyle, fitness, and health factors. Compare it with your chronological age and take control of your wellness today!',
        type: 'website',
        url: '/biological-age',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Biological Age Calculator – Discover Your True Age Based on Health & Lifestyle',
        description: 'Use our Biological Age Calculator to estimate your body’s real age based on lifestyle, fitness, and health factors. Compare it with your chronological age and take control of your wellness today!',
    },
    alternates: {
        canonical: '/biological-age',
    },
};

const faqs = [
    { question: "What is biological age?", answer: "Biological age is a measure of how well your body is functioning relative to your chronological age. It reflects your overall health and can be influenced by lifestyle, genetics, and environment." },
    { question: "How is biological age calculated?", answer: "Our calculator uses an AI model to estimate your biological age based on key lifestyle factors you provide, such as exercise habits, diet, sleep patterns, and stress levels. It compares your inputs to patterns associated with aging." },
    { question: "Can lifestyle changes reduce my biological age?", answer: "Yes, absolutely. Improving your diet, increasing physical activity, getting adequate sleep, and managing stress can have a positive impact on your health markers, which may lower your biological age over time." },
    { question: "Is this calculator free to use online?", answer: "Yes, this is a completely free online tool designed to provide a helpful estimate of your biological age." },
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
      <main role="main">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Biological Age Calculator – Find Your True Body Age</h1>
          <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover your body's true biological age based on key health markers and lifestyle factors. This tool provides an estimate to help you understand your overall health.
          </p>
        </div>
        <BiologicalAgeCalculator />

        <section className="mt-12 space-y-8 max-w-4xl mx-auto">
            <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">How to Use the Biological Age Calculator</h2>
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    <li><strong>Enter Your Age and Health Details:</strong> Provide your chronological age and answer the questions about your lifestyle, including diet, exercise, sleep, and stress.</li>
                    <li><strong>Calculate Your Biological Age:</strong> Click the button to have our AI analyze your information.</li>
                    <li><strong>Compare Your Biological Age With Chronological Age:</strong> The result will show your estimated biological age, allowing you to see if it's higher or lower than your actual age.</li>
                </ol>
            </div>

            <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Factors That Affect Your Biological Age</h2>
                <p className="text-muted-foreground mb-4">
                    Your biological age isn't just a number; it's a reflection of your overall health. Several key lifestyle factors play a significant role:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li><strong>Diet:</strong> A balanced diet rich in nutrients can slow aging, while processed foods may accelerate it.</li>
                    <li><strong>Exercise:</strong> Regular physical activity improves cardiovascular health and keeps your body young.</li>
                    <li><strong>Sleep:</strong> Quality sleep is crucial for cellular repair and regeneration.</li>
                    <li><strong>Stress:</strong> Chronic stress can lead to inflammation and speed up the aging process.</li>
                    <li><strong>Genetics:</strong> Your genes play a role, but lifestyle choices can significantly influence their expression.</li>
                </ul>
            </div>

            <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Benefits of Knowing Your Biological Age</h2>
                <p className="text-muted-foreground">
                  Understanding your biological age gives you the power to take control of your wellness. It serves as a practical indicator of your body's health, helping you see the real-time impact of your lifestyle choices. By tracking it, you can set measurable goals, make informed decisions, and work proactively to prevent age-related diseases, ultimately empowering you to live a longer, healthier life.
                </p>
            </div>

            <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Tips to Lower Your Biological Age</h2>
                <p className="text-muted-foreground mb-4">
                    Ready to feel younger? Here are some actionable steps you can take to potentially lower your biological age:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li><strong>Eat a Whole-Foods Diet:</strong> Focus on fruits, vegetables, lean proteins, and healthy fats.</li>
                    <li><strong>Move Your Body Daily:</strong> Aim for at least 30 minutes of moderate exercise most days of the week.</li>
                    <li><strong>Prioritize Sleep:</strong> Strive for 7-9 hours of quality, uninterrupted sleep per night.</li>
                    <li><strong>Manage Stress:</strong> Incorporate mindfulness, meditation, or yoga into your routine.</li>
                    <li><strong>Stay Socially Connected:</strong> Strong social ties are linked to better health and longevity.</li>
                </ul>
            </div>

            <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">FAQs About Biological Age</h2>
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem value={`item-${index}`} key={index}>
                            <AccordionTrigger>{faq.question}</AccordionTrigger>
                            <AccordionContent>{faq.answer}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>

            <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Related Tools</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <Link href="/age-calculator" className="text-primary hover:underline">Age Calculator</Link>
                    <Link href="/birthday-age-calculator" className="text-primary hover:underline">Birthday Age Calculator</Link>
                    <Link href="/health-assessments" className="text-primary hover:underline">Health Assessment Tools</Link>
                    <Link href="/dog-age" className="text-primary hover:underline">Dog Age Calculator</Link>
                    <Link href="/cat-age-in-human-years" className="text-primary hover:underline">Cat Age Calculator</Link>
                    <Link href="/pregnancy-calculators" className="text-primary hover:underline">Pregnancy Calculators</Link>
                </div>
            </div>
        </section>
      </main>
    </div>
  );
}
