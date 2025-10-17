
import ScientificNotationCalculator from '@/components/calculators/scientific-notation-calculator';
import { type Metadata } from 'next';
import RelatedCalculators from '@/components/layout/related-calculators';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const metadata: Metadata = {
    title: 'Scientific Notation Calculator with Steps (Add, Subtract, Multiply, Divide)',
    description: 'A free online calculator to add, subtract, multiply, and divide numbers in scientific notation, showing the steps. Includes a converter for scientific, E-notation, and decimal formats.',
    alternates: {
        canonical: '/scientific-notation-calculator',
    },
};

const faqs = [
    {
        question: "How do you add or subtract in scientific notation?",
        answer: "To add or subtract, the numbers must have the same exponent (power of 10). If they don't, you must adjust one of them. Then, you add or subtract the coefficients (the base numbers) and keep the exponent the same. Our calculator shows these steps automatically."
    },
    {
        question: "How do you multiply or divide in scientific notation?",
        answer: "To multiply, you multiply the coefficients and add the exponents. To divide, you divide the coefficients and subtract the exponents. The calculator will then normalize the result back into proper scientific notation."
    },
    {
        question: "What is E-notation?",
        answer: "E-notation is a shorthand for scientific notation where '×10' is replaced by the letter 'E'. For example, 5.2 × 10^4 becomes 5.2E4. It's commonly used in calculators and programming."
    },
    {
        question: "What is engineering notation?",
        answer: "Engineering notation is a form of scientific notation where the exponent of 10 must be a multiple of 3 (e.g., 10^3, 10^-6, 10^9). This aligns with SI prefixes like kilo-, milli-, and giga-. Our converter provides this format."
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

export default function ScientificNotationCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main role="main" className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Scientific Notation Calculator</h1>
          <p className="text-md md:text-lg text-muted-foreground">
            A free online tool to perform arithmetic on numbers in scientific notation and convert between different formats, with step-by-step explanations.
          </p>
        </div>

        <ScientificNotationCalculator />

        <section className="mt-12 space-y-8 animate-fade-in prose dark:prose-invert lg:prose-xl max-w-none">
            <Card>
                <CardHeader>
                    <CardTitle>What is Scientific Notation?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                    <p>Scientific notation is a way to express numbers that are too large or too small to be conveniently written in decimal form. It is commonly used in mathematics, engineering, and science. A number is written in scientific notation as:</p>
                    <p className="p-4 bg-muted rounded-md font-mono text-center text-lg">b × 10<sup>n</sup></p>
                    <p>where <strong>b</strong> is a number between 1 and 10 (the significand), and <strong>n</strong> is an integer (the exponent).</p>
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
        <RelatedCalculators currentCategory="Math" currentHref="/scientific-notation-calculator" />
      </main>
    </div>
  );
}
