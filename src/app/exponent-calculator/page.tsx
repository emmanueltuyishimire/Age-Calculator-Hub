
import ExponentCalculator from '@/components/calculators/exponent-calculator';
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
    title: 'Exponent Calculator – Solve for Base, Exponent, or Result',
    description: 'A free online Exponent Calculator to solve for any variable in an exponential equation. Also includes detailed explanations of exponent laws and rules.',
    alternates: {
        canonical: '/exponent-calculator',
    },
};

const faqs = [
    {
        question: "How do I solve for the exponent (n)?",
        answer: "To solve for n in a^n = x, you use logarithms. The formula is n = log(x) / log(a). Our calculator does this for you automatically when you leave the exponent field blank."
    },
    {
        question: "How do I solve for the base (a)?",
        answer: "To solve for a in a^n = x, you take the nth root of x. The formula is a = x^(1/n). Leave the base field blank, and our calculator will compute this."
    },
    {
        question: "What does 'use e as base' do?",
        answer: "When this is checked, the calculator uses Euler's number (e ≈ 2.71828) as the base 'a'. This is useful for calculations involving natural logarithms and exponential growth."
    },
    {
        question: "Can this calculator handle negative exponents?",
        answer: "Yes. A negative exponent means you take the reciprocal of the base. For example, 2^-3 is the same as 1 / (2^3), which equals 1/8 or 0.125."
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

export default function ExponentCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Exponent Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Enter any two values into the input fields to solve for the third.
                </p>
            </div>

            <ExponentCalculator />

            <section className="mt-12 space-y-8 animate-fade-in prose dark:prose-invert lg:prose-xl max-w-none">
                <Card>
                    <CardHeader><CardTitle>What is an exponent?</CardTitle></CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                        <p>Exponentiation is a mathematical operation, written as a<sup>n</sup>, involving the base <strong>a</strong> and an exponent <strong>n</strong>. In the case where n is a positive integer, exponentiation corresponds to repeated multiplication of the base, n times.</p>
                        <p className="p-2 bg-muted rounded-md font-mono text-center">a<sup>n</sup> = a × a × ... × a (n times)</p>
                        <p>The calculator above accepts negative bases, but does not compute imaginary numbers. It also does not accept fractions, but can be used to compute fractional exponents, as long as the exponents are input in their decimal form.</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Basic Exponent Laws and Rules</CardTitle></CardHeader>
                    <CardContent className="space-y-6 text-muted-foreground">
                        <div>
                            <h4 className="font-semibold text-foreground">Multiplication with Same Base</h4>
                            <p>When exponents that share the same base are multiplied, the exponents are added.</p>
                            <p className="p-2 bg-muted rounded-md font-mono">a<sup>n</sup> × a<sup>m</sup> = a<sup>(n+m)</sup></p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-foreground">Negative Exponent</h4>
                            <p>A negative exponent signifies a reciprocal. The negative sign is removed by reciprocating the base and raising it to the positive exponent.</p>
                            <p className="p-2 bg-muted rounded-md font-mono">a<sup>-n</sup> = 1 / a<sup>n</sup></p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-foreground">Division with Same Base</h4>
                            <p>When exponents that share the same base are divided, the exponents are subtracted.</p>
                            <p className="p-2 bg-muted rounded-md font-mono">a<sup>m</sup> / a<sup>n</sup> = a<sup>(m - n)</sup></p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-foreground">Power of a Power</h4>
                            <p>When an exponent is raised to another exponent, the exponents are multiplied.</p>
                            <p className="p-2 bg-muted rounded-md font-mono">(a<sup>m</sup>)<sup>n</sup> = a<sup>(m × n)</sup></p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-foreground">Power of a Product</h4>
                            <p>When multiplied bases are raised to an exponent, the exponent is distributed to both bases.</p>
                            <p className="p-2 bg-muted rounded-md font-mono">(a × b)<sup>n</sup> = a<sup>n</sup> × b<sup>n</sup></p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-foreground">Power of a Quotient</h4>
                             <p>When divided bases are raised to an exponent, the exponent is distributed to both bases.</p>
                            <p className="p-2 bg-muted rounded-md font-mono">(a / b)<sup>n</sup> = a<sup>n</sup> / b<sup>n</sup></p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-foreground">Exponent of One or Zero</h4>
                            <p>When an exponent is 1, the base remains the same (a<sup>1</sup> = a). When an exponent is 0, the result is always 1 (a<sup>0</sup> = 1).</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-foreground">Fractional Exponent</h4>
                            <p>When an exponent is a fraction, it signifies a root. For example, a<sup>1/n</sup> is the nth root of a.</p>
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
        <RelatedCalculators currentCategory="Math Calculators" currentHref="/exponent-calculator" />
      </div>
    </div>
  );
}
