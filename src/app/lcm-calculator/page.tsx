
import LcmCalculator from '@/components/calculators/lcm-calculator';
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
    title: 'Least Common Multiple (LCM) Calculator',
    description: 'Use our free Least Common Multiple (LCM) Calculator to find the LCM of a set of numbers. Includes methods like prime factorization and greatest common divisor.',
    alternates: {
        canonical: '/lcm-calculator',
    },
};

const faqs = [
    {
        question: "What is the LCM of 12 and 15?",
        answer: "The LCM of 12 and 15 is 60. The multiples of 12 are (12, 24, 36, 48, 60, ...), and the multiples of 15 are (15, 30, 45, 60, ...). The first multiple they have in common is 60."
    },
    {
        question: "How do you find the LCM using the GCF?",
        answer: "You can find the LCM of two numbers by using their Greatest Common Factor (GCF). The formula is: LCM(a, b) = (|a * b|) / GCF(a, b). Our calculator uses this method to efficiently find the LCM of a list of numbers."
    },
    {
        question: "Is there a limit to how many numbers I can enter?",
        answer: "Our calculator is designed to handle a reasonable list of numbers. For best performance, we recommend entering up to 10-15 numbers at a time."
    },
    {
        question: "Can I use negative numbers?",
        answer: "Yes. The LCM is typically defined as the smallest *positive* integer that is divisible by the numbers, so the calculator will use the absolute values of your inputs for the calculation."
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

export default function LcmCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Least Common Multiple (LCM) Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                   Please provide numbers separated by a comma "," and click the "Calculate" button to find the LCM.
                </p>
            </div>

            <LcmCalculator />

            <section className="mt-12 space-y-8 animate-fade-in prose dark:prose-invert lg:prose-xl max-w-none">
                <Card>
                    <CardHeader>
                        <CardTitle>How to Use the LCM Calculator</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                            <li><strong>Enter Numbers:</strong> Type the integers you want to find the LCM for into the input box. Separate each number with a comma.</li>
                            <li><strong>Click "Calculate":</strong> Press the button to process the numbers.</li>
                            <li><strong>View Result:</strong> The Least Common Multiple of the numbers you entered will be displayed instantly.</li>
                        </ol>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle>What is the Least Common Multiple (LCM)?</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                        <p>In mathematics, the least common multiple, also known as the lowest common multiple of two (or more) integers a and b, is the smallest positive integer that is divisible by both. It is commonly denoted as LCM(a, b).</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Methods for Finding the LCM</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 text-muted-foreground">
                        <div>
                            <h4 className="font-semibold text-foreground">Brute Force Method</h4>
                            <p>There are multiple ways to find a least common multiple. The most basic is simply using a "brute force" method that lists out each integer's multiples.</p>
                            <p className="p-2 bg-muted rounded-md text-sm"><span className="font-bold">EX: Find LCM(18, 26)</span><br/>18: 18, 36, 54, 72, 90, 108, 126, 144, 162, 180, 198, 216, 234<br/>26: 26, 52, 78, 104, 130, 156, 182, 208, 234</p>
                            <p>As can be seen, this method can be fairly tedious, and is far from ideal.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-foreground">Prime Factorization Method</h4>
                            <p>A more systematic way to find the LCM of some given integers is to use prime factorization. Prime factorization involves breaking down each of the numbers being compared into its product of prime numbers. The LCM is then determined by multiplying the highest power of each prime number together. Note that computing the LCM this way, while more efficient than using the "brute force" method, is still limited to smaller numbers.</p>
                             <p className="p-2 bg-muted rounded-md text-sm"><span className="font-bold">EX: Find LCM(21, 14, 38)</span><br/>21 = 3 × 7<br/>14 = 2 × 7<br/>38 = 2 × 19<br/>The LCM is therefore: 3 × 7 × 2 × 19 = 798</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-foreground">Greatest Common Divisor (GCD) Method</h4>
                            <p>A third viable method for finding the LCM of some given integers is using the greatest common divisor. This is also frequently referred to as the greatest common factor (GCF). The procedure for finding the LCM using GCF is to divide the product of the numbers a and b by their GCF, i.e. (|a × b|) / GCF(a,b). When trying to determine the LCM of more than two numbers, for example LCM(a, b, c), first find the LCM of a and b, which will be q. Then find the LCM of c and q. The result will be the LCM of all three numbers.</p>
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
        <RelatedCalculators currentCategory="Math" currentHref="/lcm-calculator" />
      </div>
    </div>
  );
}
