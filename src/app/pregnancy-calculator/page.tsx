
import PregnancyCalculator from "@/components/calculators/pregnancy-calculator";
import { type Metadata } from 'next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import RelatedCalculators from "@/components/layout/related-calculators";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Pregnancy Calculator – Estimate How Far Along You Are by LMP',
    description: 'Use our free Pregnancy Calculator to estimate how many weeks pregnant you are and when your baby is due. Fast, accurate, and based on your last menstrual period (LMP).',
    openGraph: {
        title: 'Pregnancy Calculator – Estimate How Far Along You Are by LMP',
        description: 'Use our free Pregnancy Calculator to estimate how many weeks pregnant you are and when your baby is due. Fast, accurate, and based on your last menstrual period (LMP).',
        type: 'website',
        url: '/pregnancy-calculator',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Pregnancy Calculator – Estimate How Far Along You Are by LMP',
        description: 'Use our free Pregnancy Calculator to estimate how many weeks pregnant you are and when your baby is due. Fast, accurate, and based on your last menstrual period (LMP).',
    },
    alternates: {
        canonical: '/pregnancy-calculator',
    },
};

const faqs = [
    { question: "How does the pregnancy calculator work?", answer: "It calculates your estimated due date by adding 280 days (40 weeks) to the first day of your last menstrual period (LMP). It also determines your gestational age (how many weeks pregnant you are) and the likely conception date based on this information." },
    { question: "Is this calculator accurate?", answer: "This calculator provides a reliable estimate, especially for women with a regular 28-day cycle. However, the most accurate method for dating a pregnancy is a first-trimester ultrasound. Always consult your healthcare provider for confirmation." },
    { question: "What if I have an irregular cycle?", answer: "If your cycle is not a typical 28 days, the estimate may be less accurate. Our calculator allows you to adjust the cycle length, which provides a more personalized result. If your cycles are very irregular, your doctor may rely more on an ultrasound for dating." },
    { question: "What is the difference between gestational age and fetal age?", answer: "Gestational age is measured from the first day of your last period, while fetal age is the actual age of the baby from conception. Fetal age is typically two weeks shorter than gestational age. This calculator uses gestational age, which is the standard medical practice." },
    { question: "Can I use this calculator for twins?", answer: "Yes. The dating of a pregnancy is the same for singletons and multiples. However, twin pregnancies are often delivered earlier than 40 weeks, so your doctor will provide guidance on your likely delivery timeframe." },
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

export default function PregnancyCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
       <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Pregnancy Calculator – Estimate Your Pregnancy Week and Due Date</h1>
            <p className="text-md md:text-lg text-muted-foreground">
                Just found out you're expecting? Our free Pregnancy Calculator helps you estimate how many weeks pregnant you are, your estimated due date, and your likely conception date, all based on your last menstrual period (LMP).
            </p>
            </div>

            <PregnancyCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader><CardTitle>How to Use the Pregnancy Calculator</CardTitle></CardHeader>
                    <CardContent>
                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                            <li><strong>Enter Your Last Menstrual Period (LMP):</strong> Select the first day of your last period from the calendar. This is the most crucial piece of information.</li>
                            <li><strong>Adjust Cycle Length (Optional):</strong> The calculator defaults to a 28-day cycle, which is the average. If your cycle is consistently longer or shorter, adjust this number for better accuracy.</li>
                            <li><strong>Click “Calculate”:</strong> Get your personalized pregnancy timeline instantly.</li>
                        </ol>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Understanding Your Results</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                         <div>
                            <h3 className="font-semibold text-lg">Gestational Age</h3>
                            <p className="text-muted-foreground">This tells you how many weeks and days pregnant you are. It's the primary way doctors track pregnancy progress.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Estimated Due Date</h3>
                            <p className="text-muted-foreground">This is the projected date your baby will arrive, based on a 40-week gestation period.</p>
                        </div>
                         <div>
                            <h3 className="font-semibold text-lg">Estimated Conception Date</h3>
                            <p className="text-muted-foreground">This is the approximate date you likely conceived. It's typically about two weeks after your LMP.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Current Trimester</h3>
                            <p className="text-muted-foreground">This shows which of the three trimesters of pregnancy you are currently in.</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Pregnancy Weeks and Trimesters Explained</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                        Pregnancy is typically measured in weeks, starting from the first day of your last menstrual period. A full-term pregnancy is about 40 weeks long. This duration is divided into three trimesters, each marking different stages of fetal development and changes in the mother's body.
                        </p>
                         <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4">
                            <li><strong>First Trimester:</strong> Week 1 to Week 13. A period of rapid development for the baby.</li>
                            <li><strong>Second Trimester:</strong> Week 14 to Week 27. Often called the "golden period" as many early pregnancy symptoms subside.</li>
                            <li><strong>Third Trimester:</strong> Week 28 to Week 40+. The final stage of growth as the baby prepares for birth.</li>
                        </ul>
                         <p className="text-muted-foreground mt-4">Our <Link href="/gestational-age" className="text-primary hover:underline">Gestational Age Calculator</Link> provides more week-by-week details.</p>
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
        <RelatedCalculators currentCategory="Pregnancy Calculators" currentHref="/pregnancy-calculator" />
      </div>
    </div>
  );
}
