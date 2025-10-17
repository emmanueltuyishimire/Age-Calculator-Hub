
import FactorCalculator from '@/components/calculators/factor-calculator';
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
    title: 'Factor Calculator – Find Factors & Prime Factorization',
    description: 'Use our free Factor Calculator to find all the factors and the prime factorization of any integer. Includes explanations and examples.',
    alternates: {
        canonical: '/factor-calculator',
    },
};

const faqs = [
    {
        question: "What are the factors of 120?",
        answer: "The factors of 120 are 1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 24, 30, 40, 60, and 120. Our calculator can find the factors for any integer."
    },
    {
        question: "What is the prime factorization of 120?",
        answer: "The prime factorization of 120 is 2 × 2 × 2 × 3 × 5. This means these are the prime numbers that multiply together to equal 120."
    },
    {
        question: "Is there a limit to the number I can factor?",
        answer: "Finding prime factors of very large numbers is computationally intensive. Our calculator is optimized for numbers up to about 15 digits long. For finding all factors, the limit is higher."
    },
    {
        question: "Can I factor negative numbers?",
        answer: "Yes. The calculator will find the factors of the absolute value of the number you enter, as factors are typically considered positive integers."
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


export default function FactorCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
       <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Factor Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Please provide an integer to calculate its factors and prime factors.
                </p>
            </div>

            <FactorCalculator />

            <section className="mt-12 space-y-8 animate-fade-in prose dark:prose-invert lg:prose-xl max-w-none">
                <Card>
                    <CardHeader>
                        <CardTitle>How to Use the Factor Calculator</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                            <li><strong>Enter an Integer:</strong> Type the number you want to factor into the input box.</li>
                            <li><strong>Click "Calculate Factors":</strong> Press the button to see the results.</li>
                            <li><strong>View Results:</strong> The calculator will instantly display two lists: all the integer factors of your number, and its prime factorization.</li>
                        </ol>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>What is a factor?</CardTitle></CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                       <p>In multiplication, factors are the integers that are multiplied together to find other integers. For example, 6 × 5 = 30. In this example, 6 and 5 are the factors of 30. 1, 2, 3, 10, 15, and 30 would also be factors of 30. Essentially, an integer a is a factor of another integer b, so long as b can be divided by a with no remainder. Factors are important when working with fractions, as well as when trying to find patterns within numbers.</p>
                       <p>Prime factorization involves finding the prime numbers that, when multiplied, return the number being addressed. For example, prime factorization of 120 results in 2 × 2 × 2 × 3 × 5. It can be helpful to use a factor tree when computing the prime factorizations of numbers. Using 120:</p>
                       <div className="p-4 bg-muted rounded-md text-sm font-mono">
                           <p className="text-center">120<br/>/   \<br/>2   60<br/>    /   \<br/>   2   30<br/>       /   \<br/>      2   15<br/>          /   \<br/>         3    5</p>
                       </div>
                       <p>Although no efficient algorithm has been found for prime factorization of very large numbers, it also has yet to be proven that no such algorithm exists. This makes prime factorization a fascinating area of computer science and mathematics.</p>
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
        <RelatedCalculators currentCategory="Math" currentHref="/factor-calculator" />
      </div>
    </div>
  );
}
