
import RentalPropertyCalculator from '@/components/calculators/rental-property-calculator';
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
    title: 'Rental Property Calculator – Analyze Investment Returns (IRR, Cap Rate)',
    description: 'Use our free Rental Property Calculator to analyze real estate investments. Estimate cash flow, cap rate, ROI, and IRR. Factor in loans, expenses, appreciation, and sale costs.',
    alternates: {
        canonical: '/rental-property-calculator',
    },
};

const faqs = [
    {
        question: "What is IRR (Internal Rate of Return)?",
        answer: "IRR is the annualized total return earned on each dollar invested for the period it is invested. It accounts for all cash flows (income, expenses, purchase, and sale) and the time value of money, making it one of the most accurate measures of an investment's profitability."
    },
    {
        question: "What is a good capitalization (cap) rate?",
        answer: "A 'good' cap rate is highly dependent on the market, but generally ranges from 4% to 10%. A higher cap rate often indicates higher return but potentially higher risk, while a lower cap rate may suggest lower risk and a more stable market."
    },
    {
        question: "What is the 1% rule?",
        answer: "The 1% rule is a guideline suggesting that the gross monthly rental income from a property should be at least 1% of its purchase price. For a $200,000 property, this would mean a monthly rent of at least $2,000. It's a quick test for positive cash flow potential."
    },
    {
        question: "How do I account for vacancies and maintenance?",
        answer: "It's crucial to budget for these. A common practice is to estimate vacancy at 5-10% of the gross rent and maintenance at 1-2% of the property's value per year. Our calculator includes fields for these to ensure a more realistic analysis."
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

export default function RentalPropertyCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Rental Property Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Analyze the profitability of a rental property investment by calculating its cash flow, capitalization rate, and internal rate of return (IRR).
                </p>
            </div>

            <RentalPropertyCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader>
                        <CardTitle>How to Use the Rental Property Calculator</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                            <li><strong>Purchase Details:</strong> Enter the property's price, your down payment, and loan details if applicable. Include any initial repair costs.</li>
                            <li><strong>Income:</strong> Input the monthly rent and any other recurring income. Set a vacancy rate to account for empty periods.</li>
                            <li><strong>Operating Expenses:</strong> Fill in all recurring costs, including property tax, insurance, maintenance, and management fees. Provide an estimated annual increase for these costs.</li>
                            <li><strong>Sale Projections:</strong> Set the holding period, estimated appreciation rate, and cost to sell to project your final return.</li>
                            <li><strong>Click “Calculate”:</strong> Get a detailed analysis including key metrics and a year-by-year financial breakdown.</li>
                        </ol>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle>Rental Property Investments</CardTitle>
                        <CardDescription>Understanding the Basics</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                        <p>Rental property investment refers to the purchase of real estate followed by holding, leasing, and eventually selling it. This can be a profitable venture but requires careful analysis and management. Properties can range from single-family homes to large commercial buildings.</p>
                        <p>Unlike stocks, rental properties are not liquid but offer potential stability, tax benefits, and a hedge against inflation. Our calculator is designed to help you run the numbers for a thorough financial analysis.</p>
                        <h4 className="font-semibold text-foreground">Responsibilities of Ownership</h4>
                        <p>Owning a rental property is an active investment. Key responsibilities include tenant management (finding and screening tenants, handling leases, collecting rent), property maintenance (repairs, upkeep), and administration (paperwork, budgeting, taxes). Many owners hire property management companies for a fee (typically around 10% of rent) to handle these tasks.</p>
                    </CardContent>
                </Card>

                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Key Investment Metrics</h2>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Internal Rate of Return (IRR)</AccordionTrigger>
                            <AccordionContent>IRR, or annualized total return, is a powerful metric that calculates the annual rate earned on each dollar invested for the period it is invested. It accounts for all cash inflows and outflows over time, making it one of the best measures for comparing different investments. A higher IRR generally indicates a more desirable investment.</AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Capitalization Rate (Cap Rate)</AccordionTrigger>
                            <AccordionContent>The cap rate is the ratio of the property's Net Operating Income (NOI) to its current market value. It provides a quick snapshot of a property's profitability, independent of financing. It is calculated as: <strong>Cap Rate = NOI / Property Price</strong>. It is excellent for quick, high-level comparisons between properties.</AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>Cash Flow Return on Investment (CFROI)</AccordionTrigger>
                            <AccordionContent>Also known as Cash-on-Cash Return, CFROI measures the annual cash flow you receive relative to the actual cash you invested (e.g., your down payment and closing costs). It shows how hard your invested capital is working for you. The formula is: <strong>CFROI = Annual Cash Flow / Total Cash Invested</strong>.</AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>General Guidelines & Rules of Thumb</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                        <p>While detailed analysis is crucial, these guidelines can be useful for quick assessments:</p>
                        <ul className="list-disc list-inside space-y-2">
                            <li><strong>The 50% Rule:</strong> A rule of thumb suggesting that operating expenses (excluding mortgage) will be about 50% of your gross rental income. The other 50% is then available to cover your mortgage payment, leaving the rest as cash flow.</li>
                            <li><strong>The 1% Rule:</strong> This guideline suggests that the gross monthly rent should be at least 1% of the property's purchase price to ensure positive cash flow. For a $300,000 property, you'd want to see at least $3,000 in monthly rent.</li>
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
                                    <p>{faq.answer}</p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>
        </main>
        <RelatedCalculators currentCategory="Financial Calculators" currentHref="/rental-property-calculator" />
      </div>
    </div>
  );
}
