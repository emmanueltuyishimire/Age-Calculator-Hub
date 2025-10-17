
import VatCalculator from '@/components/calculators/vat-calculator';
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
    title: 'VAT Calculator – Calculate Value Added Tax',
    description: 'Use our free VAT Calculator to easily add or subtract Value Added Tax (VAT) from a price. Calculate gross and net amounts, and the tax portion, based on any VAT rate.',
    alternates: {
        canonical: '/vat-calculator',
    },
};

const faqs = [
    {
        question: "What is VAT?",
        answer: "VAT stands for Value Added Tax. It is a type of consumption tax placed on a product whenever value is added at each stage of the supply chain, from production to the point of sale. The end consumer ultimately pays the tax."
    },
    {
        question: "How do I calculate VAT?",
        answer: "To add VAT to a net price, you multiply the net price by (1 + VAT rate/100). To subtract VAT from a gross price, you divide the gross price by (1 + VAT rate/100) to find the net amount. Our calculator does this for you automatically."
    },
    {
        question: "What is the difference between 'VAT Included' and 'VAT Excluded'?",
        answer: "'VAT Excluded' mode starts with a price before tax (net price) and adds VAT to it. 'VAT Included' mode starts with a price that already includes tax (gross price) and calculates how much of that price was tax."
    },
    {
        question: "What's the difference between VAT and Sales Tax?",
        answer: "VAT is collected at every stage of production and distribution, whereas sales tax is only collected at the final point of sale to the consumer. The end result for the consumer is often similar, but the collection process is different."
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

export default function VatCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">VAT Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Easily add or remove Value Added Tax from a price. This tool helps you see the gross price, net price, and the tax amount.
                </p>
            </div>

            <VatCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader>
                        <CardTitle>How to Use the VAT Calculator</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                            <li><strong>Select Calculation Type:</strong> Choose 'VAT Excluded' to add tax to a net price, or 'VAT Included' to extract tax from a gross price.</li>
                            <li><strong>Enter the Price:</strong> Input the amount based on your selection.</li>
                            <li><strong>Enter the VAT Rate:</strong> Provide the VAT percentage.</li>
                            <li><strong>Click “Calculate”:</strong> Instantly see a breakdown of the net price, VAT amount, and gross price.</li>
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
        <RelatedCalculators currentCategory="Math Calculators" currentHref="/vat-calculator" />
      </div>
    </div>
  );
}
