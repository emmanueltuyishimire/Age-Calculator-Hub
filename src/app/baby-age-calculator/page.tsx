
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export const metadata: Metadata = {
    title: 'Baby Age Calculator: Weeks to Months, by Date of Birth',
    description: 'Use our free Baby Age Calculator to find your baby\'s age in weeks, months, and days from their date of birth. Includes a baby age chart to convert weeks to months easily.',
    openGraph: {
        title: 'Baby Age Calculator: Weeks to Months, by Date of Birth',
        description: 'A free tool to calculate your baby\'s age in weeks, months, and days. Track your baby\'s growth and developmental milestones easily.',
        type: 'website',
        url: '/baby-age-calculator',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Baby Age Calculator: Weeks to Months, by Date of Birth',
        description: 'A free tool to calculate your baby\'s age in weeks, months, and days. Track your baby\'s growth and developmental milestones easily.',
    },
    alternates: {
        canonical: '/baby-age-calculator',
    },
};

const faqs = [
    { question: "How do I use the baby age calculator by date of birth?", answer: "Simply enter your baby's date of birth into the calculator and click 'Calculate'. The tool will instantly show you their age in multiple formats: years/months/days, total weeks, and total months." },
    { question: "How to calculate baby age in weeks?", answer: "The calculator finds the total number of days since birth and divides by 7 to get the total weeks. The remainder is the number of extra days." },
    { question: "Is 12 weeks the same as 3 months?", answer: "Not exactly, and this is a common point of confusion. A month has about 4.3 weeks on average. So, 12 weeks is a little less than 3 full calendar months. Our calculator shows you both formats to avoid confusion, and the chart below provides a quick reference." },
    { question: "Why is tracking baby age in weeks important?", answer: "For the first few months, doctors track developmental milestones and growth by weeks. It's the most precise way to monitor a newborn's progress." },
    { question: "How to count baby months after birth?", answer: "A baby is considered '1 month old' after one full calendar month has passed since their birth date, not just after 4 weeks." },
    { question: "Can I use this calculator for toddlers?", answer: "Yes! The calculator works perfectly for toddlers and young children, providing their age in years, months, and days." },
    { question: "How accurate is this date of birth calculator?", answer: "It is very accurate. It uses the precise number of days between the birth date and today, accounting for all calendar variations." },
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

const babyAgeChart = [
    { weeks: 4, months: "Approx. 1 month" },
    { weeks: 8, months: "Approx. 2 months" },
    { weeks: 12, months: "Approx. 3 months" },
    { weeks: 16, months: "Approx. 4 months" },
    { weeks: 20, months: "Approx. 5 months" },
    { weeks: 24, months: "Approx. 6 months" },
    { weeks: 36, months: "Approx. 9 months" },
    { weeks: 52, months: "1 year" },
];


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
                    Wondering exactly how old your little one is? Our online Baby Age Calculator uses their date of birth to give you a precise age in years, months, weeks, and days, so you can track every precious milestone.
                </p>
            </div>

            <BabyAgeCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader><CardTitle>Why Use a Baby Age Calculator?</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                           In the first couple of years, a baby's development happens at lightning speed. Using an online age calculator to track their age from their date of birth is important for several reasons:
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
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Baby Age Chart: Weeks to Months</h2>
                    <p className="text-muted-foreground mb-4">
                        This baby age chart provides a quick conversion from weeks to months to help you visualize your baby's growth.
                    </p>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Age in Weeks</TableHead>
                                    <TableHead>Equivalent Age in Months</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {babyAgeChart.map((row) => (
                                    <TableRow key={row.weeks}>
                                        <TableCell className="font-medium">{row.weeks} weeks</TableCell>
                                        <TableCell>{row.months}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>

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
