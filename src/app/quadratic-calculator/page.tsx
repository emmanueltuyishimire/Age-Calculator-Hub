
import QuadraticCalculator from '@/components/calculators/quadratic-calculator';
import { type Metadata } from 'next';
import RelatedCalculators from '@/components/layout/related-calculators';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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
                <CardContent className="flex justify-center items-center p-6 bg-muted rounded-md">
                   <svg viewBox="0 0 300 100" width="300" height="100" xmlns="http://www.w3.org/2000/svg" className="fill-current text-foreground">
                      <text x="5" y="55" fontFamily="monospace" fontSize="24">x =</text>
                      <text x="50" y="35" fontFamily="monospace" fontSize="24">-b ±</text>
                      <path d="M 125 35 L 130 55 L 135 20" stroke="currentColor" fill="none" strokeWidth="2" />
                      <text x="138" y="35" fontFamily="monospace" fontSize="24">b² - 4ac</text>
                      <line x1="125" y1="18" x2="245" y2="18" stroke="currentColor" strokeWidth="2" />
                      <line x1="45" y1="65" x2="255" y2="65" stroke="currentColor" strokeWidth="2" />
                      <text x="145" y="85" fontFamily="monospace" fontSize="24">2a</text>
                    </svg>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Derivation of the Quadratic Formula</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground p-6 bg-muted rounded-md font-mono text-sm leading-loose">
                    <p>ax² + bx + c = 0</p>
                    <p>ax² + bx = -c</p>
                    <p>x² + (b/a)x = -c/a</p>
                    <p>x² + (b/a)x + (b/2a)² = -c/a + (b/2a)²</p>
                    <p>(x + b/2a)² = (b² - 4ac) / 4a²</p>
                    <p>x + b/2a = ±√(b² - 4ac) / 2a</p>
                    <p>x = [-b ± √(b² - 4ac)] / 2a</p>
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
