
import PaybackPeriodCalculator from '@/components/calculators/payback-period-calculator';
import { type Metadata } from 'next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import RelatedCalculators from '@/components/layout/related-calculators';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Payback Period Calculator – Simple & Discounted',
    description: 'Use our free Payback Period Calculator to evaluate investments. Calculate both simple and discounted payback periods for fixed or irregular cash flows.',
    alternates: {
        canonical: '/payback-period-calculator',
    },
};

const faqs = [
    {
        question: "What is the difference between payback period and discounted payback period?",
        answer: "The simple payback period just calculates how long it takes to recoup the initial investment, without considering the time value of money. The discounted payback period is more accurate as it discounts future cash flows, showing how long it takes to break even in today's dollars."
    },
    {
        question: "Is a shorter payback period always better?",
        answer: "Generally, yes. A shorter payback period means you recoup your investment faster and the project is less risky. However, it doesn't consider cash flows that occur after the payback period, so a project with a slightly longer payback might be more profitable in the long run."
    },
    {
        question: "What is a good discount rate to use?",
        answer: "The discount rate should represent your opportunity cost or the required rate of return for the investment. It's often based on the weighted average cost of capital (WACC) or the rate of return you could get from a similarly risky investment."
    },
    {
        question: "What is the main limitation of the payback period method?",
        answer: "Its main limitation is that it ignores all cash flows that occur after the payback period is reached. This can lead to choosing a less profitable project simply because it pays back faster. That's why it's best used with other metrics like IRR or NPV."
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

export default function PaybackPeriodCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Payback Period Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Calculate both the simple and discounted payback periods for investments with either fixed or irregular cash flows.
                </p>
            </div>

            <PaybackPeriodCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader>
                        <CardTitle>Learn More About Investment Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><Link href="/roi-calculator" className="text-primary hover:underline">Return on Investment (ROI) Calculator</Link></li>
                            <li><Link href="/investment-calculator" className="text-primary hover:underline">Investment Calculator</Link></li>
                        </ul>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle>Understanding Payback Period</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground">The payback period is a metric used in capital budgeting to determine the amount of time required to recover the initial cost of an investment. It's a simple way to assess how quickly a project can generate enough cash flow to pay for itself.</p>
                        <h4 className="font-semibold text-lg">Simple vs. Discounted Payback Period</h4>
                        <p className="text-muted-foreground">This calculator provides two important variations:</p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><strong>Payback Period:</strong> This is the straightforward calculation that does not account for the time value of money. It simply asks: "How many years until cumulative cash flows equal the initial investment?"</li>
                            <li><strong>Discounted Payback Period (DPP):</strong> This is a more sophisticated metric that discounts future cash flows back to their present value. It answers the question: "How long does it take for the project to break even in today's dollars?" The DPP will always be longer than the simple payback period and provides a more realistic assessment of risk.</li>
                        </ul>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle>How to Use the Calculator</CardTitle>
                    </CardHeader>
                     <CardContent>
                        <ol className="list-decimal list-inside space-y-4 text-muted-foreground">
                            <li>
                                <strong>Choose Your Cash Flow Type:</strong>
                                <ul className="list-disc list-inside pl-6 mt-2">
                                    <li>Use the **Fixed Cash Flow** calculator if your investment generates a consistent annual cash flow that may grow at a steady rate.</li>
                                    <li>Use the **Irregular Cash Flow** calculator if the cash flow varies from year to year.</li>
                                </ul>
                            </li>
                            <li><strong>Enter Initial Investment:</strong> This is the total upfront cost of your project.</li>
                            <li><strong>Provide Cash Flow Details:</strong> Fill in the annual cash flow amounts. For the fixed calculator, specify any annual increase. For the irregular calculator, you can add as many years as needed.</li>
                            <li><strong>Set a Discount Rate:</strong> This is the rate of return you require on your investment (also known as the hurdle rate or opportunity cost). It is used to calculate the discounted payback period.</li>
                            <li><strong>Click “Calculate”:</strong> Get an instant breakdown of both payback periods and see a year-by-year schedule of your cash flows.</li>
                        </ol>
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
        <RelatedCalculators currentCategory="Financial Calculators" currentHref="/payback-period-calculator" />
      </div>
    </div>
  );
}
