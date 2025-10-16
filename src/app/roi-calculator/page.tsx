
import RoiCalculator from '@/components/calculators/roi-calculator';
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
    title: 'Return on Investment (ROI) Calculator',
    description: 'Use our free ROI Calculator to evaluate the profitability of an investment. Calculate total ROI and annualized ROI based on investment amount, return, and time period.',
    alternates: {
        canonical: '/roi-calculator',
    },
};

const faqs = [
    {
        question: "What is the basic formula for ROI?",
        answer: "The basic formula is: ROI = (Gain from Investment - Cost of Investment) / Cost of Investment. The result is then multiplied by 100 to get a percentage."
    },
    {
        question: "What is the difference between ROI and Annualized ROI?",
        answer: "ROI is a simple percentage gain over the entire investment period, regardless of how long it took. Annualized ROI converts that return into an average annual rate, which makes it much more useful for comparing different investments with different time horizons."
    },
    {
        question: "Why is the timeframe important for ROI?",
        answer: "A 100% ROI over one year is a fantastic return. A 100% ROI over 50 years is a very poor return. The investment time is crucial for understanding the true performance, which is why Annualized ROI is a more meaningful metric."
    },
    {
        question: "Can ROI be negative?",
        answer: "Yes. If the amount returned is less than the amount you invested, your investment gain will be negative, resulting in a negative ROI."
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

export default function RoiCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Return on Investment (ROI) Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Evaluate the profitability of an investment by calculating its total and annualized ROI.
                </p>
            </div>

            <RoiCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader>
                        <CardTitle>How to Use the ROI Calculator</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                            <li><strong>Amount Invested:</strong> Enter the total cost of the investment (your initial cash outflow).</li>
                            <li><strong>Amount Returned:</strong> Input the total amount you received back from the investment.</li>
                            <li><strong>Investment Time:</strong> Select the start and end dates of the investment period.</li>
                            <li><strong>Click “Calculate”:</strong> Get an instant breakdown of your investment gain, total ROI, and annualized ROI.</li>
                        </ol>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Understanding Return on Investment (ROI)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                        <p>In finance, Return on Investment, usually abbreviated as ROI, is a common, widespread metric used to evaluate the forecasted profitability on different investments. The metric can be applied to anything from stocks, real estate, employees, to even a sheep farm; anything that has a cost with the potential to derive gains from can have an ROI assigned to it.</p>
                        <p>The basic formula for ROI is:</p>
                        <p className="text-center font-mono p-4 bg-background rounded-md shadow-inner">ROI = (Gain from Investment - Cost of Investment) / Cost of Investment</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>The Challenge of Using ROI: Time and Consistency</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                        <p>The biggest nuance with ROI is that there is no timeframe involved. Take, for instance, an investor with an investment decision between a diamond with an ROI of 1,000% or a piece of land with an ROI of 50%. Right off the bat, the diamond seems like the no-brainer, but is it true if the ROI is calculated over 50 years for the diamond as opposed to the land's ROI calculated over several months?</p>
                        <p>This is why our ROI Calculator includes an "Annualized ROI," which is a rate normally more meaningful for comparison. It converts the total return into an equivalent annual rate, providing a much better way to compare different investments.</p>
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
        <RelatedCalculators currentCategory="Financial Calculators" currentHref="/roi-calculator" />
      </div>
    </div>
  );
}
