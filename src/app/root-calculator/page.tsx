
import RootCalculator from '@/components/calculators/root-calculator';
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
    title: 'Root Calculator – Find Square, Cube & nth Roots',
    description: 'A free online Root Calculator to find the square root, cube root, or any nth root of a number. Includes formulas and methods for estimating roots.',
    alternates: {
        canonical: '/root-calculator',
    },
};

const faqs = [
    {
        question: "How do you calculate a square root?",
        answer: "A square root of a number 'a' is a number 'b' such that b² = a. For example, the square root of 9 is 3 because 3 * 3 = 9. Our calculator finds this for you instantly."
    },
    {
        question: "What is an nth root?",
        answer: "The nth root of a number 'a' is another number 'b' that, when multiplied by itself n times, equals a. For example, the 4th root of 16 is 2, because 2*2*2*2 = 16."
    },
    {
        question: "Can this calculator handle negative numbers?",
        answer: "Yes, for odd roots (like the cube root). However, it cannot calculate even roots (like the square root) of negative numbers as this results in an imaginary number, which is not supported."
    },
    {
        question: "Can I use fractions as input?",
        answer: "Yes, our calculator supports fractional inputs. You can enter values like '16/81' and it will be evaluated correctly."
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

export default function RootCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main role="main" className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Root Calculator</h1>
          <p className="text-md md:text-lg text-muted-foreground">
            A suite of tools to calculate the square root, cube root, or any nth root of a number.
          </p>
        </div>

        <RootCalculator />

        <section className="mt-12 space-y-8 animate-fade-in prose dark:prose-invert lg:prose-xl max-w-none">
            
            <Card>
                <CardHeader>
                    <CardTitle>What is a Root?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                    <p>In mathematics, the general root, or the nth root of a number <strong>a</strong> is another number <strong>b</strong> that when multiplied by itself <strong>n</strong> times, equals <strong>a</strong>. In equation format:</p>
                    <p className="p-4 bg-muted rounded-md font-mono text-center text-lg"><sup>n</sup>√a = b  &harr;  b<sup>n</sup> = a</p>
                    <p>Some common roots include the square root, where n = 2, and the cubed root, where n = 3.</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Estimating a Root</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 text-muted-foreground">
                    <div>
                        <h3 className="font-semibold text-foreground">Estimating a Square Root</h3>
                        <p>Calculating square roots and nth roots is fairly intensive. It requires estimation and trial and error. There exist more precise and efficient ways to calculate square roots, but below is a method that does not require a significant understanding of more complicated math concepts. To calculate √a:</p>
                        <ol className="list-decimal list-inside space-y-1">
                            <li>Estimate a number b</li>
                            <li>Divide a by b. If the number c returned is precise to the desired decimal place, stop.</li>
                            <li>Average b and c and use the result as a new guess</li>
                            <li>Repeat step two</li>
                        </ol>
                    </div>
                     <div>
                        <h3 className="font-semibold text-foreground">Estimating an nth Root</h3>
                        <p>Calculating nth roots can be done using a similar method, with modifications to deal with n. For those with an understanding of series, refer here for a more mathematical algorithm for calculating nth roots. For a simpler, but less efficient method, continue to the following steps and example. To calculate <sup>n</sup>√a:</p>
                        <ol className="list-decimal list-inside space-y-1">
                             <li>Estimate a number b</li>
                             <li>Divide a by b<sup>n-1</sup>. If the number c returned is precise to the desired decimal place, stop.</li>
                             <li>Average: [b × (n-1) + c] / n</li>
                             <li>Repeat step two</li>
                        </ol>
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
        <RelatedCalculators currentCategory="Math" currentHref="/root-calculator" />
      </main>
    </div>
  );
}
