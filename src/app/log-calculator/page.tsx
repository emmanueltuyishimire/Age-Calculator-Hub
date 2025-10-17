
import LogCalculator from '@/components/calculators/log-calculator';
import { type Metadata } from 'next';
import RelatedCalculators from '@/components/layout/related-calculators';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const metadata: Metadata = {
    title: 'Log Calculator (Logarithm)',
    description: 'A free online Logarithm Calculator to solve for the base, argument, or result in the equation log_b(x) = y. Also includes explanations of log rules and formulas.',
    alternates: {
        canonical: '/log-calculator',
    },
};

const faqs = [
    {
        question: "How do you calculate a logarithm?",
        answer: "To calculate y in log_b(x) = y, you can use the change of base formula: y = log(x) / log(b), where the log can be any base (like 10 or e). Our calculator does this for you automatically."
    },
    {
        question: "What is the difference between log and ln?",
        answer: "Conventionally, 'log' implies a base of 10 (log₁₀), which is common in science and engineering. 'ln' stands for natural logarithm and always implies a base of Euler's number, e (logₑ), which is frequently used in mathematics and physics."
    },
    {
        question: "How do I use this calculator to solve for the base or argument?",
        answer: "Simply leave the field you want to solve for blank, fill in the other two, and click 'Calculate'. For example, to solve for x in log₂(x) = 3, you would enter 2 for the base, 3 for the result, and leave the 'x' field empty."
    },
    {
        question: "Can this calculator handle 'e' as a base?",
        answer: "Yes. You can type the letter 'e' directly into the base input field, and the calculator will use its value (approximately 2.71828) for the calculation."
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

export default function LogCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main role="main" className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Log Calculator (Logarithm)</h1>
          <p className="text-md md:text-lg text-muted-foreground">
            Please provide any two values to calculate the third in the logarithm equation log<sub>b</sub>x=y. It can accept "e" as a base input.
          </p>
        </div>

        <LogCalculator />

        <section className="mt-12 space-y-8 animate-fade-in prose dark:prose-invert lg:prose-xl max-w-none">
            
            <Card>
                <CardHeader>
                    <CardTitle>What is a Logarithm?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                    <p>The logarithm, or log, is the inverse of the mathematical operation of exponentiation. This means that the log of a number is the number that a fixed base has to be raised to in order to yield the number. Conventionally, log implies that base 10 is being used, though the base can technically be anything. When the base is e, ln is usually written, rather than log<sub>e</sub>. log₂, the binary logarithm, is another base that is typically used with logarithms. If, for example:</p>
                    <p className="p-4 bg-muted rounded-md font-mono text-center">x = b<sup>y</sup>; then y = log<sub>b</sub>x; where b is the base</p>
                    <p>Each of the mentioned bases is typically used in different applications. Base 10 is commonly used in science and engineering, base e in math and physics, and base 2 in computer science.</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Basic Logarithm Rules</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 text-muted-foreground">
                    <div>
                        <h4 className="font-semibold text-foreground">Product Rule</h4>
                        <p>The logarithm of the product of two numbers is the sum of their logarithms.</p>
                        <p className="p-2 bg-muted rounded-md font-mono">log<sub>b</sub>(x × y) = log<sub>b</sub>x + log<sub>b</sub>y</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-foreground">Quotient Rule</h4>
                        <p>The logarithm of a fraction is the logarithm of the numerator minus the logarithm of the denominator.</p>
                        <p className="p-2 bg-muted rounded-md font-mono">log<sub>b</sub>(x / y) = log<sub>b</sub>x - log<sub>b</sub>y</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-foreground">Power Rule</h4>
                        <p>The logarithm of an exponential number is the exponent times the logarithm of the base.</p>
                        <p className="p-2 bg-muted rounded-md font-mono">log<sub>b</sub>(x<sup>y</sup>) = y × log<sub>b</sub>x</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-foreground">Change of Base Rule</h4>
                        <p>This rule allows you to change the base of a logarithm.</p>
                        <p className="p-2 bg-muted rounded-md font-mono">log<sub>b</sub>(x) = log<sub>k</sub>(x) / log<sub>k</sub>(b)</p>
                    </div>
                     <div>
                        <h4 className="font-semibold text-foreground">Reciprocal Rule</h4>
                        <p>This rule allows you to switch the base and argument of a logarithm.</p>
                        <p className="p-2 bg-muted rounded-md font-mono">log<sub>b</sub>(c) = 1 / log<sub>c</sub>(b)</p>
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
        <RelatedCalculators currentCategory="Math" currentHref="/log-calculator" />
      </main>
    </div>
  );
}
