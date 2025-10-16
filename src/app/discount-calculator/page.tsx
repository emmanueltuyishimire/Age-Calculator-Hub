
import DiscountCalculator from '@/components/calculators/discount-calculator';
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
    title: 'Discount Calculator – Calculate Price After Discount',
    description: 'Use our free Discount Calculator to find the final price after a percentage or fixed amount off. See how much you save on sale items instantly.',
    alternates: {
        canonical: '/discount-calculator',
    },
};

const faqs = [
    {
        question: "How do you calculate a discount?",
        answer: "To calculate a percentage discount, convert the percentage to a decimal (e.g., 20% becomes 0.20) and multiply it by the original price to find the savings. Then, subtract the savings from the original price. For a fixed amount discount, you simply subtract the discount amount from the original price."
    },
    {
        question: "How do I calculate 20% off a price?",
        answer: "Multiply the price by 0.20 to find the discount amount. Then subtract that discount from the original price. For example, 20% off $50 is $50 * 0.20 = $10 savings, so the final price is $50 - $10 = $40."
    },
    {
        question: "What is the difference between a percentage and a fixed amount discount?",
        answer: "A percentage discount is relative to the price (e.g., 15% off), so the savings amount changes with the price. A fixed amount discount is a set value (e.g., $5 off) regardless of the original price."
    },
    {
        question: "Can I calculate double discounts with this calculator?",
        answer: "This calculator is designed for a single discount. To calculate a double discount (e.g., an additional 10% off an already discounted price), you would first calculate the price after the first discount, and then use that new price as the 'Original Price' to calculate the second discount."
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

export default function DiscountCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Discount Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Quickly calculate the final price after a discount and see exactly how much you're saving.
                </p>
            </div>

            <DiscountCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader>
                        <CardTitle>How to Use the Discount Calculator</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                            <li><strong>Enter the Original Price:</strong> Input the item's full price before any discounts.</li>
                            <li><strong>Enter the Discount:</strong> Type in the discount value.</li>
                            <li><strong>Select Discount Type:</strong> Use the dropdown to choose whether the discount is a percentage (%) or a fixed amount ($).</li>
                            <li><strong>Click “Calculate”:</strong> Instantly see the final, discounted price and the total amount you've saved.</li>
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
        <RelatedCalculators currentCategory="Financial Calculators" currentHref="/discount-calculator" />
      </div>
    </div>
  );
}
