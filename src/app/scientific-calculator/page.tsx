
import ScientificCalculator from '@/components/calculators/scientific-calculator-loader';
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
    title: 'Scientific Calculator – Advanced Online Math Tool',
    description: 'Use our free online scientific calculator for advanced mathematics. Features trigonometric functions, logarithms, exponents, and more. Perfect for students and professionals.',
    alternates: {
        canonical: '/scientific-calculator',
    },
};

const faqs = [
    {
        question: "How do I use the scientific calculator?",
        answer: "You can click the buttons with your mouse or use your keyboard to enter numbers and operations. The calculator supports standard functions like sine, cosine, tangent, logarithms, and exponents."
    },
    {
        question: "What does the 'Deg/Rad' button do?",
        answer: "This button switches the calculator's mode between Degrees (Deg) and Radians (Rad). This is crucial for trigonometric functions like sin, cos, and tan, as the results will differ based on the selected mode."
    },
    {
        question: "How do the memory functions (M+, M-, MR, MC) work?",
        answer: "M+ adds the current display value to memory. M- subtracts it. MR (Memory Recall) puts the memory value on the display. MC (Memory Clear) resets the memory to zero."
    },
    {
        question: "What is 'Ans'?",
        answer: "The 'Ans' button recalls the result of the last completed calculation, allowing you to use it in your next operation."
    },
    {
        question: "Can I use keyboard shortcuts?",
        answer: "Yes, you can use your keyboard's number keys, operators (+, -, *, /), and the Enter key for equals. The 'Backspace' key works for the backspace function."
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

export default function ScientificCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main role="main" className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Scientific Calculator</h1>
              <p className="text-md md:text-lg text-muted-foreground">
                  A powerful online scientific calculator for all your advanced mathematical needs.
              </p>
          </div>

          <div className="flex justify-center">
            <ScientificCalculator />
          </div>

          <section className="mt-12 space-y-8 animate-fade-in">
              <Card>
                  <CardHeader>
                      <CardTitle>Learn More About Math & Finance</CardTitle>
                  </CardHeader>
                  <CardContent>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                         <li><Link href="/articles/the-power-of-compound-interest" className="text-primary hover:underline">The Power of Compound Interest</Link></li>
                      </ul>
                  </CardContent>
              </Card>
              <Card>
                  <CardHeader>
                      <CardTitle>How to Use the Scientific Calculator</CardTitle>
                  </CardHeader>
                  <CardContent>
                      <p className="text-muted-foreground">This calculator mimics a physical scientific calculator. You can click the buttons or use your keyboard for input.</p>
                      <ol className="list-decimal list-inside space-y-2 text-muted-foreground mt-4">
                          <li><strong>Input Numbers:</strong> Use the number pad (0-9) and the decimal point (.).</li>
                          <li><strong>Perform Operations:</strong> Use the standard operators (+, −, ×, ÷). The calculator respects the order of operations.</li>
                          <li><strong>Use Scientific Functions:</strong>
                              <ul className="list-disc list-inside pl-6 mt-1">
                                  <li>For functions like √x (square root) or sin, click the function button *before* entering the number.</li>
                                  <li>For power functions like x<sup>y</sup>, enter the base, click the x<sup>y</sup> button, then enter the exponent and press =.</li>
                              </ul>
                          </li>
                          <li><strong>Toggle Modes:</strong> Use the `Deg/Rad` button to switch between degrees and radians for trigonometric calculations. The active mode is highlighted.</li>
                          <li><strong>Use Memory:</strong> Store the displayed number with `M+` (add to memory) or `M-` (subtract from memory). Recall the stored number with `MR`. Clear the memory with `AC` (All Clear), which also clears the current display.</li>
                          <li><strong>Keyboard Support:</strong> Standard number and operator keys work as expected. Use 'Enter' for '=' and 'Backspace' to delete the last character.</li>
                      </ol>
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
      <RelatedCalculators currentCategory="Math Calculators" currentHref="/scientific-calculator" />
    </div>
  );
}
