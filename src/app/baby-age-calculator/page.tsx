
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
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Baby Age Calculator: Weeks, Months & Days from Birth',
    description: 'Free Baby Age Calculator to find your baby\'s age in weeks, months, and days from their date of birth. Includes a baby age chart and info on corrected age for premature babies.',
    openGraph: {
        title: 'Baby Age Calculator: Weeks, Months & Days from Birth',
        description: 'A free tool to calculate your baby\'s age in weeks and months after birth. Track your baby\'s growth and developmental milestones easily. Includes info for preterm babies.',
        type: 'website',
        url: '/baby-age-calculator',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Baby Age Calculator: Weeks, Months & Days from Birth',
        description: 'A free tool to calculate your baby\'s age in weeks and months after birth. Track your baby\'s growth and developmental milestones easily. Includes info for preterm babies.',
    },
    alternates: {
        canonical: '/baby-age-calculator',
    },
};

const faqs = [
    { question: "How do I use the baby age calculator by date of birth?", answer: "Simply enter your baby's date of birth into the calculator and click 'Calculate'. The tool will instantly show you their chronological age in multiple formats: years/months/days, total weeks, and total months." },
    { question: "How to calculate baby age in weeks?", answer: "The calculator finds the total number of days since birth and divides by 7 to get the total weeks. The remainder is the number of extra days. This is useful for tracking a newborn's progress." },
    { question: "Is 12 weeks the same as 3 months for a baby?", answer: "Not exactly. A month has about 4.3 weeks on average. So, 12 weeks is a little less than 3 full calendar months. Our calculator shows you both formats to avoid confusion, and the baby age chart below provides a quick reference." },
    { question: "What is corrected age for a premature baby?", answer: "Corrected age (or adjusted age) is your baby's age minus the number of weeks they were born early. For example, a 6-month-old baby who was born 2 months early has a corrected age of 4 months. Doctors use corrected age to assess a preterm baby's development." },
    { question: "Does this calculator work for premature babies?", answer: "This calculator determines the baby's chronological age (actual time since birth). It does not calculate the corrected age. For a premature or preterm baby, you should track both chronological and corrected age, and always follow your pediatrician’s guidance on developmental milestones." },
    { question: "Does this calculator handle leap year birthdays?", answer: "Yes, our algorithm correctly accounts for leap years to ensure the age calculation is always accurate." },
    { question: "Why is tracking baby age in weeks important?", answer: "For the first few months, doctors track developmental milestones and growth by weeks. It's the most precise way to monitor a newborn's progress." },
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
    { weeks: 4, months: "Approx. 1 month", days: "28 days" },
    { weeks: 8, months: "Approx. 2 months", days: "56 days" },
    { weeks: 12, months: "Approx. 3 months", days: "84 days" },
    { weeks: 16, months: "Approx. 4 months", days: "112 days" },
    { weeks: 20, months: "Approx. 5 months", days: "140 days" },
    { weeks: 24, months: "Approx. 6 months", days: "168 days" },
    { weeks: 36, months: "Approx. 9 months", days: "252 days" },
    { weeks: 52, months: "1 year", days: "364 days" },
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
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Baby Age Calculator: Weeks, Months & Days</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Wondering exactly how old your little one is? Our online Baby Age Calculator uses their date of birth to give you a precise age in years, months, weeks, and days, so you can track every precious milestone from the moment they are born.
                </p>
            </div>

            <BabyAgeCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader><CardTitle>How to Use the Baby Age Calculator</CardTitle></CardHeader>
                    <CardContent>
                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                            <li><strong>Enter Your Baby's Date of Birth:</strong> Use the input fields (DD, MM, YYYY) to enter their exact birthday.</li>
                            <li><strong>Click "Calculate Baby's Age":</strong> Press the button to get an instant result.</li>
                            <li><strong>View the Results:</strong> The tool will show your baby's age in three useful formats:
                                <ul className="list-disc list-inside pl-6 mt-2">
                                    <li>Years, months, and days for a standard view.</li>
                                    <li>Total weeks and days, which is common for newborns.</li>
                                    <li>Total months and days.</li>
                                </ul>
                            </li>
                        </ol>
                    </CardContent>
                </Card>

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
                
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Baby Age Chart: Weeks to Months and Days</h2>
                    <p className="text-muted-foreground mb-4">
                        This baby age chart provides a quick conversion from weeks to months to help you visualize your baby's growth.
                    </p>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Age in Weeks</TableHead>
                                    <TableHead>Equivalent Age in Days</TableHead>
                                    <TableHead>Equivalent Age in Months</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {babyAgeChart.map((row) => (
                                    <TableRow key={row.weeks}>
                                        <TableCell className="font-medium">{row.weeks} weeks</TableCell>
                                        <TableCell>{row.days}</TableCell>
                                        <TableCell>{row.months}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>

                <Card>
                    <CardHeader><CardTitle>Corrected Age for Premature Babies</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                           If your baby was born prematurely (before 37 weeks of pregnancy), your pediatrician will likely use a "corrected age" to track their development. Corrected age is the baby's chronological age minus the number of weeks or months they were born early.
                        </p>
                        <p className="text-muted-foreground mt-2">
                           For example, if your baby is 16 weeks old but was born 4 weeks early, their corrected age is 12 weeks. This adjusted age is used to evaluate developmental milestones because premature babies need time to catch up.
                        </p>
                         <p className="text-muted-foreground mt-2">
                           This calculator determines the **chronological age** (the time since birth). Always consult your healthcare provider about your premature baby's development based on their corrected age.
                        </p>
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
