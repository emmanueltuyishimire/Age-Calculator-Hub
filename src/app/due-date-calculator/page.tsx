
import DueDateCalculator from "@/components/calculators/due-date-calculator";
import { type Metadata } from 'next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import RelatedCalculators from "@/components/layout/related-calculators";
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
    title: 'Due Date Calculator – Estimate Your Baby’s Delivery Date by LMP, Conception or IVF',
    description: 'Use our free Due Date Calculator to estimate your baby\'s expected delivery date from LMP, conception date, or IVF transfer. Fast, reliable, and easy—get your estimated due date and pregnancy week instantly.',
    openGraph: {
        title: 'Due Date Calculator – Estimate Your Baby’s Delivery Date by LMP, Conception or IVF',
        description: 'Use our free Due Date Calculator to estimate your baby\'s expected delivery date from LMP, conception date, or IVF transfer. Fast, reliable, and easy—get your estimated due date and pregnancy week instantly.',
        type: 'website',
        url: '/due-date-calculator',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Due Date Calculator – Estimate Your Baby’s Delivery Date by LMP, Conception or IVF',
        description: 'Use our free Due Date Calculator to estimate your baby\'s expected delivery date from LMP, conception date, or IVF transfer. Fast, reliable, and easy—get your estimated due date and pregnancy week instantly.',
    },
    alternates: {
        canonical: '/due-date-calculator',
    },
};

const faqs = [
    {
      question: "How accurate is the due date from this calculator?",
      answer: "A due date calculator provides a great estimate, but it's important to remember that only about 5% of babies are born on their exact due date. It's best used as a guide. A first-trimester ultrasound performed by your doctor is the most accurate method for establishing your baby's gestational age and due date."
    },
    {
      question: "Can I use this calculator if I had IVF?",
      answer: "Yes. Our calculator has a specific IVF mode. Simply choose the 'IVF Transfer Date' option and enter your embryo transfer date. The calculation will be adjusted based on a standard Day 5 blastocyst transfer, but it's a reliable estimate."
    },
    {
      question: "What if my menstrual cycle is not 28 days?",
      answer: "Our other tool, the <a href='/pregnancy-calculator' class='text-primary hover:underline'>Pregnancy Calculator</a>, allows you to enter your specific cycle length. This refines the due date estimate, as a longer or shorter cycle will shift the likely ovulation and conception dates."
    },
    {
        question: "Why is a due date based on a 40-week pregnancy?",
        answer: "A full-term pregnancy is typically considered to be 40 weeks, or 280 days, from the first day of the Last Menstrual Period (LMP). This standard is used by healthcare professionals worldwide to create a consistent timeline for prenatal care and monitoring."
    },
    {
      question: "Is this tool a substitute for medical advice?",
      answer: "No. This due date calculator is for informational and educational purposes only. It is not a substitute for professional medical advice. Always consult your healthcare provider for accurate pregnancy dating and medical decisions."
    },
    {
        question: "Can my due date change?",
        answer: "Yes, it's quite common for an initial due date estimate to be adjusted. Your doctor may update your due date based on the measurements from an early ultrasound, which provides a more precise look at the baby's development."
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

export default function DueDateCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
       <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Due Date Calculator – Find Your Baby’s Estimated Delivery Date</h1>
            <p className="text-md md:text-lg text-muted-foreground">
                Expecting a new arrival? Use our versatile Due Date Calculator to estimate when your baby will arrive. Get an estimated delivery date, your current pregnancy week, and trimester based on your Last Menstrual Period (LMP), Conception Date, or IVF Transfer Date.
            </p>
            </div>

            <DueDateCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader><CardTitle>How to Use the Due Date Calculator</CardTitle></CardHeader>
                    <CardContent>
                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                            <li><strong>Choose a Calculation Method:</strong> Select the option that best fits your situation: Last Menstrual Period (LMP) is the most common, but Conception Date and IVF Date provide more precision if you know them.</li>
                            <li><strong>Enter the Relevant Date:</strong> Use the date picker to provide the exact date based on your chosen method.</li>
                            <li><strong>Click “Calculate Due Date”:</strong> Instantly see your estimated delivery date, how far along you are, and which trimester you're in.</li>
                        </ol>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader><CardTitle>Understanding How Your Due Date Is Calculated</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-lg">Last Menstrual Period (LMP) Method</h3>
                            <p className="text-muted-foreground">This is the most standard method. It works by adding 280 days (40 weeks) to the first day of your LMP. It assumes a 28-day cycle with ovulation on day 14. It's a reliable estimate used by most doctors for initial dating.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Conception Date Method</h3>
                            <p className="text-muted-foreground">If you know the exact date of conception (for example, from ovulation tracking), this method is more precise. It calculates the due date by adding 266 days (38 weeks) to your conception date.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">IVF Transfer Date Method</h3>
                            <p className="text-muted-foreground">For those who have undergone In Vitro Fertilization, this method provides the most accurate estimate. Our calculator bases its IVF calculation on a Day 5 embryo transfer (blastocyst), adding 261 days to the transfer date.</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>What Your Due Date Really Means</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                        Think of your due date as a "due week." While 40 weeks is the standard, a full-term pregnancy can range from 38 to 42 weeks. Factors like genetics, lifestyle, and whether it's your first pregnancy can all influence the actual delivery date. Your due date is the midpoint of this likely delivery window, so it’s perfectly normal for your baby to arrive a week or two before or after.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Tips for a Healthy Pregnancy</CardTitle></CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><strong>Start Prenatal Care Early:</strong> As soon as you have a positive pregnancy test, schedule your first appointment with an OB/GYN or midwife.</li>
                            <li><strong>Take Prenatal Vitamins:</strong> Folic acid is crucial for preventing neural tube defects. Start taking a prenatal vitamin as soon as possible.</li>
                            <li><strong>Stay Hydrated and Eat Well:</strong> Focus on a balanced diet of whole foods, and drink plenty of water throughout the day.</li>
                            <li><strong>Stay Active:</strong> Regular, moderate exercise (like walking or swimming) is beneficial, unless your doctor advises otherwise.</li>
                            <li><strong>Know What to Avoid:</strong> Steer clear of alcohol, smoking, and certain foods or medications. Always consult your provider with any questions.</li>
                            <li><strong>Track Your Progress:</strong> Use our other tools like the <Link href="/gestational-age" className="text-primary hover:underline">Gestational Age Calculator</Link> to monitor your week-by-week progress.</li>
                        </ul>
                    </CardContent>
                </Card>

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
        <RelatedCalculators currentCategory="Pregnancy Calculators" currentHref="/due-date-calculator" />
      </div>
    </div>
  );
}
