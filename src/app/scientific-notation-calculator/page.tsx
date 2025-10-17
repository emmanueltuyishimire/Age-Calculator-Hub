
import ScientificNotationCalculator from '@/components/calculators/scientific-notation-calculator';
import { type Metadata } from 'next';
import RelatedCalculators from '@/components/layout/related-calculators';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const metadata: Metadata = {
    title: 'Scientific Notation Calculator & Converter',
    description: 'A free online calculator to perform arithmetic with scientific notation and a converter to switch between scientific, E-notation, and decimal formats.',
    alternates: {
        canonical: '/scientific-notation-calculator',
    },
};

const faqs = [
    {
        question: "How do you convert a number to scientific notation?",
        answer: "To convert a number to scientific notation, move the decimal point until there is only one non-zero digit to its left. The number of places you moved the decimal becomes the exponent on the 10. If you moved the decimal left, the exponent is positive. If you moved it right, the exponent is negative."
    },
    {
        question: "What is E-notation?",
        answer: "E-notation is a shorthand for scientific notation where '×10' is replaced by the letter 'E'. For example, 5.2 × 10^4 becomes 5.2E4. It's commonly used in calculators and programming."
    },
    {
        question: "What is engineering notation?",
        answer: "Engineering notation is a form of scientific notation where the exponent of 10 must be a multiple of 3 (e.g., 10^3, 10^-6, 10^9). This aligns with SI prefixes like kilo-, milli-, and giga-. Our converter provides this format."
    },
    {
        question: "How does the precision setting work?",
        answer: "The precision setting in the calculator determines the number of significant digits to display in the result of a calculation. A higher precision will show more digits after the decimal point."
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
            A free online tool to convert numbers to scientific notation and perform arithmetic operations.
          </p>
        </div>

        <ScientificNotationCalculator />

        <section className="mt-12 space-y-8 animate-fade-in prose dark:prose-invert lg:prose-xl max-w-none">
            <Card>
                <CardHeader>
                    <CardTitle>What is Scientific Notation?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                    <p>Scientific notation is a way to express numbers in a form that makes numbers that are too small or too large more convenient to write and perform calculations with. It is commonly used in mathematics, engineering, and science, as it can help simplify arithmetic operations. In scientific notation, numbers are written as a base, b, referred to as the significand, multiplied by 10 raised to an integer exponent, n, which is referred to as the order of magnitude:</p>
                    <p className="p-4 bg-muted rounded-md font-mono text-center text-lg">b × 10<sup>n</sup></p>
                    <p>Below are some examples of numbers written in decimal notation compared to scientific notation:</p>
                    <ul className="list-disc list-inside">
                        <li>5 &rarr; 5 × 10<sup>0</sup></li>
                        <li>700 &rarr; 7 × 10<sup>2</sup></li>
                        <li>1,000,000 &rarr; 1 × 10<sup>6</sup></li>
                        <li>0.0004212 &rarr; 4.212 × 10<sup>-4</sup></li>
                    </ul>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Calculations with Scientific Notation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 text-muted-foreground">
                    <div>
                        <h4 className="font-semibold text-foreground">Addition and Subtraction</h4>
                        <p>To add and subtract in scientific notation, ensure that each number is converted to a number with the same power of 10. For example, 100 can be written as 1×10<sup>2</sup>, 0.01×10<sup>4</sup>, etc. Once the numbers are all written to the same power of 10, add or subtract the digit terms.</p>
                    </div>
                     <div>
                        <h4 className="font-semibold text-foreground">Multiplication</h4>
                        <p>To multiply numbers in scientific notation, multiply the digit terms normally and add the exponents of the powers of 10 to determine the new power of 10.</p>
                    </div>
                     <div>
                        <h4 className="font-semibold text-foreground">Division</h4>
                        <p>To divide numbers in scientific notation, divide the digit terms normally and subtract the exponents of the powers of 10.</p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Engineering and E-notation</CardTitle>
                </CardHeader>
                 <CardContent className="space-y-6 text-muted-foreground">
                    <div>
                        <h4 className="font-semibold text-foreground">Engineering Notation</h4>
                        <p>Engineering notation is similar to scientific notation except that the exponent, n, is restricted to multiples of 3 (e.g., 0, 3, 6, 9, -3, -6). This aligns with SI prefixes like kilo-, mega-, and giga-. For example, 1.234 × 10<sup>8</sup> becomes 123.4 × 10<sup>6</sup>.</p>
                    </div>
                     <div>
                        <h4 className="font-semibold text-foreground">E-notation</h4>
                        <p>E-notation is almost the same as scientific notation except that the "× 10" is replaced with just "E" or "e". It is used in cases where the exponent cannot be conveniently displayed, such as in computer programming or calculators. For example, 4.212 × 10<sup>-4</sup> becomes 4.212E-4.</p>
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
        <RelatedCalculators currentCategory="Math" currentHref="/scientific-notation-calculator" />
      </main>
    </div>
  );
}
