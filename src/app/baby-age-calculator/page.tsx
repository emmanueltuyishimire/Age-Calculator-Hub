
import BabyAgeCalculator from '@/components/calculators/baby-age-calculator';
import { type Metadata } from 'next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import RelatedCalculators from '@/components/layout/related-calculators';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
    title: 'Baby Age Calculator - Calculate Age in Weeks, Months & Days',
    description: 'A free tool to calculate your baby\'s age in weeks, months, and days. Track your baby\'s growth and developmental milestones easily. Find out exactly how old your baby is.',
    openGraph: {
        title: 'Baby Age Calculator - Calculate Age in Weeks, Months & Days',
        description: 'A free tool to calculate your baby\'s age in weeks, months, and days. Track your baby\'s growth and developmental milestones easily.',
        type: 'website',
        url: '/baby-age-calculator',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Baby Age Calculator - Calculate Age in Weeks, Months & Days',
        description: 'A free tool to calculate your baby\'s age in weeks, months, and days. Track your baby\'s growth and developmental milestones easily.',
    },
    alternates: {
        canonical: '/baby-age-calculator',
    },
};

const faqs = [
    { question: "How do I use the baby age calculator?", answer: "Simply enter your baby's date of birth and click 'Calculate'. The tool will instantly show you their age in multiple formats: years/months/days, total weeks, and total months." },
    { question: "How to calculate baby age in weeks?", answer: "The calculator finds the total number of days since birth and divides by 7 to get the total weeks. The remainder is the number of extra days." },
    { question: "Is 12 weeks the same as 3 months?", answer: "Not exactly. A month has about 4.3 weeks on average. So, 12 weeks is a little less than 3 months. Our calculator shows you both formats to avoid confusion." },
    { question: "Why is tracking baby age in weeks important?", answer: "For the first few months, doctors track developmental milestones and growth by weeks. It's the most precise way to monitor a newborn's progress." },
    { question: "How to count baby months after birth?", answer: "A baby is considered '1 month old' after one full calendar month has passed since their birth date, not just after 4 weeks." },
    { question: "Can I use this calculator for toddlers?", answer: "Yes! The calculator works perfectly for toddlers and young children, providing their age in years, months, and days." },
    { question: "How accurate is this calculator?", answer: "It is very accurate. It uses the precise number of days between the birth date and today, accounting for all calendar variations." },
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

export default function BabyAgeCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
       <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Baby Age Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Wondering exactly how old your little one is? Our Baby Age Calculator gives you a precise age in years, months, weeks, and days, so you can track every precious milestone.
                </p>
            </div>

            <BabyAgeCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader><CardTitle>Why Use a Baby Age Calculator?</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                           In the first couple of years, a baby's development happens at lightning speed. Tracking their age accurately is important for several reasons:
                        </p>
                        <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
                            <li><strong>Doctor's Appointments:</strong> Pediatricians track growth and schedule vaccinations based on the baby's age in weeks and months.</li>
                            <li><strong>Developmental Milestones:</strong> Knowing your baby's precise age helps you understand if they are on track for milestones like rolling over, sitting up, and talking.</li>
                            <li><strong>Feeding Schedules:</strong> A baby's nutritional needs change rapidly. Age in weeks and months often dictates when to introduce solid foods.</li>
                            <li><strong>Clarity:</strong> It answers the common confusion between weeks and months. For example, a baby is 3 months old, not at 12 weeks, but after 3 full calendar months have passed.</li>
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Understanding the Results</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                           Our calculator provides your baby's age in the most useful formats, so you have the right information for any situation:
                        </p>
                         <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
                            <li><strong>Years, Months, and Days:</strong> The standard format for everyday use and for toddlers.</li>
                            <li><strong>Total Weeks and Days:</strong> The most common format used by pediatricians for newborns and infants.</li>
                            <li><strong>Total Months and Days:</strong> Helpful for understanding monthly milestones as your baby gets a bit older.</li>
                        </ul>
                    </CardContent>
                </Card>

                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Frequently Asked Questions (FAQs)</h2>
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
        <RelatedCalculators currentCategory="Pregnancy & Baby" currentHref="/baby-age-calculator" />
      </div>
    </div>
  );
}
