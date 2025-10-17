
import GcfCalculator from '@/components/calculators/gcf-calculator';
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
    title: 'Greatest Common Factor (GCF) Calculator',
    description: 'Use our free Greatest Common Factor (GCF) Calculator to find the GCF of a set of numbers. Includes methods like prime factorization and the Euclidean algorithm.',
    alternates: {
        canonical: '/gcf-calculator',
    },
};

const faqs = [
    {
        question: "What is the GCF of 12 and 18?",
        answer: "The GCF of 12 and 18 is 6. The factors of 12 are (1, 2, 3, 4, 6, 12), and the factors of 18 are (1, 2, 3, 6, 9, 18). The greatest factor they have in common is 6."
    },
    {
        question: "How do you find the GCF using the Euclidean algorithm?",
        answer: "The Euclidean algorithm is a method of repeatedly subtracting the smaller number from the larger number until you get a remainder of 0. The GCF is the last non-zero remainder. Our calculator uses this efficient method."
    },
    {
        question: "Is there a limit to how many numbers I can enter?",
        answer: "Our calculator is designed to handle a reasonable list of numbers. For best performance, we recommend entering up to 10-15 numbers at a time."
    },
    {
        question: "Can I use negative numbers?",
        answer: "Yes. The GCF is always a positive integer, so the calculator will use the absolute values of your inputs for the calculation."
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

export default function GcfCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Greatest Common Factor (GCF) Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                   Please provide numbers separated by a comma "," and click the "Calculate" button to find the GCF.
                </p>
            </div>

            <GcfCalculator />

            <section className="mt-12 space-y-8 animate-fade-in prose dark:prose-invert lg:prose-xl max-w-none">
                <Card>
                    <CardHeader>
                        <CardTitle>How to Use the GCF Calculator</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                            <li><strong>Enter Numbers:</strong> Type the integers you want to find the GCF for into the input box. Separate each number with a comma.</li>
                            <li><strong>Click "Calculate":</strong> Press the button to process the numbers.</li>
                            <li><strong>View Result:</strong> The Greatest Common Factor of the numbers you entered will be displayed instantly.</li>
                        </ol>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle>What is the Greatest Common Factor (GCF)?</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                        <p>In mathematics, the greatest common factor (GCF), also known as the greatest common divisor, of two (or more) non-zero integers a and b, is the largest positive integer by which both integers can be divided. It is commonly denoted as GCF(a, b). For example, GCF(32, 256) = 32.</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Methods for Finding the GCF</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 text-muted-foreground">
                        <div>
                            <h4 className="font-semibold text-foreground">Prime Factorization Method</h4>
                            <p>One method for finding the greatest common factor involves computing the prime factorizations of each integer, determining which factors they have in common, and multiplying these factors to find the GCD. Refer to the example below.</p>
                            <p className="p-2 bg-muted rounded-md text-sm"><span className="font-bold">EX: GCF(16, 88, 104)</span><br/>16 = 2 × 2 × 2 × 2<br/>88 = 2 × 2 × 2 × 11<br/>104 = 2 × 2 × 2 × 13<br/>Common factors are 2, 2, and 2. Thus, GCF(16, 88, 104) = 2 × 2 × 2 = 8.</p>
                            <p>Prime factorization is only efficient for smaller integer values. Larger values would make the process far more tedious.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-foreground">Euclidean Algorithm</h4>
                            <p>The Euclidean algorithm uses a division algorithm combined with the observation that the GCF of two integers also divides their difference. It is a far more efficient method. The process is as follows:</p>
                             <ol className="list-decimal list-inside space-y-1">
                                <li>Given two positive integers, a and b, where a > b, subtract b from a to get a result c.</li>
                                <li>Continue subtracting b from a until the result c is smaller than b.</li>
                                <li>Use b as the new large number and subtract the final result c, repeating the process until the remainder is 0.</li>
                                <li>The GCF is the remainder from the step preceding the zero result.</li>
                            </ol>
                            <p className="p-2 bg-muted rounded-md text-sm"><span className="font-bold">EX: GCF(268442, 178296)</span><br/>268442 - 178296 = 90146<br/>178296 - 90146 = 88150<br/>...and so on...<br/>4 - 2 × 2 = 0<br/>The GCF is 2.</p>
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
        <RelatedCalculators currentCategory="Math" currentHref="/gcf-calculator" />
      </div>
    </div>
  );
}
