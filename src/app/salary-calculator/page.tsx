
import SalaryCalculator from '@/components/calculators/salary-calculator';
import { type Metadata } from 'next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import RelatedCalculators from '@/components/layout/related-calculators';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Salary Calculator – Convert Hourly, Bi-Weekly, Monthly & Annual Pay',
    description: 'Use our free Salary Calculator to convert any salary to its hourly, daily, weekly, bi-weekly, semi-monthly, monthly, quarterly, and annual equivalents, adjusted for holidays and vacation days.',
    alternates: {
        canonical: '/salary-calculator',
    },
};

const faqs = [
    {
        question: "How do you calculate annual salary from an hourly wage?",
        answer: "A common quick calculation is to multiply the hourly wage by 2080 (40 hours/week * 52 weeks/year). Our calculator refines this by also considering paid holidays and vacation days for a more accurate 'take-home' equivalent."
    },
    {
        question: "What is the difference between bi-weekly and semi-monthly pay?",
        answer: "Bi-weekly pay occurs every two weeks, resulting in 26 paychecks per year. Semi-monthly pay occurs twice a month (e.g., on the 15th and last day), resulting in 24 paychecks per year. The paychecks for semi-monthly pay are slightly larger, but you receive two fewer paychecks over the year."
    },
    {
        question: "How does the 'holidays and vacation days adjusted' salary work?",
        answer: "This calculation shows your effective pay rate based on the actual number of days you work. It subtracts your paid holidays and vacation days from the total weekdays in a year (260) to find your true working days, then recalculates your salary based on that new total."
    },
    {
        question: "Why would I use this calculator?",
        answer: "This tool is great for comparing job offers with different pay structures, figuring out your hourly rate from an annual salary to see what your time is worth, or understanding how your salary breaks down into different pay periods for budgeting purposes."
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

export default function SalaryCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Salary Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Convert your salary to its equivalent hourly, weekly, monthly, and annual amounts. See how holidays and vacation time affect your real pay.
                </p>
            </div>

            <SalaryCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader>
                        <CardTitle>Learn More About Your Pay</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><Link href="/articles/understanding-your-paycheck" className="text-primary hover:underline">Understanding Your Paycheck: A Guide to Deductions and Net Pay</Link></li>
                        </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>How to Use the Salary Calculator</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                            <li><strong>Enter Your Salary:</strong> Input your salary amount and select its frequency (e.g., per Hour, per Year).</li>
                            <li><strong>Define Your Work Schedule:</strong> Adjust the hours per week and days per week if they differ from the standard 40/5.</li>
                            <li><strong>Add Paid Time Off:</strong> Enter your number of paid holidays and vacation days per year. This will be used for the 'adjusted' calculation.</li>
                            <li><strong>Click “Calculate”:</strong> Instantly see a full breakdown of your salary across all common pay frequencies, both with and without adjustments for time off.</li>
                        </ol>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Understanding Unadjusted vs. Adjusted Pay</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-lg">Unadjusted Pay</h3>
                            <p className="text-muted-foreground">This calculation is based on the standard assumption of 260 working days (5 days a week for 52 weeks). It shows your salary as a direct conversion without accounting for any paid time off.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Adjusted Pay</h3>
                            <p className="text-muted-foreground">This is a more realistic look at your effective pay rate. It subtracts your paid holidays and vacation from the 260 total weekdays to find your actual number of working days. This shows what you truly earn for the time you are actively working.</p>
                        </div>
                    </CardContent>
                </Card>

                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                             <AccordionItem value={`item-${index}`} key={index}>
                                <AccordionTrigger>{faq.question}</AccordionTrigger>
                                <AccordionContent>
                                    <p>{faq.answer}</p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>
        </main>
        <RelatedCalculators currentCategory="Financial Calculators" currentHref="/salary-calculator" />
      </div>
    </div>
  );
}
