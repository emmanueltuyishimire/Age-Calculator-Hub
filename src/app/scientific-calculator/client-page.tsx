
"use client";

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import RelatedCalculators from '@/components/layout/related-calculators';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

const ScientificCalculator = dynamic(() => import('@/components/calculators/scientific-calculator'), {
  loading: () => <Skeleton className="h-[500px] w-full max-w-sm" />,
  ssr: false,
});

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
        question: "Is this a good alternative to a physical calculator app from Casio or Texas Instruments?",
        answer: "Yes, for many high school and college-level math problems, this free online tool is an excellent alternative to a physical calculator or a paid app. It provides all the core scientific functions without needing to install anything."
    },
    {
        question: "How do the memory functions (M+, M-, MR, MC) work?",
        answer: "M+ adds the current display value to memory. M- subtracts it. MR (Memory Recall) puts the memory value on the display. MC (Memory Clear) resets the memory to zero."
    },
    {
        question: "Can I use keyboard shortcuts?",
        answer: "Yes, you can use your keyboard's number keys, operators (+, -, *, /), and the Enter key for equals. The 'Backspace' key works for the backspace function."
    }
];

export function ClientPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <main role="main" className="max-w-5xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Free Scientific Calculator Online</h1>
                    <p className="text-md md:text-lg text-muted-foreground">
                        A powerful online scientific calculator with advanced functions for trigonometry, logarithms, fractions, and more. A perfect free tool for students and professionals.
                    </p>
                </div>

                <div className="flex justify-center">
                    <ScientificCalculator />
                </div>

                <section className="mt-12 space-y-8 animate-fade-in max-w-4xl mx-auto">
                    
                    <Card>
                        <CardHeader>
                            <CardTitle>What is a Scientific Calculator?</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                A scientific calculator is a type of calculator designed to help you solve problems in science, engineering, and mathematics. Unlike a basic calculator, it has a wider range of functions, such as logarithmic, trigonometric, and exponential operations. This free online scientific calculator provides all these features in an easy-to-use interface, making it a great alternative to physical devices like a Casio or TI-84 calculator.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>How to Use This Online Scientific Calculator</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">This calculator mimics a physical scientific calculator. You can click the buttons or use your keyboard for input.</p>
                            <ol className="list-decimal list-inside space-y-2 text-muted-foreground mt-4">
                                <li><strong>Input Numbers & Basic Operations:</strong> Use the number pad and standard operators (+, −, ×, ÷). The calculator respects the standard order of operations (PEMDAS/BODMAS).</li>
                                <li><strong>Trigonometric Functions:</strong> Use the `sin`, `cos`, and `tan` buttons for trigonometric calculations. Ensure you are in the correct mode (`Deg` for degrees or `Rad` for radians) using the `Deg/Rad` toggle button. The inverse functions `sin-1`, `cos-1`, and `tan-1` are also available.</li>
                                 <li><strong>Logarithms:</strong> Use `ln` for the natural logarithm and `log` for the base-10 logarithm.</li>
                                 <li><strong>Exponents and Roots:</strong> Use `x²` for squaring, `x³` for cubing, and `xʸ` for other powers. Use `√x` for square root, `³√x` for cube root, and `ʸ√x` for other roots.</li>
                                 <li><strong>Fractions:</strong> To work with fractions, simply use the division (÷) key. For example, to calculate 1/2 + 1/4, you would enter `1 ÷ 2 + 1 ÷ 4`.</li>
                                <li><strong>Keyboard Support:</strong> Standard number and operator keys work as expected. Use 'Enter' for '=' and 'Backspace' to delete the last character.</li>
                            </ol>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Learn More About Math & Finance</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                <li><Link href="/articles/the-power-of-compound-interest" className="text-primary hover:underline">The Power of Compound Interest</Link></li>
                                <li>Solve for percentages with our <Link href="/percentage-calculator" className="text-primary hover:underline">Percentage Calculator</Link>.</li>
                            </ul>
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
            <RelatedCalculators currentCategory="Math" currentHref="/scientific-calculator" />
        </div>
    );
}
