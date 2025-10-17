
import QuadraticCalculator from '@/components/calculators/quadratic-calculator';
import { type Metadata } from 'next';
import RelatedCalculators from '@/components/layout/related-calculators';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Quadratic Formula Calculator',
    description: 'Solve quadratic equations using the quadratic formula. Enter the coefficients a, b, and c to find the solutions for x. Includes derivation and examples.',
    alternates: {
        canonical: '/quadratic-calculator',
    },
};

const faqs = [
    {
        question: "What is a quadratic equation?",
        answer: "A quadratic equation is a second-degree polynomial equation of the form ax² + bx + c = 0, where a, b, and c are coefficients and 'a' cannot be zero."
    },
    {
        question: "How do you use the quadratic formula?",
        answer: "To use the quadratic formula, you identify the coefficients a, b, and c from your equation and substitute them into the formula: x = [-b ± sqrt(b² - 4ac)] / 2a. Our calculator does this for you automatically."
    },
    {
        question: "What does the discriminant (b² - 4ac) tell you?",
        answer: "The discriminant determines the nature of the roots. If it's positive, there are two distinct real roots. If it's zero, there is exactly one real root. If it's negative, there are two distinct complex (imaginary) roots."
    },
    {
        question: "Can I use fractions for the coefficients?",
        answer: "Yes, our calculator can handle fractional inputs like '3/4'. It will convert them to decimals for the calculation."
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

export default function QuadraticCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main role="main" className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Quadratic Formula Calculator</h1>
          <p className="text-md md:text-lg text-muted-foreground">
            The calculator below solves the quadratic equation of ax² + bx + c = 0.
          </p>
        </div>

        <QuadraticCalculator />

        <section className="mt-12 space-y-8 animate-fade-in prose dark:prose-invert lg:prose-xl max-w-none">
            
            <Card>
                <CardHeader>
                    <CardTitle>What is a Quadratic Equation?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                    <p>In algebra, a quadratic equation is any polynomial equation of the second degree with the following form:</p>
                    <p className="p-4 bg-muted rounded-md font-mono text-center text-lg">ax² + bx + c = 0</p>
                    <p>where x is an unknown, a is referred to as the quadratic coefficient, b the linear coefficient, and c the constant. The numerals a, b, and c are coefficients of the equation, and they represent known numbers. For example, a cannot be 0, or the equation would be linear rather than quadratic. A quadratic equation can be solved in multiple ways, including factoring, using the quadratic formula, completing the square, or graphing. Only the use of the quadratic formula, as well as the basics of completing the square, will be discussed here (since the derivation of the formula involves completing the square).</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>The Quadratic Formula</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                    <Image src="https://www.calculatorsoup.com/images/formulas/quadratic-formula.png" alt="The Quadratic Formula" width={300} height={100} />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Derivation of the Quadratic Formula</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <p className="text-muted-foreground">The quadratic formula is derived from the standard form of a quadratic equation by completing the square.</p>
                     <Image src="https://www.calculatorsoup.com/images/formulas/quadratic-formula-derivation.png" alt="Derivation of the quadratic formula" width={500} height={400} className="mx-auto" />
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
        <RelatedCalculators currentCategory="Math" currentHref="/quadratic-calculator" />
      </main>
    </div>
  );
}
